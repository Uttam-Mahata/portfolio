---
icon: material/book-open-page-variant
---

# Engineering Notes & Systems Deep-Dives

<div class="doc-badge-row" markdown>
[![Author](https://img.shields.io/badge/Author-Uttam_Mahata-00ADD8?logo=github&logoColor=white)](https://github.com/Uttam-Mahata)
[![Portfolio](https://img.shields.io/badge/Portfolio-uttammahata.in-purple)](https://uttammahata.in/)
[![Focus](https://img.shields.io/badge/Focus-Systems_%26_Cloud_Architecture-orange)](#topics-covered)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Uttam-Mahata/portfolio/blob/main/LICENSE)
</div>

Welcome to my personal technical blog and systems engineering notes. Here I document architectural deep-dives, hands-on infrastructure designs, low-level networking explorations, self-hosted services, and production lessons learned across cloud and on-premise environments.

---

## Technical Articles

| Article | Category | Reading Time | Core Technologies |
|---|---|---|---|
| [**Building RootAccess: Zero-Cost Multi-Cloud Serverless CTF**](posts/rootaccess-multi-cloud-ctf-architecture.md) | Cloud & Architecture | 14 min | AWS Lambda, GCP, Cloudflare, OCI, Turso, Redis |
| [**Turning an Old Laptop Into a Permanent Exit Node with Tailscale**](posts/tailscale-permanent-exit-node.md) | Networking & Linux | 15 min | Tailscale, WireGuard, Linux, Policy Routing, QoS |
| [**Building an AI Layer on OpenWA: LangGraph & pgvector on OCI**](posts/openwa-ai-whatsapp-gateway.md) | AI & Systems | 18 min | LangGraph, Workers AI, pgvector, NestJS, OCI |
| [**Production K3s on VPS: 4-Node HA Architecture**](posts/k3s-vps-production-architecture.md) | Kubernetes | 15 min | K3s, WireGuard mesh, HAProxy, Prometheus, CI/CD |
| [**High Availability CTFd on IBM LinuxONE (s390x)**](posts/ctfd-ha-linuxone-s390x.md) | DevOps & Infrastructure | 10 min | s390x, Nginx, PostgreSQL 18, Redis, Docker |
| [**Locking Down MongoDB Atlas: Tailscale App Connectors**](posts/securing-mongodb-atlas-tailscale.md) | DevOps & Security | 10 min | MongoDB Atlas, Tailscale App Connector, K3s |
| [**Moving Data Between MongoDB Clusters Safely**](posts/mongodump-mongorestore-guide.md) | Databases | 12 min | mongodump, mongorestore, oplog sync, Atlas Live Migrate |
| [**Managing K3s from an Android Device**](posts/k3s-android-management.md) | Kubernetes & Mobile | 8 min | K3s, Termux, Headlamp, Tailscale |

---

## Topics Covered

```mermaid
graph TD
    A["Engineering Notes"] --> B["Cloud & Architecture"]
    A --> C["Networking & Linux"]
    A --> D["Kubernetes & Containers"]
    A --> E["AI & Systems"]
    A --> F["Databases & Storage"]

    B --> B1["Multi-Cloud Zero-Cost Quota Routing"]
    C --> C1["Tailscale Exit Nodes & WireGuard Policy Routing"]
    D --> D1["Production K3s HA & Low-Cost Clusters"]
    E --> E1["LangGraph Stateful RAG & pgvector on OCI"]
    F --> F1["Zero-Downtime MongoDB Migrations & Atlas Security"]
```

!!! tip "Interactive Code & Diagrams"
    All articles feature full syntax-highlighted code snippets, Mermaid architecture flowcharts, and mathematical formulas rendered natively via MathJax / KaTeX.

---

## About the Author

I am **Uttam Mahata**, a full-stack engineer and systems enthusiast focusing on operating systems, computer networks, DevOps, information security, and distributed computing. 

* 🌐 Portfolio: [uttammahata.in](https://uttammahata.in/)
* 🐙 GitHub: [@Uttam-Mahata](https://github.com/Uttam-Mahata)
* 💼 LinkedIn: [uttam-mahata](https://www.linkedin.com/in/uttam-mahata-4b0364259/)
* 🐦 X / Twitter: [@daemonized_u](https://x.com/daemonized_u)
