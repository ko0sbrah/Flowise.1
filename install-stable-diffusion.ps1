# Stable Diffusion AUTOMATIC1111 WebUI installer for Windows 10/11
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

# Paths
$BaseDir = 'D:\stable-diffusion'
$RepoDir = Join-Path $BaseDir 'stable-diffusion-webui'
$VenvDir = Join-Path $BaseDir 'venv'
$ModelsDir = Join-Path $RepoDir 'models'
$TmpDir = Join-Path $BaseDir 'tmp'
$PipCache = Join-Path $BaseDir 'pip-cache'
$InstallersDir = Join-Path $BaseDir 'installers'
$PythonDir = 'D:\python310'
$GitDir = 'D:\Git'
$WebuiUserBat = Join-Path $BaseDir 'webui-user.bat'

# Ensure base folders exist on D:
Write-Host 'Creating required folders on D:\...'
@($BaseDir, $RepoDir, $VenvDir, $TmpDir, $PipCache, $InstallersDir) | ForEach-Object {
    if (-not (Test-Path $_)) { New-Item -ItemType Directory -Path $_ | Out-Null }
}

# Force temp/cache locations to D:
Write-Host 'Setting temp and cache environment variables to D:\...'
$env:TEMP = $TmpDir
$env:TMP = $TmpDir
$env:PIP_CACHE_DIR = $PipCache
$env:PYTHONNOUSERSITE = '1'

# Helper to download files to D:\
function Get-FileToD {
    param(
        [Parameter(Mandatory = $true)][string]$Url,
        [Parameter(Mandatory = $true)][string]$OutFile
    )
    if (-not (Test-Path $OutFile)) {
        Write-Host "Downloading $Url ..."
        Invoke-WebRequest -Uri $Url -OutFile $OutFile
    } else {
        Write-Host "Already downloaded: $OutFile"
    }
}

# Install Git if missing
Write-Host 'Checking for Git...'
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host 'Git not found. Installing Git to D:\Git ...'
    $GitInstaller = Join-Path $InstallersDir 'git-installer.exe'
    $GitUrl = 'https://github.com/git-for-windows/git/releases/latest/download/Git-2.45.2-64-bit.exe'
    Get-FileToD -Url $GitUrl -OutFile $GitInstaller
    Start-Process -FilePath $GitInstaller -ArgumentList "/VERYSILENT /NORESTART /DIR=\"$GitDir\"" -Wait
} else {
    Write-Host 'Git is already installed.'
}

# Add Git to PATH for this session and persist for user
if (Test-Path (Join-Path $GitDir 'cmd\git.exe')) {
    $GitPath = (Join-Path $GitDir 'cmd')
    if ($env:PATH -notlike "*$GitPath*") { $env:PATH = "$GitPath;$env:PATH" }
    [Environment]::SetEnvironmentVariable('PATH', "$GitPath;" + [Environment]::GetEnvironmentVariable('PATH', 'User'), 'User')
}

# Install Python 3.10.x if missing
Write-Host 'Checking for Python 3.10...'
$PythonExe = Join-Path $PythonDir 'python.exe'
if (-not (Test-Path $PythonExe)) {
    Write-Host 'Python 3.10 not found. Installing to D:\python310 ...'
    $PythonInstaller = Join-Path $InstallersDir 'python-3.10.11-amd64.exe'
    $PythonUrl = 'https://www.python.org/ftp/python/3.10.11/python-3.10.11-amd64.exe'
    Get-FileToD -Url $PythonUrl -OutFile $PythonInstaller
    Start-Process -FilePath $PythonInstaller -ArgumentList "/quiet InstallAllUsers=1 TargetDir=\"$PythonDir\" PrependPath=1 Include_pip=1" -Wait
} else {
    Write-Host 'Python 3.10 is already installed.'
}

# Add Python to PATH for this session and persist for user
if (Test-Path $PythonExe) {
    if ($env:PATH -notlike "*$PythonDir*") { $env:PATH = "$PythonDir;$env:PATH" }
    [Environment]::SetEnvironmentVariable('PATH', "$PythonDir;" + [Environment]::GetEnvironmentVariable('PATH', 'User'), 'User')
}

# Clone or update AUTOMATIC1111 WebUI
Write-Host 'Setting up AUTOMATIC1111 WebUI...'
if (-not (Test-Path (Join-Path $RepoDir '.git'))) {
    Write-Host 'Cloning repository...'
    git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git $RepoDir
} else {
    Write-Host 'Repository already exists. Skipping clone.'
}

# Ensure model directories exist on D:\ (user can drop checkpoints here)
if (-not (Test-Path $ModelsDir)) { New-Item -ItemType Directory -Path $ModelsDir | Out-Null }

# Create webui-user.bat in D:\stable-diffusion\
Write-Host 'Creating webui-user.bat launcher...'
@"
@echo off
set "PYTHON=$PythonExe"
set "GIT=$GitDir\cmd\git.exe"
set "VENV_DIR=$VenvDir"
set "PIP_CACHE_DIR=$PipCache"
set "TEMP=$TmpDir"
set "TMP=$TmpDir"
set "COMMANDLINE_ARGS=--xformers --medvram --opt-split-attention --no-half-vae"
set "SD_WEBUI_DIR=$RepoDir"
call "%RepoDir%\webui.bat"
"@ | Set-Content -Path $WebuiUserBat -Encoding ASCII

Write-Host 'Setup complete. Launch by running:'
Write-Host "  $WebuiUserBat"
