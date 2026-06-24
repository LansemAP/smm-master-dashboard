import os
import imaplib
import email
from email.header import decode_header
import datetime
import ssl

class SNIFreeIMAP4_SSL(imaplib.IMAP4_SSL):
    def _create_socket(self, timeout):
        # Call the base IMAP4 (non-SSL) create_socket to get the raw socket
        sock = imaplib.IMAP4._create_socket(self, timeout)
        # Wrap it without server_hostname (disabling SNI)
        return self.ssl_context.wrap_socket(sock)


# Configuration
LOG_FILE = "warmup_history.log"
IMAP_SERVER = "imap.secureserver.net"
IMAP_PORT = 993

ACCOUNTS = [
    {
        "email": "contact@lansem.in",
        "password": "ANlansem_679",
        "name": "LANSEM"
    },
    {
        "email": "contact@suriosity.in",
        "password": "ANsuriosity_679",
        "name": "Suriosity"
    }
]

def check_sent_history():
    print("=== 1. RECENT OUTBOUND HISTORY ===")
    if not os.path.exists(LOG_FILE):
        print("No sending logs found yet (warmup_history.log does not exist).")
        return
        
    try:
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            lines = f.readlines()
        
        if not lines:
            print("Sending log file is empty.")
            return
            
        # Display the last 8 entries
        print(f"Showing last 8 sent warmup emails:")
        for line in lines[-8:]:
            print(line.strip())
    except Exception as e:
        print(f"Error reading sending log: {e}")

def check_inbox_replies(account):
    print(f"\n=== 2. INCOMING REPLIES FOR {account['name']} ({account['email']}) ===")
    try:
        import time
        max_retries = 3
        retry_delay = 5
        mail = None
        
        for attempt in range(1, max_retries + 1):
            try:
                context = ssl.create_default_context()
                context.check_hostname = False
                context.verify_mode = ssl.CERT_NONE
                mail = SNIFreeIMAP4_SSL(IMAP_SERVER, IMAP_PORT, ssl_context=context, timeout=15)
                mail.login(account['email'], account['password'])
                mail.select("inbox")
                break
            except Exception as e:
                print(f"[WARNING] Connection attempt {attempt} failed: {e}")
                if mail:
                    try:
                        mail.logout()
                    except:
                        pass
                    mail = None
                if attempt < max_retries:
                    print(f"Waiting {retry_delay} seconds before retrying...")
                    time.sleep(retry_delay)
                else:
                    print(f"[ERROR] Failed to access inbox for {account['email']} after {max_retries} attempts.")
                    return


        
        # Search for all emails
        status, messages = mail.search(None, "ALL")
        if status != "OK" or not messages[0]:
            print("No emails found in the inbox.")
            mail.logout()
            return
            
        mail_ids = messages[0].split()
        if not mail_ids:
            print("Inbox is empty.")
            mail.logout()
            return
            
        # Fetch the last 5 emails in the inbox
        print(f"Checking the last 5 emails in your inbox for replies:")
        found_replies = 0
        for mail_id in reversed(mail_ids[-5:]):
            status, data = mail.fetch(mail_id, "(RFC822)")
            if status != "OK":
                continue
                
            for response_part in data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])
                    
                    # Decode sender
                    from_header = msg["From"]
                    from_sender = "Unknown"
                    if from_header:
                        decoded = decode_header(from_header)[0]
                        from_sender = decoded[0]
                        if isinstance(from_sender, bytes):
                            from_sender = from_sender.decode(decoded[1] or "utf-8", errors="ignore")
                    
                    # Ignore emails sent by ourselves to avoid cluttering status checks
                    if account['email'] in from_sender.lower():
                        continue
                        
                    # Decode subject
                    subject_header = msg["Subject"]
                    subject = "No Subject"
                    if subject_header:
                        decoded = decode_header(subject_header)[0]
                        subject = decoded[0]
                        if isinstance(subject, bytes):
                            subject = subject.decode(decoded[1] or "utf-8", errors="ignore")
                            
                    # Get Date
                    date_header = msg["Date"]
                    
                    print(f"- From: {from_sender} | Subject: '{subject}' | Date: {date_header}")
                    found_replies += 1
                    
        if found_replies == 0:
            print("No external replies found in the last check window.")
            
        mail.logout()
    except Exception as e:
        print(f"Error accessing inbox for {account['email']}: {e}")

def run_system_check():
    print("==================================================")
    print("             WARMUP SYSTEM STATUS CHECK           ")
    print(f"             Date: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  ")
    print("==================================================\n")
    
    # Check sent logs
    check_sent_history()
    
    # Check both inboxes
    for account in ACCOUNTS:
        check_inbox_replies(account)
        
    print("\n==================================================")
    print("-> Next Step: Keep replying to any external emails in your test inboxes!")
    print("==================================================")

if __name__ == "__main__":
    run_system_check()
