@echo off
echo Starting Sai Travels Admin Panel...
echo.

echo Starting Admin Backend...
start "Admin Backend" cmd /k "cd backend && npm start"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Admin Frontend...
start "Admin Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Admin Panel is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3001
echo.
echo Press any key to exit this window...
pause > nul 