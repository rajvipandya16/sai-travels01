# Sai Travels - Admin Panel

This is the dedicated admin panel for Sai Travels bus booking system.

## Project Structure

```
admin/
├── frontend/     # React admin frontend (Port 3001)
└── backend/      # Node.js admin backend (Port 5000)
```

## Quick Start

### 1. Start the Admin Backend

```bash
cd admin/backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

### 2. Start the Admin Frontend

```bash
cd admin/frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3001`

### 3. Access the Admin Panel

1. Open your browser and go to `http://localhost:3001`
2. You'll be redirected to the login page
3. If you don't have an admin account, click "Register here" to create one
4. After registration, you'll be redirected to login
5. Sign in with your admin credentials
6. Access the admin dashboard

## Admin Features

- **Dashboard**: Overview of system statistics
- **Add Bus**: Add new bus routes
- **Manage Buses**: View, edit, and delete bus routes
- **Manage Bookings**: View and manage all bookings
- **Manage Users**: View and manage user accounts
- **Admin Settings**: Change password and manage admin account

## API Endpoints

The admin backend provides the following endpoints:

- `POST /api/admin/register` - Admin registration
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/buses` - Get all buses
- `POST /api/admin/add-bus` - Add new bus
- `PUT /api/admin/update-bus/:id` - Update bus
- `DELETE /api/admin/delete-bus/:id` - Delete bus
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/users` - Get all users
- `POST /api/admin/change-password` - Change admin password
- `GET /api/admin/profile` - Get admin profile

## Environment Variables

Make sure to set up your environment variables in `backend/.env`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Security

- All admin routes are protected with JWT authentication
- Passwords are hashed using bcrypt
- Admin sessions expire after 24 hours
- CORS is configured for the admin frontend

## Development

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB
- Authentication: JWT tokens
- Styling: Tailwind CSS with custom admin theme 