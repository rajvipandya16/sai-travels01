@echo off
echo Setting up Sai Travels Admin Panel...
echo.

echo Installing Admin Backend dependencies...
cd backend
npm install
cd ..

echo.
echo Installing Admin Frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo Setup complete! You can now run start-admin.bat to start the admin panel.
echo.
pause 