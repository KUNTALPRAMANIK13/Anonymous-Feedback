# Environment Setup Instructions

To fix the 404 error and other issues in your anonymous-feedback app, follow these steps:

## 1. Set up Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Database Configuration
MONGODB_URI=your_mongodb_connection_string_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (if using Resend)
RESEND_API_KEY=your_resend_api_key_here
```

## 2. Make sure MongoDB is running

If you're using MongoDB Atlas:

- Get your connection string from MongoDB Atlas
- Replace `your_mongodb_connection_string_here` with your actual connection string

If you're using local MongoDB:

- Make sure MongoDB is running on your local machine
- Use: `MONGODB_URI=mongodb://localhost:27017/anonymous-feedback`

## 3. Generate NextAuth Secret

Generate a secure random string for NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

## 4. Restart the development server

After setting up the environment variables:

```bash
npm run dev
```

## Issues Fixed:

1. **404 Error on /api/get-message**: Fixed authentication and user lookup logic
2. **Switch component uncontrolled warning**: Added default values to form
3. **Variable naming conflicts**: Renamed variables to avoid conflicts
4. **Better error handling**: Added comprehensive logging and error handling
5. **Database connection**: Improved connection handling and error reporting

## Testing:

1. Sign up for a new account
2. Verify your email
3. Sign in
4. Go to dashboard - you should see your messages (empty initially)
5. Copy your unique link and test sending messages to yourself

## Debugging:

Check the browser console and terminal for detailed logging to identify any remaining issues.
