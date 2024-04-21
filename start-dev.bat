@echo off
REM start-dev.bat

REM Navigate to the React app directory and build the React app
cd "C:\Users\Christopher\OneDrive - University of Florida\Documents\CLASSES WORK\Spring 2024\COP3530 - DSA\Final Project 3\DSAFinal\react-app"
echo Building React app...
call npm run build
IF %ERRORLEVEL% NEQ 0 (
  echo Building the React app failed
  exit /b %ERRORLEVEL%
)

REM Navigate back to the root directory and then to the backend directory
cd ..
cd "C:\Users\Christopher\OneDrive - University of Florida\Documents\CLASSES WORK\Spring 2024\COP3530 - DSA\Final Project 3\DSAFinal\backEnd"
echo Starting backend...
start cmd /k python backend.py run
IF %ERRORLEVEL% NEQ 0 (
  echo Starting backend failed
  exit /b %ERRORLEVEL%
)

REM Navigate back to the React app directory and start the React development server
cd "C:\Users\Christopher\OneDrive - University of Florida\Documents\CLASSES WORK\Spring 2024\COP3530 - DSA\Final Project 3\DSAFinal\react-app"
echo Starting React development server...
call npm start
IF %ERRORLEVEL% NEQ 0 (
  echo Starting the development server failed
  exit /b %ERRORLEVEL%
)

REM Note: Replace "C:\path\to\your" with the actual path to your project directories
