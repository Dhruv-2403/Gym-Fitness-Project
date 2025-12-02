# FitFusion API Testing Guide

This guide will help you test all the APIs in the FitFusion project.

## Prerequisites

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dhruv-2403/FitFusion
   cd FitFusion
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Supabase:**
   - Create a `.env` file in the `backend` directory
   - Copy the contents from `.env.supabase` and fill in your Supabase credentials:
     ```
     DATABASE_URL="your-supabase-pooler-url"
     DIRECT_URL="your-supabase-direct-url"
     JWT_SECRET_KEY="your-secret-key"
     ```

4. **Push the database schema:**
   ```bash
   npx prisma db push
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:3000`

## Testing the APIs

You can test the APIs using:
- **Postman** (recommended)
- **Thunder Client** (VS Code extension)
- **Any HTTP client**


### Base URL
```
http://localhost:3000
```

---

## 1. Health Check

**Endpoint:** `GET /health`


**Expected Response:**
```json
{
  "status": "ok"
}
```

---

## 2. User Authentication APIs

### Sign Up
**Endpoint:** `POST /api/users/signup`

**Request Body:**
```json
{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_password": "password123"
}
```


**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "user_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
**Endpoint:** `POST /api/users/login`

**Request Body:**
```json
{
  "user_email": "john@example.com",
  "user_password": "password123"
}
```


**Expected Response:**
```json
{
  "message": "Login successful",
  "user": {
    "user_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ Important:** Save the `token` from the response. You'll need it for authenticated requests!

### Get Profile (Authenticated)
**Endpoint:** `GET /api/users/profile`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```


---

## 3. Exercise APIs

### Create Exercise (Authenticated)
**Endpoint:** `POST /api/exercises`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Bench Press",
  "muscleGroup": "Chest"
}
```


### Get All Exercises (Authenticated)
**Endpoint:** `GET /api/exercises`


---

## 4. Workout APIs

### Create Workout (Authenticated)
**Endpoint:** `POST /api/workouts`

**Request Body:**
```json
{
  "title": "Chest Day",
  "sets": [
    {
      "exerciseId": 1,
      "reps": 10,
      "weight": 60,
      "rpe": 8
    }
  ]
}
```

### Get User Workouts (Authenticated)
**Endpoint:** `GET /api/workouts`


---

## 5. E-commerce APIs

### Get All Products
**Endpoint:** `GET /api/products`


### Add to Cart (Authenticated)
**Endpoint:** `POST /api/cart`

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```


### Get Cart (Authenticated)
**Endpoint:** `GET /api/cart`


### Create Order (Authenticated)
**Endpoint:** `POST /api/orders`

**Request Body:**
```json
{
  "shippingAddress": "123 Main St, City, Country"
}
```

---

## 6. Attendance APIs

### Check In (Authenticated)
**Endpoint:** `POST /api/attendance/checkin`


### Check Out (Authenticated)
**Endpoint:** `POST /api/attendance/checkout`


---

## Postman Collection

For easier testing, you can import this into Postman:

1. Create a new Collection called "FitFusion"
2. Add an environment variable `baseUrl` = `http://localhost:3000`
3. Add an environment variable `token` (will be set after login)
4. Create requests for each endpoint above

---

## Viewing Data in Supabase

After testing the APIs, you can verify the data was stored:

1. Go to [https://supabase.com](https://supabase.com)
2. Open your project
3. Click **Table Editor** in the left sidebar
4. Select any table (User, Workout, Product, etc.)
5. View the inserted data!

---

## Common Issues

**Issue:** "Unauthorized" error
- **Solution:** Make sure you're including the JWT token in the Authorization header

**Issue:** "User already exists"
- **Solution:** Use a different email or login with existing credentials

**Issue:** Database connection error
- **Solution:** Check your `.env` file has correct Supabase credentials

---

## Need Help?

Check the API documentation in `backend/ECOMMERCE_API.md` for more details on e-commerce endpoints.
