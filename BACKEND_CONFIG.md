# Backend Server Configuration

## Issue
The frontend is currently trying to call `https://payday-new.vercel.app/api/applications` which is incorrect because:
- `https://payday-new.vercel.app` is the frontend deployment (Next.js app)
- The backend API routes don't exist on the frontend
- This causes 401 Unauthorized errors

## Solution
You need to configure the frontend to point to the correct backend server.

## Configuration Options

### Option 1: Environment Variable (Recommended)
Create a `.env.local` file in the `payday-website` directory:

```env
# Backend Server Configuration
NEXT_PUBLIC_DASHBOARD_SERVER=https://your-backend-server.com
```

### Option 2: Update API Config Directly
Modify `src/config/api.ts` and change the `DASHBOARD_SERVER` value:

```typescript
const API_CONFIG = {
  // Dashboard server URL - change this for production
  DASHBOARD_SERVER: process.env.NEXT_PUBLIC_DASHBOARD_SERVER || 'https://your-backend-server.com',
  // ... rest of config
};
```

## Backend Server URLs

### Development
```env
NEXT_PUBLIC_DASHBOARD_SERVER=http://localhost:3000
```

### Production Examples
```env
# If backend is on same domain
NEXT_PUBLIC_DASHBOARD_SERVER=https://yourdomain.com

# If backend is on separate domain
NEXT_PUBLIC_DASHBOARD_SERVER=https://api.yourdomain.com

# If using Vercel for backend
NEXT_PUBLIC_DASHBOARD_SERVER=https://your-backend-project.vercel.app
```

## Current Backend Structure
The backend server (`payday-server/`) has these API routes:
- `/api/applications` - Career applications management
- `/api/jobs` - Job management
- `/api/admin` - Admin user management
- `/api/auth` - Authentication

## Verification Steps
1. Set the correct backend URL
2. Ensure the backend server is running and accessible
3. Test authentication by logging in
4. Verify API calls work (e.g., `/api/applications`)

## CORS Configuration
Make sure your backend server has CORS configured to allow requests from your frontend domain.

## Example Backend CORS Config
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://payday-new.vercel.app', // Your frontend
    'https://paydayexpress.ca'
  ],
  credentials: true
};
``` 