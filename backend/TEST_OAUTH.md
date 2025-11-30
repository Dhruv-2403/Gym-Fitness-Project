# Testing Google OAuth

## Quick Test Steps

### 1. Start the Server
```bash
cd backend
npm run dev
```

### 2. Test the Endpoint (in another terminal)
```bash
# Test without token (should return error)
curl -X POST http://localhost:3000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected: {"error":"Google token is required"}
```

### 3. Test with Real Google Token

**Option A: Using the test script**
```bash
node test-oauth.js
```

**Option B: Using curl with a real token**
```bash
curl -X POST http://localhost:3000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token":"YOUR_GOOGLE_ID_TOKEN_HERE"}'
```

## Frontend Integration

In your frontend, after getting the Google ID token:

```javascript
// After Google Sign-In
const response = await fetch('http://localhost:3000/api/auth/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: googleIdToken })
});

const data = await response.json();
// data.token is your JWT token
// data.user contains user info
```

## Environment Setup

Make sure you have in your `.env` file:
```
GOOGLE_CLIENT_ID=your_google_client_id_here
JWT_SECRET_KEY=your_jwt_secret
```

## Success Indicators

✅ Server starts without errors
✅ `/api/auth/google` endpoint returns 400 with "Google token is required" when no token sent
✅ With valid Google token, returns 200 with user and JWT token

