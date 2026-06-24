# Beginner's Guide: Setting Up Email Warmup for LANSEM & Suriosity

Welcome! If you are completely new to domains, DNS, and email warming, don't worry. This guide is written specifically for you. We will go step by step, explaining *what* we are doing, *why* we are doing it, and *exactly how* to do it on GoDaddy.

---

## 💡 The Basics: What is "Email Warming" & Why Do We Need It?

Imagine you buy a brand-new phone number and immediately start making 100 automated sales calls a day. The network providers will classify you as a robocaller and block your number.

Email servers (like Gmail and Outlook) work the same way. If a brand-new email address like `contact@suriosity.in` suddenly sends a batch of cold outreach emails, email servers think: *"Aha! This is a spammer."* They will immediately dump all your emails into the **Spam folder**.

**Email Warming** is like going to the gym. We start by sending **2 to 5 emails a day** to "friendly" accounts, who open them, mark them as "not spam", and reply to them. Gradually, over 2 to 3 weeks, we increase that to **20 to 30 emails a day**. This tells Google and Microsoft that you are a real human, building up your **Sender Reputation** so your real outreach emails land in the **Primary Inbox**.

---

## ⚠️ Crucial Warning: Domain Isolation (Protect Your Main Domain)

> [!IMPORTANT]
> **Read this before doing anything else!**
> If you plan to use `lansem.in` and `suriosity.in` for your main company website, daily client emails, and invoicing, **DO NOT use them for cold outreach.**
> 
> If your outreach emails get flagged as spam by recipients, your entire domain's reputation drops. This means your regular invoices and client replies will also start landing in their spam folders.
> 
> **The Industry Best Practice**:
> 1. Go back to GoDaddy and purchase two "lookalike" domains (e.g., `getlansem.in` and `suriosityhq.in`).
> 2. Set up your outreach emails on these secondary domains (e.g., `contact@getlansem.in`).
> 3. Go to GoDaddy settings and forward/redirect `getlansem.in` to your main website `lansem.in`.
> 
> *If you still want to proceed with your main domains (`lansem.in` and `suriosity.in`), the steps below are exactly the same.*

---

## 🛠️ Step 1: Accessing Your DNS Settings in GoDaddy

"DNS" stands for Domain Name System. Think of it as the **public settings dashboard** for your website. This is where we tell the internet that your emails are authentic.

1. Go to [GoDaddy.com](https://www.godaddy.com) and log in.
2. Click on your name in the top right corner and select **My Products**.
3. Scroll down to the **Domains** section.
4. Find `suriosity.in` (and later repeat this for `lansem.in`) and click **Manage DNS** (or click the three dots `...` next to it and select **Edit DNS**).
5. You are now looking at a table with rows containing labels like `A`, `CNAME`, `MX`, and `TXT`. This is your DNS Zone File.

---

## 🛡️ Step 2: Adding the Security Records (SPF, DKIM, DMARC)

To prevent spam filters from blocking your new emails, you must add three security records to the GoDaddy DNS table.

### 1. SPF (Sender Policy Framework)
*   **What it is**: Think of SPF as a **guest list** published on your domain. It tells other mail servers: *"Only allow GoDaddy/Microsoft to send emails on my behalf. Anyone else is a gatecrasher."*
*   **How to add it in GoDaddy**:
    1. Look at your DNS table. Do you see a row where **Type** is `TXT` and **Name** is `@`?
    2. **If yes**: Edit it. Change the Value to:
       `v=spf1 include:spf.protection.outlook.com -all`
    2. **If no**: Click the **Add New Record** button at the bottom of the table.
       *   **Type**: Select `TXT`
       *   **Name**: Type `@`
       *   **Value (TXT Value)**: Paste `v=spf1 include:spf.protection.outlook.com -all`
       *   **TTL**: Leave as default (usually 1 Hour)
       *   Click **Save**.

---

### 2. DKIM (DomainKeys Identified Mail)
*   **What it is**: Think of DKIM as a **wax seal signature** on every email you send. It proves that the email wasn't intercepted or modified in transit.
*   **How to add it in GoDaddy**:
    Since GoDaddy emails are powered by Microsoft 365, you need to add two records called `CNAME` records:
    
    1. Click **Add New Record** in your DNS table:
       *   **Type**: Select `CNAME`
       *   **Name**: Type `selector1._domainkey`
       *   **Value**: Paste `selector1-suriosity-in._domainkey.suriosityonmicrosoft.onmicrosoft.com`
       *   *(For `lansem.in`, you will paste `selector1-lansem-in._domainkey.lansemonmicrosoft.onmicrosoft.com` instead).*
       *   Click **Save**.
       
    2. Click **Add New Record** again:
       *   **Type**: Select `CNAME`
       *   **Name**: Type `selector2._domainkey`
       *   **Value**: Paste `selector2-suriosity-in._domainkey.suriosityonmicrosoft.onmicrosoft.com`
       *   *(For `lansem.in`, you will paste `selector2-lansem-in._domainkey.lansemonmicrosoft.onmicrosoft.com` instead).*
       *   Click **Save**.

    3. **Enable DKIM in Microsoft Defender**:
       *   Go to: `https://security.microsoft.com/dkimv2`
       *   Log in with your GoDaddy email account credentials (e.g., `contact@suriosity.in`).
       *   Click on your domain name in the list, and turn the switch to **Enable**.

---

### 3. DMARC (Domain-based Message Authentication)
*   **What it is**: Think of DMARC as a **security guard** standing at the door. It tells other mailboxes what to do if an email fails the SPF (guest list) or DKIM (wax seal) checks.
*   **How to add it in GoDaddy**:
    1. Click **Add New Record** in your DNS table:
       *   **Type**: Select `TXT`
       *   **Name**: Type `_dmarc`
       *   **Value**: Paste `v=DMARC1; p=none; rua=mailto:dmarc-reports@suriosity.in; pct=100`
       *   *(For `lansem.in`, use `dmarc-reports@lansem.in` instead).*
       *   Click **Save**.
       
    *Note: `p=none` is a monitoring phase. It means "if authentication fails, let the email through anyway but send me a report." This is safe during the warmup phase.*

---

### 4. Custom Tracking Domain (Highly Recommended)
*   **What it is**: When you send outreach emails, the warmup tool tracks if recipients click links or open emails. If you use the warmup tool's shared tracking link, your emails might get marked as spam. Adding your own tracking domain fixes this.
*   **How to add it in GoDaddy**:
    1. Click **Add New Record**:
       *   **Type**: Select `CNAME`
       *   **Name**: Type `inst`
       *   **Value**: Paste `prox.instantly.ai`
       *   Click **Save**.

---

## 🔌 Step 3: Setting Up Your Warmup Account (Using Instantly.ai)

We recommend using **Instantly.ai** because it is the easiest and most affordable tool for beginners.

1. Go to [Instantly.ai](https://instantly.ai) and sign up for a free trial or standard account.
2. Once logged in, go to the dashboard and click on **Emails** (represented by an envelope icon).
3. Click the **Add New** button in the top-right corner.
4. Select **Office 365 / Outlook** (since GoDaddy uses Microsoft's backend).
5. Choose **Connect via OAuth (Modern Auth)**.
6. A Microsoft pop-up window will open. Enter your email (`contact@suriosity.in`) and password, and click **Allow/Accept** to give Instantly access to send and receive emails.

---

## 🚀 Step 4: Turn on the Warmup Service

Once the account is connected successfully inside Instantly:

1. Click on the email address in your Instantly dashboard.
2. Click the **Warmup Settings** tab (looks like a flame icon).
3. Set the configuration as follows:
   *   **Increase daily limit by**: `2` (starts sending 2 extra emails every day).
   *   **Max daily warmup limit**: `30` (will stop ramping up once it reaches 30 emails a day).
   *   **Reply Rate**: `35%` (this tells the system to reply to 35% of the warmup emails automatically, which looks natural).
4. Click **Save**.
5. Switch the **Status toggle** to **Active (enabled)**.

**Repeat Step 1 to Step 4 for `contact@lansem.in`.**

---

## 📅 Step 5: The Waiting Period

Leave the warmup running automatically. **Do not send any cold outreach emails for the first 14 to 21 days.**

*   **Day 1 to 14**: Let the warmup tool send small test emails back and forth. You don't have to do anything.
*   **Day 15+**: Check the "Deliverability Score" in Instantly. If it is green (95% or higher), you are ready to begin slowly sending your actual cold outreach campaigns! Keep the warmup running in the background forever.
