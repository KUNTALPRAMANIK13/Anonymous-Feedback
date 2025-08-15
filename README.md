# True Feedback - Anonymous Messaging Platform

A modern, secure anonymous messaging platform built with Next.js 14, TypeScript, and MongoDB. Users can create profiles and receive anonymous messages from others while maintaining complete privacy.

## 🌟 Features

### Core Functionality

- **Anonymous Messaging**: Send and receive messages without revealing sender identity
- **User Profiles**: Create unique profile links (e.g., `/u/username`) for receiving messages
- **Message Management**: View, delete, and manage received messages
- **Message Toggle**: Enable/disable message reception with a simple switch
- **AI-Powered Suggestions**: Get intelligent message suggestions using Google's Gemini AI

### Authentication & Security

- **Email Verification**: Secure account verification via email
- **Password Recovery**: Forgot password functionality with email verification
- **NextAuth Integration**: Robust authentication with JWT sessions
- **Password Validation**: Strong password requirements with regex validation
- **MongoDB Security**: Secure database connections with Mongoose ODM

### User Experience

- **Modern UI**: Beautiful, responsive design with Tailwind CSS and shadcn/ui
- **Real-time Feedback**: Toast notifications for all user actions
- **Loading States**: Smooth loading indicators throughout the app
- **Mobile Responsive**: Optimized for all device sizes
- **Dark Theme**: Elegant dark mode interface

### Technical Features

- **TypeScript**: Full type safety across the application
- **API Routes**: RESTful API endpoints for all functionality
- **Form Validation**: Zod schema validation for all forms
- **Error Handling**: Comprehensive error handling and user feedback
- **Email Integration**: Resend email service for notifications

## 🛠️ Tech Stack

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **React Hook Form**: Form management with validation
- **Lucide React**: Beautiful icon library

### Backend

- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database with Mongoose ODM
- **NextAuth.js**: Authentication and session management
- **bcryptjs**: Password hashing and verification

### AI & External Services

- **Google Gemini AI**: AI-powered message suggestions
- **Resend**: Email delivery service
- **React Email**: Email template system

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
anonymous-feedback/
├── src/
│   ├── app/
│   │   ├── (app)/           # Protected app routes
│   │   │   ├── dashboard/   # User dashboard
│   │   │   └── forgot-password/ # Password recovery
│   │   ├── (auth)/          # Authentication routes
│   │   │   ├── sign-in/     # Login page
│   │   │   ├── sign-up/     # Registration page
│   │   │   └── verify/      # Email verification
│   │   ├── api/             # API routes
│   │   │   ├── auth/        # Authentication APIs
│   │   │   ├── send-message/ # Message sending
│   │   │   ├── get-message/ # Message retrieval
│   │   │   ├── suggest-messages/ # AI suggestions
│   │   │   └── ...          # Other API endpoints
│   │   └── u/[username]/    # Public profile pages
│   ├── components/          # Reusable UI components
│   ├── models/              # MongoDB schemas
│   ├── schemas/             # Zod validation schemas
│   ├── lib/                 # Utility functions
│   ├── helpers/             # Helper functions
│   └── types/               # TypeScript type definitions
├── emails/                  # Email templates
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Google Gemini AI API key
- Resend API key (for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd anonymous-feedback
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Email Service (Resend)
   RESEND_API_KEY=your_resend_api_key

   # AI Service (Google Gemini)
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### For Users Receiving Messages

1. **Create an Account**

   - Visit `/sign-up` to register
   - Verify your email address
   - Complete your profile setup

2. **Get Your Profile Link**

   - After login, visit your dashboard
   - Copy your unique profile link (e.g., `yoursite.com/u/yourusername`)
   - Share this link with others to receive anonymous messages

3. **Manage Messages**
   - View all received messages in your dashboard
   - Delete unwanted messages
   - Toggle message reception on/off

### For Users Sending Messages

1. **Find a Profile**

   - Visit any user's profile link (e.g., `yoursite.com/u/username`)
   - Check if they're accepting messages

2. **Send a Message**
   - Write your anonymous message
   - Use AI suggestions for inspiration
   - Send the message (no account required)

## 🔧 API Endpoints

### Authentication

- `POST /api/sign-up` - User registration
- `POST /api/verify-code` - Email verification
- `POST /api/forgot-password` - Password recovery
- `POST /api/change-password` - Password change

### Messages

- `POST /api/send-message` - Send anonymous message
- `GET /api/get-message` - Get user's messages
- `DELETE /api/delete-message/[id]` - Delete message
- `POST /api/accept-message` - Toggle message acceptance

### AI Features

- `POST /api/suggest-messages` - Get AI message suggestions

### Utilities

- `GET /api/checkUsernameUnique` - Check username availability

## 🎨 Customization

### Styling

The app uses Tailwind CSS with shadcn/ui components. You can customize:

- Colors in `tailwind.config.ts`
- Component styles in `src/components/ui/`
- Global styles in `src/app/globals.css`

### Email Templates

Customize email templates in the `emails/` directory:

- `verificationEmails.tsx` - Email verification template
- `forgotPasswordEmails.tsx` - Password recovery template

### AI Suggestions

Modify AI behavior in `src/app/api/suggest-messages/route-fixed.ts`:

- Adjust temperature and generation parameters
- Add custom fallback questions
- Modify prompt engineering

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Sessions**: Secure session management with NextAuth
- **Input Validation**: Zod schemas for all user inputs
- **Rate Limiting**: Built-in API rate limiting
- **CORS Protection**: Configured for production use
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Resend](https://resend.com/) for email delivery
- [MongoDB](https://www.mongodb.com/) for the database

---

**True Feedback** - Where your identity remains a secret. ✨
