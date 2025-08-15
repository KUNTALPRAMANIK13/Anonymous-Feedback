# How to Set Up Google AI Studio API Key

## Step 1: Get Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Add to Environment Variables

1. Open your `.env.local` file in the project root
2. Replace `your_actual_google_ai_api_key_here` with your actual API key:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
```

## Step 3: Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## Step 4: Test the Suggest Messages Feature

1. Go to your dashboard
2. Look for a "Suggest Messages" button or similar feature
3. Click it to test if the AI-generated suggestions are working

## Troubleshooting

If you still get 500 errors:

1. Check the console logs in your terminal for detailed error messages
2. Verify your API key is correctly set (no extra spaces or quotes)
3. Make sure you have credits/quota available in your Google AI Studio account
4. Check if the Google Generative AI package is installed:
   ```bash
   npm install @google/generative-ai
   ```

The API should now work correctly with proper error handling and logging!
