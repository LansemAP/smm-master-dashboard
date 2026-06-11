import os
import hashlib
import requests
import time
import sys

TOKEN = os.environ.get("VERCEL_TOKEN", "")
PROJECT_NAME = "lansem"
WEBSITE_DIR = r"c:\Users\ARNAB\.gemini\antigravity-ide\scratch\Master social media management\Lansem\Website"

headers = {
    "Authorization": f"Bearer {TOKEN}"
}

def get_project_id():
    print("Checking Vercel project details...")
    # First, try under personal account
    url = f"https://api.vercel.com/v9/projects/{PROJECT_NAME}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        prj_data = response.json()
        print(f"Found project '{PROJECT_NAME}' (ID: {prj_data['id']}) under personal account.")
        return prj_data['id'], None
    
    # If 404, list teams and check under each team
    print(f"Project not found under personal account (Status {response.status_code}). Checking teams...")
    teams_url = "https://api.vercel.com/v2/teams"
    teams_response = requests.get(teams_url, headers=headers)
    if teams_response.status_code == 200:
        teams = teams_response.json().get("teams", [])
        for team in teams:
            team_id = team["id"]
            team_name = team["name"]
            print(f"Checking under team '{team_name}' ({team_id})...")
            url = f"https://api.vercel.com/v9/projects/{PROJECT_NAME}?teamId={team_id}"
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                prj_data = response.json()
                print(f"Found project '{PROJECT_NAME}' (ID: {prj_data['id']}) under team '{team_name}'.")
                return prj_data['id'], team_id
                
    print("Error: Could not locate the project 'lansem' on Vercel under personal account or any team.")
    sys.exit(1)

def sha1_file(filepath):
    sha1 = hashlib.sha1()
    with open(filepath, 'rb') as f:
        while True:
            data = f.read(65536)
            if not data:
                break
            sha1.update(data)
    return sha1.hexdigest()

def upload_file(filepath, sha, size, team_id):
    url = "https://api.vercel.com/v2/files"
    if team_id:
        url += f"?teamId={team_id}"
        
    file_headers = {
        "Authorization": f"Bearer {TOKEN}",
        "x-vercel-digest": sha,
        "Content-Length": str(size),
        "Content-Type": "application/octet-stream"
    }
    
    with open(filepath, 'rb') as f:
        file_data = f.read()
        
    # Check if the file is already uploaded on Vercel (using digest header)
    # The Vercel API will return 200/201 if we upload it, but to see if it is cached we can just post it.
    response = requests.post(url, headers=file_headers, data=file_data)
    if response.status_code in (200, 201):
        return True
    else:
        print(f"Failed to upload {filepath}: {response.status_code} - {response.text}")
        return False

def deploy():
    project_id, team_id = get_project_id()
    
    files_to_deploy = []
    print("Scanning website directory for files...")
    
    ignore_dirs = {'.git', '.vercel', 'node_modules'}
    ignore_files = {'.gitignore', 'serve.ps1', 'package.json', 'package-lock.json', 'deploy_vercel.py'}
    
    for root, dirs, files in os.walk(WEBSITE_DIR):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for file in files:
            if file in ignore_files or file.endswith('.log'):
                continue
                
            filepath = os.path.join(root, file)
            relative_path = os.path.relpath(filepath, WEBSITE_DIR).replace('\\', '/')
            
            size = os.path.getsize(filepath)
            sha = sha1_file(filepath)
            
            files_to_deploy.append({
                "local_path": filepath,
                "file": relative_path,
                "sha": sha,
                "size": size
            })
            
    print(f"Found {len(files_to_deploy)} files to upload.")
    
    # Upload files one by one
    for idx, f in enumerate(files_to_deploy):
        print(f"[{idx+1}/{len(files_to_deploy)}] Uploading {f['file']} (SHA: {f['sha'][:8]})...")
        success = upload_file(f["local_path"], f["sha"], f["size"], team_id)
        if not success:
            print("Aborting deployment due to file upload failure.")
            sys.exit(1)
            
    # Trigger the deployment
    print("Triggering deployment on Vercel...")
    deploy_url = "https://api.vercel.com/v13/deployments"
    if team_id:
        deploy_url += f"?teamId={team_id}"
        
    payload = {
        "name": PROJECT_NAME,
        "target": "production",
        "files": [{"file": f["file"], "sha": f["sha"], "size": f["size"]} for f in files_to_deploy],
        "projectSettings": {
            "framework": None
        }
    }
    
    response = requests.post(deploy_url, headers=headers, json=payload)
    if response.status_code not in (200, 201):
        print(f"Failed to create deployment: {response.status_code} - {response.text}")
        sys.exit(1)
        
    deploy_data = response.json()
    deployment_id = deploy_data["id"]
    url = deploy_data["url"]
    print(f"\nDeployment created successfully!")
    print(f"Deployment ID: {deployment_id}")
    print(f"Deployment URL: https://{url}")
    
    # Poll deployment status
    print("\nPolling deployment status...")
    status_url = f"https://api.vercel.com/v13/deployments/{deployment_id}"
    if team_id:
        status_url += f"?teamId={team_id}"
        
    while True:
        status_response = requests.get(status_url, headers=headers)
        if status_response.status_code == 200:
            status_data = status_response.json()
            status = status_data.get("status")
            print(f"Status: {status}")
            if status == "READY":
                print("\nDeployment is live!")
                break
            elif status in ("ERROR", "CANCELED"):
                print(f"\nDeployment failed with status: {status}")
                sys.exit(1)
        else:
            print(f"Error checking status: {status_response.status_code}")
            
        time.sleep(5)

if __name__ == "__main__":
    deploy()
