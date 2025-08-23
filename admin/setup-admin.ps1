Write-Host "Setting up Sai Travels Admin Panel..." -ForegroundColor Green
Write-Host ""

# Install Backend Dependencies
Write-Host "Installing Admin Backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
Set-Location ..

Write-Host ""

# Install Frontend Dependencies
Write-Host "Installing Admin Frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
Set-Location ..

Write-Host ""
Write-Host "Setup complete! You can now run start-admin.ps1 to start the admin panel." -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to continue" 