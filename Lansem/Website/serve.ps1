$port = 8080
$root = "E:\Lansem Website"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

# Stop existing listener if port is blocked (graceful exit)
$existingProcess = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($existingProcess) {
    Write-Host "Port $port is already in use. Ensure other servers are stopped."
}

try {
    $listener.Start()
    Write-Host "Static web server started."
    Write-Host "Listening at: http://localhost:$port/"
    
    while ($listener.IsListening) {
        $response = $null
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $urlPath = $request.Url.LocalPath
            
            if ($request.HttpMethod -eq "POST" -and $urlPath -eq "/log") {
                $reader = New-Object System.IO.StreamReader($request.InputStream)
                $body = $reader.ReadToEnd()
                [System.IO.File]::AppendAllText("E:\Lansem Website\browser.log", $body + "`n")
                $response.StatusCode = 200
                $response.OutputStream.Close()
                continue
            }
            
            if ($urlPath -eq "/") { $urlPath = "/index.html" }
            
            # Clean path and join with root directory
            $cleanPath = $urlPath.TrimStart('/')
            $localPath = Join-Path $root $cleanPath.Replace("/", "\")
            
            if (Test-Path $localPath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($localPath)
                $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                $contentType = "application/octet-stream"
                
                switch ($ext) {
                    ".html" { $contentType = "text/html; charset=utf-8" }
                    ".css"  { $contentType = "text/css; charset=utf-8" }
                    ".js"   { $contentType = "application/javascript; charset=utf-8" }
                    ".png"  { $contentType = "image/png" }
                    ".jpg"  { $contentType = "image/jpeg" }
                    ".jpeg" { $contentType = "image/jpeg" }
                    ".gif"  { $contentType = "image/gif" }
                    ".svg"  { $contentType = "image/svg+xml" }
                    ".ico"  { $contentType = "image/x-icon" }
                }
                
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        } catch {
            Write-Host "Request processing error: $_"
        } finally {
            if ($null -ne $response) {
                try {
                    $response.OutputStream.Close()
                } catch {
                    # Ignore close errors if client disconnected
                }
            }
        }
    }
} catch {
    Write-Host "Server startup error: $_"
} finally {
    $listener.Close()
}