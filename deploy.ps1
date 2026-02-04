# Configuration - UPDATE THESE
$NAS_USER = "admin"
$NAS_HOST = "192.168.1.100" # Replace with your NAS IP
$NAS_PATH = "/volume1/web/firmadigital" # Replace with your target directory on NAS

# Build first (optional if you want to ensure fresh build every time)
Write-Host "Building project..."
npm.cmd run build

# Prepare Staging
$StagingDir = ".\staging_deploy"
if (Test-Path $StagingDir) { Remove-Item $StagingDir -Recurse -Force }
New-Item -ItemType Directory -Path $StagingDir | Out-Null

Write-Host "Copying files to staging..."
Copy-Item -Path ".\dist" -Destination $StagingDir -Recurse
Copy-Item -Path ".\server.js" -Destination $StagingDir
Copy-Item -Path ".\package.json" -Destination $StagingDir
Copy-Item -Path ".\package-lock.json" -Destination $StagingDir
Copy-Item -Path ".\.env" -Destination $StagingDir

# Archive
$ZipFile = ".\deploy.zip"
Write-Host "Zipping files..."
Compress-Archive -Path "$StagingDir\*" -DestinationPath $ZipFile -Force

# Deploy
Write-Host "Deploying to $NAS_HOST..."
# Ensure directory exists
ssh "$NAS_USER@$NAS_HOST" "mkdir -p $NAS_PATH"

# Copy Zip
scp $ZipFile "$NAS_USER@$NAS_HOST`:$NAS_PATH/deploy.zip"

# Execute Remote Commands
$RemoteCommands = "
cd $NAS_PATH && \
unzip -o deploy.zip && \
rm deploy.zip && \
npm install --omit=dev && \
echo 'Deployment finished. Starting server...' && \
# Simple start - consider using PM2 for production: pm2 start server.js --name 'firmadigital'
nohup node server.js > output.log 2>&1 &
"

Write-Host "Running remote setup..."
ssh "$NAS_USER@$NAS_HOST" $RemoteCommands

Write-Host "Deployment script finished."
Write-Host "Check http://$NAS_HOST`:3300 to verify."
