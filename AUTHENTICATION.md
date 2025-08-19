# Authentication System

This document explains how to use the authentication system in the Payday website.

## Features

- **User Registration**: Create new accounts with different roles (HR, Manager, Admin)
- **User Login**: Secure authentication with JWT tokens
- **Protected Routes**: Dashboard pages are only accessible to authenticated users
- **Role-Based Access**: Different user roles have different permissions
- **Automatic Redirects**: Users are redirected to login if not authenticated
- **Persistent Sessions**: Users stay logged in across browser sessions

## User Roles

- **User**: Basic access to view job postings and apply
- **Department Manager**: Access to department-specific data and candidate management
- **HR Manager**: Full access to all HR functions including hiring decisions
- **Administrator**: Full system access including user role management

## How to Use

### 1. Access the Login Page

Navigate to `/login` to access the authentication page.

### 2. Create an Account

1. Click "create a new account" on the login page
2. Fill in your details:
   - Full Name
   - Email
   - Password
3. Click "Create account"
4. **Note**: New accounts start with "User" role by default

### 3. Sign In

1. Enter your email and password
2. Click "Sign in"
3. You'll be redirected to the dashboard

### 4. Access Dashboard

Once authenticated, you can access:
- `/dashboard` - Main dashboard
- `/dashboard/applications` - Job applications
- `/dashboard/jobs` - Job postings
- `/dashboard/candidates` - Candidate profiles
- `/dashboard/interviews` - Interview scheduling

**Admin Users Only:**
- `/dashboard/admin` - User management and role assignment

### 5. Sign Out

Click the "Sign out" button in the header or dashboard sidebar.

## Technical Details

### Authentication Flow

1. User submits login/register form
2. Frontend sends request to backend API
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. Token is sent with subsequent API requests
6. Protected routes check authentication status

### Role Management

1. **New Users**: Automatically assigned "User" role upon registration
2. **Role Assignment**: Only administrators can assign roles through the admin dashboard
3. **Admin Creation**: Admin users must be created directly in the database
4. **Role Hierarchy**: Admin > HR Manager > Department Manager > User

### Components

- **AuthContext**: Manages authentication state
- **ProtectedRoute**: Wraps protected pages
- **LoginPage**: Authentication form
- **DashboardLayout**: Layout for authenticated users

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

**Admin Endpoints:**
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user role/status
- `DELETE /api/admin/users/:id` - Delete user

## Security Features

- JWT tokens for secure authentication
- Password hashing on the backend
- Protected routes prevent unauthorized access
- Automatic token validation
- Secure logout (token removal)

## Development Notes

- The system works with mock data when backend is not available
- Authentication state is managed client-side for development
- Backend integration requires MongoDB and proper environment variables
- JWT_SECRET should be set in environment variables

## Troubleshooting

### Common Issues

1. **"Cannot access dashboard"**: Make sure you're logged in
2. **"Login failed"**: Check your credentials
3. **"Access denied"**: Verify your user role has the required permissions

### Development Mode

When running in development:
- Mock data is used if backend is unavailable
- Authentication checks are performed client-side
- No actual database connection required for basic functionality 