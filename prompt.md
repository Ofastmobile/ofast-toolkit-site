Yes — the docs shell is the **master template**. Every module page follows the exact same layout. Only the content in the middle changes. Left sidebar, right TOC, header — all stay the same across every page.

---

Here's the prompt you can give Antigravity:

---

**PROMPT:**

I am building a documentation website for a WordPress plugin called **Ofast Toolkit** hosted at `toolkit.ofastshop.com`. The site has two main sections: a landing page (`index.html`) and a documentation section (`/docs/`).

I already have two files built:

- `index.html` — the landing page (dark theme, hero, modules grid, pricing, footer)
- `docs/email.html` — the docs shell/template (light theme, 3-column layout)

**Your job is to build all remaining pages following the exact same patterns.**

---

**SITE STRUCTURE TO BUILD:**

```
toolkit.ofastshop.com/
├── index.html                    ✅ Already built
├── docs/
│   ├── index.html                ← Docs homepage (build this)
│   ├── getting-started.html      ← (build this)
│   ├── dashboard.html            ← (build this)
│   ├── email.html                ✅ Already built (use as template)
│   ├── smtp.html                 ← (build this)
│   ├── sms.html                  ← (build this)
│   ├── spam-protection.html      ← (build this)
│   ├── admin-studio.html         ← (build this)
│   ├── login-redesign.html       ← (build this)
│   ├── code-snippets.html        ← (build this)
│   ├── redirects.html            ← (build this)
│   ├── contact-forms.html        ← (build this)
│   ├── social-login.html         ← (build this)
│   └── debug-indicator.html      ← (build this)
└── assets/
    ├── css/
    │   ├── main.css              ← Extract landing page CSS here
    │   └── docs.css              ← Extract docs CSS here
    └── js/
        └── docs.js               ← Extract docs JS here
```

---

**DESIGN RULES — follow strictly:**

**Landing page (`index.html`):**

- Dark theme background `#0a0a0f`
- Brand colors: Purple `#6366f1` (primary), Gold `#ffcc00` (accent)
- Font: Syne (headings) + DM Sans (body)
- All internal links must work correctly

**Docs pages (all pages inside `/docs/`):**

- Light theme background `#f8fafc`
- Same brand colors
- Font: Plus Jakarta Sans + Fira Code (for code blocks)
- 3-column layout: Left sidebar (270px) + Middle content + Right TOC (220px)
- Fixed header matching the landing page header style
- Left sidebar has all module links with On/Off badges
- Right TOC shows headings for that specific page only
- Active sidebar link highlighted for current page
- Prev/Next pagination at bottom of every page

---

**NAVIGATION — ALL links must work:**

Header nav links:

- `Home` → `../index.html`
- `Documentation` → `./index.html` (from inside docs/)
- `ofastshop.com` → `https://ofastshop.com` (opens new tab)
- `Download Plugin` button → `../index.html#pricing`

Landing page nav links:

- `Modules` → `#modules`
- `Pricing` → `#pricing`
- `Docs` → `./docs/index.html`
- `Get Pro — $39` → `https://ofastshop.com/user/digital/wordpress-plugin/ofast-tooltik-pro/`

Landing page CTA buttons:

- `Download Free` → `#pricing`
- `Get Pro — $39` → `https://ofastshop.com/user/digital/wordpress-plugin/ofast-tooltik-pro/`
- `View Docs` → `./docs/index.html`

Pricing section buttons:

- Free card `Download Free` → WordPress.org or `#` placeholder
- Pro card `Get Ofast Toolkit Pro →` → `https://ofastshop.com/user/digital/wordpress-plugin/ofast-tooltik-pro/`

Sidebar links (inside every docs page):

- Overview → `./index.html`
- Getting Started → `./getting-started.html`
- Dashboard → `./dashboard.html`
- Email Module → `./email.html`
- SMTP Configuration → `./smtp.html`
- SMS Channel → `./sms.html`
- Spam Protection → `./spam-protection.html`
- Admin Studio → `./admin-studio.html`
- Login Redesign → `./login-redesign.html`
- Code Snippets → `./code-snippets.html`
- Redirects Manager → `./redirects.html`
- Contact Forms → `./contact-forms.html`
- Social Login → `./social-login.html`
- Debug Indicator → `./debug-indicator.html`

Prev/Next pagination on each page must link to the correct adjacent page in sidebar order.

---

**CONTENT FOR EACH DOCS PAGE:**

Every docs page must have these sections with real content (not placeholder):

1. **Overview** — what the module does in plain English
2. **Requirements** — WordPress version, PHP version, dependencies
3. **Setup** — numbered step-by-step guide
4. **Settings** — table with Setting name, Description, Default value
5. **How it works** — plain English explanation
6. **FAQ** — 3-4 common questions with accordion answers

**Module details for content:**

`docs/index.html` — Docs homepage:

- Welcome message
- Quick start links
- Grid of all 12 modules with icon, name, short description, link to module page

`getting-started.html`:

- Installation steps (upload plugin → activate → run setup wizard)
- How to enable/disable modules
- Setup wizard walkthrough
- First things to configure

`dashboard.html`:

- Core module, always on
- Shows total users, users by role (Administrator, Editor, Author, Subscriber, Tutor Instructor)
- System stats and module status overview

`smtp.html`:

- Mailer types: PHP Mail (default) vs SMTP
- Provider presets: SendGrid, Mailgun, Zoho, Gmail, Brevo, Amazon SES, Outlook, Custom
- Connection settings: host, port, encryption (TLS/SSL/None)
- Authentication: username, password
- From settings: from email, from name
- Test email feature
- Port connectivity tester
- DNS checker (SPF, DKIM, DMARC, MX)
- Email logging settings
- Fallback SMTP server (Pro)
- Email health reports (Pro)
- Rate limiting (Pro)

`sms.html`:

- Pro module
- Providers: Twilio, Africa's Talking, Termii, SmartSMS Solutions
- How to get API credentials for each provider
- Sending SMS to users

`spam-protection.html`:

- Cloudflare Turnstile setup
- Google reCAPTCHA v2 and v3 setup
- Where protection is applied (login, registration, forms)

`admin-studio.html`:

- User roles management
- Menu editor
- Admin URL customization
- Backend branding

`login-redesign.html`:

- Upload logo
- Set background color/image
- Custom login URL
- Brand colors on login page

`code-snippets.html`:

- Adding a new snippet
- Enabling/disabling snippets with toggle
- Categories
- Safety warning about PHP execution

`redirects.html`:

- Adding 301/302/307 redirects
- Import/export redirects
- Usage tracking
- SEO importance

`contact-forms.html`:

- Pro module
- Creating a form
- Viewing submissions
- Admin review panel

`social-login.html`:

- Pro module
- Google OAuth setup (step by step with Google Console)
- Facebook OAuth setup

`debug-indicator.html`:

- What WP_DEBUG is
- Why it's dangerous on production
- How the indicator works
- How to disable WP_DEBUG

---

**SHARED COMPONENTS (same on every docs page):**

Header: Fixed, blur background, logo left, nav right
Sidebar: All 14 links grouped in sections, search filter, On/Off badges, active state for current page
TOC: Right side, scroll spy highlights active heading
Footer: Same footer as landing page
Scroll-to-top button
FAQ accordion

---

**CSS & JS:**

- Extract all shared CSS into `assets/css/docs.css`
- Extract all shared JS into `assets/js/docs.js`
- Each HTML file links to these shared files
- No inline `<style>` blocks in individual pages — all styles in the shared CSS file
- Keep landing page styles in `assets/css/main.css`

---

**IMPORTANT:**

- Every link must work correctly between all pages
- Active sidebar link must match the current page on every page
- Right TOC must match the actual headings on each page
- All pages must be fully responsive (mobile sidebar slides in, TOC hides on tablet)
- Build one page at a time and confirm before moving to the next

**Start with: `assets/css/docs.css` and `assets/js/docs.js` first, then `docs/index.html`, then each module page in sidebar order.**

---

That prompt covers everything. Antigravity will have zero ambiguity — structure, links, content, design rules, build order, all specified. Drop it in and let it run. 🚀
