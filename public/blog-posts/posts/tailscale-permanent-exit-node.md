---
slug: tailscale-permanent-exit-node
title: "Turning an Old Laptop Into a Permanent Exit Node with Tailscale"
description: "How I repurposed a headless old laptop on my home fiber connection into a permanent Tailscale exit node — auto-approved ACLs, tag-based device policies, and a policy-routing conflict that swallowed a separate private WireGuard mesh."
date: "2026-09-05"
readingTime: 15
category: Networking
tags:
  - Tailscale
  - VPN
  - Networking
  - Self-Hosted
  - DevOps
  - Linux
cover: "/blog-posts/images/tailscale-permanent-exit-node.png"
---

# Turning an Old Laptop Into a Permanent Exit Node with Tailscale

I have an old laptop sitting headless at home, permanently connected to my fiber
line. Rather than let it collect dust, I turned it into a **Tailscale exit node** —
a way to route traffic from any of my other devices, anywhere, back out through my
home connection. This is the kind of thing that's useful when a service only trusts
requests from a "known" residential IP, or when you're on an untrusted network and
want your traffic to look like it's coming from home instead.

This post walks through the setup end to end: the client/exit-node split, the ACL
policy that keeps it locked down to my own devices, and a routing issue I hit along
the way that's worth knowing about if you try this yourself.

---

## The Setup

Two machines, two roles:

- **Exit node** — the old laptop, headless, always on, sitting on the home fiber
  connection.
- **Client** — my daily-driver laptop, which routes its outbound traffic through
  the exit node whenever I want to appear as if I'm on the home network.

Both are just peers on the same [tailnet](https://tailscale.com/kb/1136/tailnet)
(Tailscale's term for your private WireGuard mesh) — no port forwarding, no public
IP required, no messing with the router.

```mermaid
graph LR
    Client["Client laptop\n(anywhere)"] -- "WireGuard\n(encrypted)" --> ExitNode["Old laptop\nExit Node\n(home fiber)"]
    ExitNode -- "NAT'd egress" --> Internet["Internet"]
```

---

## 1. Enable IP Forwarding on the Exit Node

The exit node needs to forward packets between the tailnet and the wider internet,
which means enabling kernel-level IP forwarding:

```bash
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
```

> **Common mistake:** it's easy to run this on the wrong machine. This goes on the
> box that will *be* the exit node — not on the client that will be *using* it. If
> you enable forwarding on the client by accident, it's harmless, just unnecessary,
> and you can safely `sudo rm /etc/sysctl.d/99-tailscale.conf` to clean it up.

## 2. Advertise the Exit Node

```bash
sudo tailscale up --advertise-exit-node
sudo systemctl enable --now tailscaled
```

`systemctl enable` matters here — it makes sure `tailscaled` (and therefore the
exit-node advertisement) survives a reboot without you having to SSH back in and
re-run anything.

## 3. Approve It

By default, Tailscale won't let *any* device use a peer as an exit node just
because it's advertising — you have to explicitly approve it, either in the admin
console (**Machines → [device] → Edit route settings → Use as exit node**) or via
an ACL rule (more on that below).

## 4. Use It From a Client

```bash
sudo tailscale up --exit-node=<exit-node-tailscale-ip> --accept-routes --ssh
```

`tailscale status` on the client should now show the exit node as `active`:

```
100.x.x.x   exit-node-hostname   user@   linux    active; exit node; direct 192.168.x.x:41641
```

The `direct` marker is worth noting — it means Tailscale negotiated a peer-to-peer
WireGuard connection instead of relaying through Tailscale's DERP servers, which
gives you close to native latency.

A quick sanity check that it's actually working:

```bash
curl -4 ifconfig.me
```

This should return the exit node's public IP instead of whatever network the
client is actually sitting on. (If both machines happen to share the same home
network at the time of testing, this check is misleading — you'll get the same IP
either way, exit node or not. The real test is trying it from a genuinely
different network, like mobile data.)

---

## Locking It Down with ACLs

Tailscale's default access policy is "all devices can reach all devices, on all
ports" — fine to get started, but worth tightening once you've got a permanent
exit node and Tailscale SSH in the mix. My tailnet is small (just my own devices),
so the goal wasn't a complex multi-user policy — just closing a couple of obvious
gaps:

```json
{
  "tagOwners": {
    "tag:exit-node": ["autogroup:admin"]
  },

  "grants": [
    { "src": ["autogroup:member"], "dst": ["autogroup:member"], "ip": ["*"] }
  ],

  "ssh": [
    {
      "action": "check",
      "src": ["autogroup:member"],
      "dst": ["autogroup:self"],
      "users": ["autogroup:nonroot", "root"]
    }
  ],

  "autoApprovers": {
    "exitNode": ["tag:exit-node"]
  }
}
```

A few things worth calling out:

- **`autoApprovers.exitNode` takes a tag, user, or group — not a device IP.** My
  first attempt was to drop the exit node's Tailscale IP straight into that field,
  which fails with a fairly clear error. The fix is to tag the device instead:

  ```bash
  sudo tailscale up --advertise-exit-node --advertise-tags=tag:exit-node
  ```

  and reference `tag:exit-node` in `autoApprovers`. Now if the exit node ever
  re-advertises (reboot, reinstall, whatever), it's auto-approved instead of
  sitting there waiting for a manual click in the console.

- **`"action": "check"` for SSH**, rather than `"accept"`. This is Tailscale's own
  default and it's a sensible one — it still requires periodic re-authentication
  for SSH sessions rather than granting blanket passwordless access forever, even
  between your own trusted devices.

---

## The Routing Problem

After tightening the ACLs, I hit an issue: enabling the exit node from the client
killed its internet connection outright. Worth documenting the debugging path,
since "exit node enabled, internet dead" is a common enough failure mode.

**First suspect: the firewall.** `ufw`'s default forwarding policy is `DROP`, and
that's a well-known way to silently break exit-node forwarding even when
`ip_forward` is correctly enabled at the kernel level. Checked it:

```bash
sudo ufw status
# Status: inactive
```

Not it, in this case. Next, checked the actual forwarding chain:

```bash
sudo iptables -L FORWARD -v -n
```

```
Chain FORWARD (policy ACCEPT 2 packets, 304 bytes)
 pkts bytes target     prot opt in     out     source          destination
    0     0 ts-forward  0    --  *      *      0.0.0.0/0        0.0.0.0/0
```

Policy was `ACCEPT` and Tailscale's own `ts-forward` chain was present — but it had
seen **zero packets**. That's the useful signal: traffic wasn't even reaching the
exit node to be forwarded, which points further upstream than the firewall —
likely either a stale route/approval state after the tag change, or a DNS
resolution issue on the client masquerading as a total connectivity loss.

The standard way to split those two possibilities apart:

```bash
# raw connectivity, bypasses DNS entirely
ping -c 3 1.1.1.1

# DNS specifically
ping -c 3 google.com
```

If the IP ping works but the DNS-based one doesn't, it's a DNS problem (usually
fixed by checking what DNS server `--accept-routes` handed the client, or
disabling MagicDNS override temporarily to compare). If even the raw IP ping
fails, it's routing — worth checking the NAT/masquerade rule on the exit node:

```bash
sudo iptables -t nat -L -v -n
```

A useful reminder that "it should just work" VPN tooling still has real plumbing
underneath, and a single stale approval or ACL tag change can leave that plumbing
in a half-updated state until you dig in with `iptables` and `ping` to find where
the packet actually stops. In this instance, the firewall/NAT layer turned out to
be fine — the real culprit showed up a bit later, once I started actually using
the client for something else.

---

## The Real Culprit: Exit-Node Routing Swallowing a Private Mesh

The client laptop also connects to a Kubernetes cluster over a **separate**
private WireGuard mesh (`wg0`, `10.0.0.0/24`) — nothing to do with Tailscale,
just a plain `wg-quick` VPN to reach the cluster's nodes. With the exit node
enabled, `kubectl` started failing outright:

```
dial tcp 10.0.0.1:6443: i/o timeout
```

An `i/o timeout` (not "connection refused", not a DNS lookup failure) points
straight at routing — packets are going somewhere, just not getting a reply back.
The single most useful diagnostic here is `ip route get`, which shows exactly
which interface/table the kernel picks for a destination *right now*:

```bash
ip route get 10.0.0.1
```

```
10.0.0.1 dev tailscale0 table 52 src 100.122.157.12 uid 1000
```

That's the smoking gun: traffic to the cluster's private `10.0.0.0/24` mesh was
being routed through `tailscale0`, not `wg0` — even though `wg0` had a more
specific route for that exact subnet sitting in the main routing table. Digging
into *why* meant looking at the actual policy-routing rules and the contents of
Tailscale's exit-node table:

```bash
ip rule show
ip route show table 52
```

```
5210:  from all fwmark 0x80000/0xff0000 lookup main
5230:  from all fwmark 0x80000/0xff0000 lookup default
5250:  from all fwmark 0x80000/0xff0000 unreachable
5270:  from all lookup 52
32766: from all lookup main
32767: from all lookup default
```

```
default dev tailscale0
10.0.0.0/24 dev tailscale0
192.168.29.0/24 dev tailscale0
172.17.0.0/16 dev tailscale0
...
```

Two things stood out. First, rule `5270` (`lookup 52`) is checked *before* rule
`32766` (`lookup main`) — so anything table 52 has an entry for wins outright,
regardless of what's sitting in the main table. Second, table 52 wasn't just
holding a `default` route for the exit node — it also explicitly listed every
locally-connected subnet on the machine (`wg0`'s mesh, the home LAN, even
Docker's bridge network), all pointed at `tailscale0` instead of their real
interfaces. Enabling the exit node had quietly taken over routing for networks
that had nothing to do with the internet-bound traffic it was actually meant to
handle.

`--accept-routes` looked like a plausible cause at first (it's what accepts
subnet routes advertised by *other* tailnet peers), so I tried disabling it:

```bash
sudo tailscale up --exit-node=<exit-node-tailscale-ip> --ssh --accept-routes=false
```

No change — `ip route get 10.0.0.1` still resolved to `table 52`. That ruled out
peer-advertised routes as the cause; this was exit-node behavior itself, not
route acceptance. The actual fix is a flag built specifically for this situation
— it tells Tailscale to leave your own directly-connected local subnets alone
even while an exit node is active:

```bash
sudo tailscale set --exit-node-allow-lan-access=true
```

After that, `ip route get 10.0.0.1` correctly showed `dev wg0`, and `kubectl`
started working again — with the exit node still fully active for everything
else.

---

## Update: Routing Was Fine, the NIC Wasn't

A day later, with `--exit-node-allow-lan-access=true` already in place, `kubectl`
started failing again — but differently this time:

```
Unable to connect to the server: net/http: TLS handshake timeout
```

Not the clean `i/o timeout` from before. And confusingly, `ip route get 10.0.0.1`
now showed exactly what it should:

```bash
ip route get 10.0.0.1
```

```
10.0.0.1 dev wg0 src 10.0.0.5 uid 1000
```

`wg0` again — the routing fix was holding. `ip route show table 52` confirmed it
explicitly, with a `throw` entry that tells the kernel to skip the exit node's
table entirely for that subnet and fall through to the main table instead:

```
throw 10.0.0.0/24
throw 127.0.0.0/8
throw 172.17.0.0/16
throw 192.168.29.0/24
```

So the packets were taking the right path. Yet `kubectl` — and plain `ping` —
were still unreliable. Twenty pings at a fast interval made the shape of the
problem obvious:

```bash
ping -c 20 -i 0.3 10.0.0.1
```

```
64 bytes from 10.0.0.1: icmp_seq=10 ttl=64 time=36.9 ms
64 bytes from 10.0.0.1: icmp_seq=11 ttl=64 time=172 ms
64 bytes from 10.0.0.1: icmp_seq=12 ttl=64 time=73.4 ms
64 bytes from 10.0.0.1: icmp_seq=13 ttl=64 time=37.4 ms
64 bytes from 10.0.0.1: icmp_seq=14 ttl=64 time=188 ms
```

RTT alternating between ~37ms and ~190ms on a fixed path, with 0% packet loss,
is a different signature from a routing problem — a wrong route gives you
*consistently* bad (or consistently failing) results, not this kind of jitter.
Alternating latency like this on the same logical path points at **contention
for the same physical link**, not a path decision. `wg0` and Tailscale's
exit-node tunnel were both going out over the same Wi-Fi adapter (`wlo1`) at
the same time — `ip route`/`ip rule` only decide *which* route a packet takes,
they say nothing about how the NIC's outbound queue is shared between two
flows that both picked the same physical interface. When the exit-node tunnel
burst with unrelated traffic, `wg0`'s packets sat behind it in the same queue
long enough to occasionally blow through TLS handshake's tight round-trip
budget, even though a plain ICMP ping or a raw TCP connect mostly still got
through.

The first thing I reached for was `tc` (traffic control), giving WireGuard's
UDP traffic strict priority over everything else leaving the same NIC:

```bash
tc qdisc add dev wlo1 root handle 1: prio bands 3 \
    priomap 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2

tc filter add dev wlo1 parent 1: protocol ip prio 1 u32 \
    match ip sport 50313 0xffff flowid 1:1
tc filter add dev wlo1 parent 1: protocol ip prio 1 u32 \
    match ip dport 50313 0xffff flowid 1:1
```

`50313` here is the local WireGuard listen port (`nmcli connection show wg0 |
grep listen-port` if it's managed by NetworkManager rather than a raw
`wg-quick` config). This reduced the jitter somewhat, but `kubectl` was still
failing intermittently — which turned out to be because this fix doesn't
actually do what it looks like it does.

### Why `tc` Didn't Fix It

`tc`'s `prio` qdisc only reorders packets in the kernel's *software* queue
before they're handed to the driver. On Wi-Fi, that's not the whole story:
`wlo1` reports a single netdev TX queue (`ip -d link show wlo1` → `numtxqueues=1`),
but the actual chipset (an Intel `iwlwifi` adapter) internally maps outbound
frames into four separate WMM hardware access categories — voice, video,
best-effort, background — inside the `mac80211` driver stack, invisible to
`tc`. And crucially, `mac80211`'s classification function,
[`cfg80211_classify8021d()`](https://github.com/torvalds/linux/blob/master/net/wireless/util.c),
only trusts a pre-set `skb->priority` if it's one of a magic range (256–263,
meaning "802.1d priority already decided"). A classful `tc` filter
(`flowid 1:1`) sets `skb->priority` to a classid encoding instead — nowhere
near that range — so `mac80211` ignores it completely and falls back to
reading the packet's DSCP field. Since WireGuard's packets carry the default
DSCP of 0, same as everything else including the Tailscale tunnel, both flows
landed in the *same* WMM access category on the actual radio. The `tc`
reordering never survived past the software queue.

### The Fix That Actually Changes Airtime Priority

The real lever is DSCP marking, since that's what `cfg80211_classify8021d`
reads. Marking WireGuard's egress UDP packets with DSCP `EF` (46) maps to WMM
user-priority 6 — `AC_VO`, the voice-equivalent access category — genuinely
above the best-effort category everything else (including the exit-node
tunnel) sits in:

```bash
tc qdisc del dev wlo1 root 2>/dev/null || true   # undo the ineffective tc rule

iptables -t mangle -A OUTPUT -p udp --sport 50313 \
    -j DSCP --set-dscp-class EF
```

Same NetworkManager dispatcher pattern as before applies this on every
interface-up event so it survives reboots and Wi-Fi reconnects without a
manual re-run.

This measurably reduced the jitter and dropped-packet rate further — but
`kubectl get pods -A` (a much larger response than a plain `ping`, so more
exposed to any residual tail latency) still failed intermittently afterward.
DSCP marking changes *scheduling priority under contention*, not the total
amount of airtime available — on an ordinary home Wi-Fi link with normal
variance from distance, neighboring networks, and general RF noise, some tail
latency is simply going to happen no matter how the packets are classified.

### What Actually Fixed It

A full reboot. After that, both `ping` jitter and `kubectl` reliability were
clean, no further intervention needed.

In hindsight, the DSCP fix was real and worth keeping — it's a genuine
improvement to how `wg0` traffic gets scheduled relative to the Tailscale
tunnel, and there's no reason to revert it. But it wasn't *the* fix for this
particular episode. Something in the accumulated state of the network
stack — stale conntrack entries, a stuck `NetworkManager` or `tailscaled`
internal state, a wedged Wi-Fi firmware queue, anything that persists across
interface up/down events but not across a full boot — was the actual
culprit, and no amount of `tc`/`iptables` tuning at the routing or QoS layer
was ever going to touch that. Worth remembering before going deep on
protocol-level fixes: if a problem is genuinely intermittent and resists a
theoretically-sound fix, testing "does a clean reboot make this go away" is a
cheap, high-signal experiment that can save a lot of time spent debugging the
wrong layer.

---

## Takeaways

- Exit-node setup itself is two commands (`--advertise-exit-node` on the exit
  node, `--exit-node=<ip>` on the client) — the complexity is almost entirely in
  approval flow, ACLs, and routing edge cases, not the core networking.
- `autoApprovers` for a tagged device is worth setting up immediately if the exit
  node is meant to be permanent — otherwise a reboot or reinstall means walking
  back to the admin console to click approve again.
- When exit-node traffic silently dies, check firewall policy first (`ufw`,
  `iptables -L FORWARD`), then split DNS from raw routing with `ping <ip>` vs.
  `ping <hostname>` before going further down the NAT/masquerade rabbit hole.
- If a *different* private network (a separate VPN, a Kubernetes cluster mesh,
  anything with its own overlay) breaks specifically when the exit node turns
  on, suspect Tailscale's own policy-routing table (`ip route get <ip>`, `ip rule
  show`, `ip route show table 52` will tell you immediately) rather than
  `--accept-routes` — and reach for `--exit-node-allow-lan-access` before hand-
  rolling custom `ip rule` overrides.
- Enabling Tailscale SSH (`--ssh`) is a separate, tailnet-wide capability worth
  being deliberate about — it's governed by your ACL's `ssh` block, not your local
  `sshd`, and defaults to allowing any tailnet member unless you scope it down.
- A correct route isn't the whole story once two tunnels share one physical NIC.
  Jittery, alternating latency on an otherwise-correct path (as opposed to
  consistently bad or consistently failing) is the signature of link
  contention, not a routing bug.
- On Wi-Fi specifically, a `tc` qdisc's reordering doesn't automatically
  translate into real airtime priority — `mac80211`'s WMM classifier
  (`cfg80211_classify8021d`) reads DSCP, not a classful filter's `skb->priority`
  encoding. If the goal is genuine over-the-air prioritization on a wireless
  NIC, mark DSCP directly (`iptables -t mangle ... -j DSCP`) rather than
  reaching for `tc` alone.
- Intermittent failures that resist an otherwise-correct fix are worth testing
  against a plain reboot before spending more time on the theory. Stale
  conntrack/driver/daemon state that only clears on a full boot is a real
  failure mode, and it's a cheap experiment relative to chasing the wrong
  layer further.
