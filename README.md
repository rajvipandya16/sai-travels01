# Sai Travels - User Management System

This is a React/Vite frontend with a Node.js/Express backend for user management.

## Features

- User registration and login system
- Separate registration and login pages with modern UI
- User management interface to view all registered users
- Form validation and error handling
- Modern UI with Tailwind CSS
- Responsive design

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `env.example`:
   ```bash
   cp env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/root?retryWrites=true&w=majority
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## API Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/users` - Get all users

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Click on "Register" or "Login" in the navigation menu
3. Create a new account or sign in with existing credentials
4. Access the "Users" page to view all registered users (admin interface)

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **CORS**: Enabled for cross-origin requests

Screen Shots:
![image](https://github.com/user-attachments/assets/e4562f01-cd23-4ce8-a062-b695d7ef5d0e)
![image](https://github.com/user-attachments/assets/7187774e-2a84-4050-8aec-4fbaf6f360c4)
![image](https://github.com/user-attachments/assets/adcca561-6af0-4a16-9d72-9d3efb7671f7)
![image](https://github.com/user-attachments/assets/43431367-df98-43de-8939-b63e2e79a8c0)
![image](https://github.com/user-attachments/assets/c35f9b55-b3d6-4216-a450-09f9f5ad950f)
![image](https://github.com/user-attachments/assets/6a981f55-bf91-4bd4-97a1-403d093c6ba1)
![image](https://github.com/user-attachments/assets/3bf5d562-46d3-40bf-a6dc-84fd1362781c)
![image](https://github.com/user-attachments/assets/621a06bb-2630-4212-b01c-88ddd5592b4d)
