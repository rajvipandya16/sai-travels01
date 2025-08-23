# Sai Travels Backend

A Node.js + Express backend server for the Sai Travels application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `env.example` to `.env`
   - Update the values as needed, especially `MONGO_URI` with your MongoDB Atlas connection string

3. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000` by default.

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Cross-Origin Resource Sharing middleware
- **mongoose**: MongoDB object modeling for Node.js
- **dotenv**: Environment variables loader
- **nodemon**: Development server with auto-restart (dev dependency)

## API Endpoints

### Health Check
- **GET** `/` - Check if the API is running

### User Management
- **POST** `/register` - Register a new user
- **GET** `/users` - Get all registered users

## API Documentation

### POST /register
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "1703123456789",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2023-12-21T10:30:56.789Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Username, email, and password are required"
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### GET /users
Get all registered users.

**Response (200 OK):**
```json
{
  "success": true,
  "users": [
    {
      "id": "1703123456789",
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2023-12-21T10:30:56.789Z"
    }
  ],
  "count": 1
}
```

## Notes

- This is a basic implementation using in-memory storage
- MongoDB connection is set up but not yet integrated with the routes
- In a production environment, you should:
  - Create Mongoose models for data persistence
  - Hash passwords using bcrypt
  - Implement proper authentication (JWT, sessions)
  - Add input validation and sanitization
  - Implement rate limiting
  - Add proper error handling and logging
  - Set up proper environment variables 