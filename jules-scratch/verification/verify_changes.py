from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173/")

    # Give the page time to load
    page.wait_for_load_state('networkidle')

    # Screenshot About section
    about_section = page.locator("#about")
    about_section.scroll_into_view_if_needed()
    page.wait_for_timeout(1000) # wait for animations
    about_section.screenshot(path="jules-scratch/verification/about_section.png")

    # Screenshot Education section
    education_section = page.locator("#education")
    education_section.scroll_into_view_if_needed()
    page.wait_for_timeout(1000) # wait for animations
    education_section.screenshot(path="jules-scratch/verification/education_section.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
