# Todo Application - Backend API Specification

## Overview

This document specifies the backend API endpoints required for the Todo application. The frontend is already built with fetch calls and expects these endpoints to be implemented on your backend.

## Base URL

Your backend should serve these endpoints from:
```
http://your-backend-domain.com/api
```

Update the frontend's API URL in `.env`:
```
VITE_API_URL=http://your-backend-domain.com/api
```

Or directly in `/src/app/lib/api.ts`:
```javascript
const API_BASE_URL = 'http://your-backend-domain.com/api';
```

---

## Authentication Flow

1. User signs up or logs in
2. Backend returns a JWT token
3. Frontend stores token in localStorage
4. All subsequent requests include token in `Authorization: Bearer <token>` header
5. Backend validates token and returns user-specific data

---

## Standard Response Format

All endpoints must return JSON in this format:

### Success Response
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

---

## Required Endpoints

### 1. User Signup

**Endpoint:** `POST /api/auth/signup`

**Description:** Create a new user account and return authentication token.

**Frontend Call:**
```javascript
// From /src/app/lib/api.ts
fetch('http://your-backend.com/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, name })
})
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_abc123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "User with this email already exists"
}
```

**Backend Requirements:**
- Validate email format
- Ensure email is unique
- Hash password before storing (use bcrypt, argon2, etc.)
- Generate JWT token with user ID
- Return user object (without password) and token

---

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and return token.

**Frontend Call:**
```javascript
fetch('http://your-backend.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_abc123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

**Backend Requirements:**
- Find user by email
- Verify password hash
- Generate new JWT token
- Return user object and token

---

### 3. User Logout

**Endpoint:** `POST /api/auth/logout`

**Description:** Invalidate the current user's session.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch('http://your-backend.com/api/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**Request Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response (200 OK):**
```json
{
  "success": true
}
```

**Backend Requirements:**
- Validate JWT token
- Optional: Add token to blacklist/invalidate in database
- Return success response

---

### 4. Get Current User

**Endpoint:** `GET /api/auth/me`

**Description:** Get the currently authenticated user's information.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch('http://your-backend.com/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user_abc123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": "Not authenticated"
}
```

**Backend Requirements:**
- Validate JWT token
- Extract user ID from token
- Fetch user from database
- Return user object (without password)

---

### 5. Get All Todos

**Endpoint:** `GET /api/todos`

**Description:** Get all todos for the authenticated user.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch('http://your-backend.com/api/todos', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "todo_xyz789",
      "userId": "user_abc123",
      "title": "Buy groceries",
      "completed": false,
      "createdAt": "2026-03-20T10:30:00.000Z",
      "updatedAt": "2026-03-20T10:30:00.000Z"
    },
    {
      "id": "todo_xyz790",
      "userId": "user_abc123",
      "title": "Finish project",
      "completed": true,
      "createdAt": "2026-03-19T14:20:00.000Z",
      "updatedAt": "2026-03-20T09:15:00.000Z"
    }
  ]
}
```

**Backend Requirements:**
- Validate JWT token
- Extract user ID from token
- Query todos where userId matches
- Return array of todos sorted by createdAt (newest first)

---

### 6. Get Todo by ID

**Endpoint:** `GET /api/todos/:id`

**Description:** Get a specific todo by ID.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch(`http://your-backend.com/api/todos/${todoId}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**URL Parameters:**
- `id` - Todo ID

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "todo_xyz789",
    "userId": "user_abc123",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2026-03-20T10:30:00.000Z",
    "updatedAt": "2026-03-20T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Backend Requirements:**
- Validate JWT token
- Verify todo belongs to authenticated user
- Return todo object

---

### 7. Create Todo

**Endpoint:** `POST /api/todos`

**Description:** Create a new todo item.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch('http://your-backend.com/api/todos', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'Buy groceries' })
})
```

**Request Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "todo_xyz789",
    "userId": "user_abc123",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2026-03-20T10:30:00.000Z",
    "updatedAt": "2026-03-20T10:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Title is required"
}
```

**Backend Requirements:**
- Validate JWT token
- Validate title is not empty
- Create todo with userId from token
- Set completed to false by default
- Set createdAt and updatedAt timestamps
- Return created todo object

---

### 8. Update Todo

**Endpoint:** `PUT /api/todos/:id`

**Description:** Update an existing todo (title and/or completion status).

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch(`http://your-backend.com/api/todos/${todoId}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    title: 'Buy groceries and cook dinner',
    completed: true 
  })
})
```

**URL Parameters:**
- `id` - Todo ID

**Request Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (both fields optional):**
```json
{
  "title": "Buy groceries and cook dinner",
  "completed": true
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "todo_xyz789",
    "userId": "user_abc123",
    "title": "Buy groceries and cook dinner",
    "completed": true,
    "createdAt": "2026-03-20T10:30:00.000Z",
    "updatedAt": "2026-03-20T15:45:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Backend Requirements:**
- Validate JWT token
- Verify todo exists and belongs to user
- Update only provided fields (title and/or completed)
- Update updatedAt timestamp
- Return updated todo object

---

### 9. Delete Todo

**Endpoint:** `DELETE /api/todos/:id`

**Description:** Delete a todo item.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch(`http://your-backend.com/api/todos/${todoId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**URL Parameters:**
- `id` - Todo ID

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Backend Requirements:**
- Validate JWT token
- Verify todo exists and belongs to user
- Delete todo from database
- Return success response

---

### 10. Toggle Todo Completion

**Endpoint:** `PATCH /api/todos/:id/toggle`

**Description:** Toggle the completion status of a todo.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch(`http://your-backend.com/api/todos/${todoId}/toggle`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**URL Parameters:**
- `id` - Todo ID

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "todo_xyz789",
    "userId": "user_abc123",
    "title": "Buy groceries",
    "completed": true,
    "createdAt": "2026-03-20T10:30:00.000Z",
    "updatedAt": "2026-03-20T15:45:00.000Z"
  }
}
```

**Backend Requirements:**
- Validate JWT token
- Verify todo exists and belongs to user
- Toggle completed field (true → false, false → true)
- Update updatedAt timestamp
- Return updated todo object

---

### 11. Get Todo Statistics

**Endpoint:** `GET /api/todos/stats`

**Description:** Get statistics about user's todos.

**Frontend Call:**
```javascript
const token = localStorage.getItem('auth_token');
fetch('http://your-backend.com/api/todos/stats', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 6,
    "pending": 4
  }
}
```

**Backend Requirements:**
- Validate JWT token
- Count total todos for user
- Count completed todos (completed = true)
- Count pending todos (completed = false)
- Return statistics object

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Todos Table

```sql
CREATE TABLE todos (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_completed ON todos(completed);
```

---

## HTTP Status Codes

Use appropriate HTTP status codes:

| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, PATCH, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Not Found (resource doesn't exist) |
| 500 | Internal Server Error |

---

## Security Requirements

### 1. Password Security
- Hash passwords using bcrypt (cost factor 10+) or argon2
- Never store plain text passwords
- Never return password hashes in API responses

### 2. JWT Tokens
- Use HS256 or RS256 algorithm
- Include user ID in token payload
- Set appropriate expiration (e.g., 7 days)
- Sign with secure secret key (min 256 bits)

Example JWT payload:
```json
{
  "userId": "user_abc123",
  "email": "user@example.com",
  "iat": 1710932400,
  "exp": 1711537200
}
```

### 3. Authorization
- Verify JWT token on all protected endpoints
- Extract user ID from token, not request body
- Ensure users can only access their own todos
- Return 401 for invalid/expired tokens

### 4. Input Validation
- Validate all request inputs
- Sanitize user-provided data
- Use parameterized queries (prevent SQL injection)
- Limit title length (e.g., max 500 characters)

### 5. CORS Configuration
```javascript
// Allow only your frontend domain
Access-Control-Allow-Origin: https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### 6. Rate Limiting
- Implement rate limiting on auth endpoints
- Example: 5 login attempts per 15 minutes per IP

---

## Environment Variables

Your backend should use environment variables:

```env
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/todo_app

# JWT
JWT_SECRET=your-super-secret-key-min-256-bits
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=https://your-frontend-domain.com
```

---

## Example Backend Implementation (Node.js/Express)

### Install Dependencies
```bash
npm install express jsonwebtoken bcrypt cors dotenv
npm install --save-dev @types/express @types/jsonwebtoken @types/bcrypt
```

### Middleware: Auth Verification
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.json({ success: false, error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.json({ success: false, error: 'Invalid token' });
  }
};

module.exports = verifyToken;
```

### Example Route: Login
```javascript
// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.json({ success: false, error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
```

### Example Route: Get Todos
```javascript
// routes/todos.js
const express = require('express');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const todos = await db.query(
      'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
      [req.userId]
    );

    res.json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
```

---

## Testing the API

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Todos:**
```bash
curl -X GET http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Create Todo:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

---

## Recommended Backend Frameworks

- **Node.js:** Express.js, Fastify, NestJS
- **Python:** Django REST Framework, FastAPI, Flask
- **Ruby:** Ruby on Rails, Sinatra
- **PHP:** Laravel, Symfony
- **Go:** Gin, Echo, Fiber
- **Java:** Spring Boot

---

## Deployment Checklist

- [ ] Set up database (PostgreSQL, MySQL, MongoDB, etc.)
- [ ] Configure environment variables
- [ ] Implement all 11 endpoints
- [ ] Add JWT authentication
- [ ] Hash passwords with bcrypt
- [ ] Add input validation
- [ ] Configure CORS for your frontend domain
- [ ] Add rate limiting
- [ ] Set up HTTPS (SSL certificate)
- [ ] Test all endpoints
- [ ] Update frontend VITE_API_URL to production backend URL

---

## Support

The frontend is ready and makes all necessary fetch calls. Simply implement these 11 endpoints on your backend following this specification, and the application will work seamlessly.
