# Setting Up the First Admin User

This guide explains how to set up the first administrator user in your system.

## Why This is Needed

- New user registrations automatically get "User" role
- Only admins can assign roles to other users
- The first admin must be created directly in the database

## Method 1: Database Direct Insert (Recommended)

### MongoDB
```javascript
// Connect to your MongoDB database
use payday-dashboard

// Insert the first admin user
db.users.insertOne({
  name: "Admin User",
  email: "admin@payday.com",
  password: "$2b$10$...", // Hashed password
  role: "admin",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Generate Password Hash
```bash
# Using Node.js bcrypt
node -e "
const bcrypt = require('bcryptjs');
const password = 'your-admin-password';
bcrypt.hash(password, 10).then(hash => console.log(hash));
"
```

## Method 2: Backend API (If Available)

If your backend has a setup endpoint:

```bash
curl -X POST http://localhost:3002/api/setup/admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@payday.com",
    "password": "your-admin-password"
  }'
```

## Method 3: Environment Variable (Development)

For development, you can set a default admin in your `.env`:

```env
DEFAULT_ADMIN_EMAIL=admin@payday.com
DEFAULT_ADMIN_PASSWORD=admin123
DEFAULT_ADMIN_NAME=Admin User
```

## Security Considerations

1. **Strong Password**: Use a strong, unique password
2. **Secure Email**: Use a secure email address you control
3. **Change Default**: Change the default password immediately after first login
4. **2FA**: Consider enabling two-factor authentication for admin accounts

## After Setup

1. Login with your admin credentials
2. Navigate to `/dashboard/admin`
3. Create additional users and assign roles as needed
4. Consider creating backup admin accounts

## Troubleshooting

### "Access Denied" Error
- Ensure the user has `role: "admin"` in the database
- Check that the user status is `"active"`
- Verify the JWT token contains the correct role

### User Not Found
- Check the email spelling in the database
- Ensure the user document exists and is properly formatted
- Verify the database connection

### Role Assignment Issues
- Only admins can access `/dashboard/admin`
- Ensure you're logged in as an admin user
- Check browser console for any JavaScript errors

## Database Schema

The user document should have this structure:

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // Hashed with bcrypt
  role: "admin" | "hr" | "manager" | "user",
  status: "active" | "inactive",
  createdAt: Date,
  updatedAt: Date
}
```

## Next Steps

Once you have your first admin user:

1. **Create HR Managers**: Assign HR roles to appropriate users
2. **Set Up Department Managers**: Assign manager roles to team leads
3. **Configure Permissions**: Set up role-based access controls
4. **Monitor Access**: Regularly review user roles and permissions
5. **Backup Strategy**: Implement backup admin accounts 