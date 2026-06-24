import sys
import smtplib
import random
import getpass
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ==========================================
# CONFIGURATION: EDIT THIS LIST
# ==========================================
RECIPIENTS = [
    "navgeet.suri@gmail.com",
    "arnabatrix@gmail.com",
    "navgeetarnab@gmail.com",
    "reacharnabp@gmail.com",
    "sonderbreeze@gmail.com",
    "contactap7@gmail.com",
    "arnabteaches@gmail.com",
    "sideloginclient@gmail.com"
]

# GoDaddy Workspace Email Server details
SMTP_SERVER = "smtpout.secureserver.net"
SMTP_PORT = 587  # TLS port for GoDaddy

# Natural conversation templates (subject and body)
TEMPLATES = [
    {
        "subject": "Quick check on timeline",
        "body": "Hi there,\n\nJust wanted to check if we are still on track for the draft review this Friday? Let me know if you need any adjustments to the schedule."
    },
    {
        "subject": "Recommendation for accounting tools?",
        "body": "Hello,\n\nDo you have a preference between Xero and QuickBooks for managing smaller client portfolios? Let me know what has worked best for your workflow."
    },
    {
        "subject": "Read your recent post",
        "body": "Hi,\n\nCame across your recent article on sustainable sourcing. Loved the insights on supply chain transparency. Let's catch up sometime next week?"
    },
    {
        "subject": "Meeting notes & next steps",
        "body": "Hello,\n\nThanks for the chat today. Here are the key action items:\n1) Finalize domain setup\n2) Start warmup schedule\n\nLet me know if I missed anything."
    },
    {
        "subject": "Brief question about client reports",
        "body": "Hi,\n\nAre we sending the weekly performance reports on Monday or Tuesday? Let me know so I can coordinate with the team."
    }
]

def send_warmup_emails():
    # Check if email and password are provided as command-line arguments
    if len(sys.argv) >= 3:
        sender_email = sys.argv[1].strip()
        password = sys.argv[2]
    else:
        # 1. Ask for sender email address
        sender_email = input("Enter the sender email address (e.g., contact@lansem.in): ").strip()
        if not sender_email:
            print("Error: Sender email cannot be empty.")
            return

        # 2. Get password securely without echoing it on screen
        password = getpass.getpass(prompt=f"Enter password for {sender_email}: ")
        if not password:
            print("Error: Password cannot be empty.")
            return

    # 3. Check if recipients list was updated
    active_recipients = [r for r in RECIPIENTS if "your_personal" not in r]
    if not active_recipients:
        print("\n[WARNING] You haven't edited the RECIPIENTS list inside this script yet.")
        add_manual = input("Would you like to enter recipient email addresses manually now? (y/n): ").strip().lower()
        if add_manual == 'y':
            emails = input("Enter recipient emails separated by commas: ").split(",")
            active_recipients = [e.strip() for e in emails if e.strip()]
        else:
            print("Please edit the script file and update the RECIPIENTS list first.")
            return

    print(f"\n[START] Starting warmup. Sending from {sender_email} to {len(active_recipients)} recipient(s)...")

    # 4. Connect to GoDaddy SMTP server using TLS with retry logic
    import time
    max_retries = 3
    retry_delay = 5
    server = None
    
    for attempt in range(1, max_retries + 1):
        try:
            print(f"Connecting to GoDaddy SMTP server (Attempt {attempt}/{max_retries})...")
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=15)
            server.starttls()  # Secure the connection using TLS
            server.login(sender_email, password)
            print("Successfully connected and logged in!")
            break
        except Exception as e:
            print(f"[WARNING] Connection attempt {attempt} failed: {e}")
            if server:
                try:
                    server.quit()
                except:
                    pass
                server = None
            if attempt < max_retries:
                print(f"Waiting {retry_delay} seconds before retrying...")
                time.sleep(retry_delay)
            else:
                print(f"\n[ERROR] Login Failed: Could not connect to GoDaddy mail server after {max_retries} attempts.")
                return


    # 5. Send random templates to each recipient
    success_count = 0
    for recipient in active_recipients:
        template = random.choice(TEMPLATES)
        
        # Set dynamic display name and signature based on domain name
        if "lansem" in sender_email:
            display_name = "Lansem"
            signature = "Best,\nArnab Pati\nFounder, Lansem (Accounting and Legal Advisory)"
        else:
            display_name = "Suriosity"
            signature = "Best,\nArnab Pati\nChief Operating Officer, Suriosity (Millets and Agri-Exports)"
        
        msg = MIMEMultipart()
        msg['From'] = f"{display_name} <{sender_email}>"
        msg['To'] = recipient
        msg['Subject'] = template['subject']
        
        # Combine the template body and the signature
        email_body = f"{template['body']}\n\n{signature}"
        msg.attach(MIMEText(email_body, 'plain'))

        try:
            import datetime
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            server.sendmail(sender_email, recipient, msg.as_string())
            log_line = f"[{timestamp}] [SUCCESS] Sent from {sender_email} to {recipient} (Subject: '{template['subject']}')"
            print(log_line)
            with open("warmup_history.log", "a", encoding="utf-8") as log_file:
                log_file.write(log_line + "\n")
            success_count += 1
        except Exception as e:
            import datetime
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            log_line = f"[{timestamp}] [ERROR] Failed to send from {sender_email} to {recipient}: {e}"
            print(log_line)
            with open("warmup_history.log", "a", encoding="utf-8") as log_file:
                log_file.write(log_line + "\n")

    # Close server connection
    server.quit()

    print(f"\n[FINISHED] Successfully sent {success_count}/{len(active_recipients)} warmup emails.")
    print("-> Now, check those recipient inboxes and write a quick reply to complete the thread!")

if __name__ == "__main__":
    send_warmup_emails()
