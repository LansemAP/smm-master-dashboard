@echo off
:: Navigate to the workspace directory
cd /d "C:\Users\ARNAB\.gemini\antigravity-ide\scratch\Master social media management"

:: Run the warmup script for Lansem
python send_warmup.py contact@lansem.in ANlansem_679

echo.
echo Waiting 10 seconds to avoid hitting GoDaddy SMTP connection/rate limits...
ping 127.0.0.1 -n 11 > nul
echo.


:: Run the warmup script for Suriosity
python send_warmup.py contact@suriosity.in ANsuriosity_679

