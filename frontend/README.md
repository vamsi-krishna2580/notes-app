# Todo Application with User Authentication

A modern, fully-functional todo application built with React, TypeScript, and Tailwind CSS. Features user authentication, complete CRUD operations, and a beautiful, responsive UI.

## ⚠️ Important: Backend Required

**This frontend application is production-ready and includes all fetch API calls.** However, you need to implement the backend API endpoints for it to work.

### Quick Start Options:

1. **Implement Your Own Backend**
   - See `API_DOCUMENTATION.md` for complete endpoint specifications
   - Backend must implement 11 endpoints (4 auth + 7 todos)
   - Example implementations provided for Node.js/Express

2. **Connect to Existing Backend**
   - Update `VITE_API_URL` in `.env` file
   - Ensure backend follows the API specification

3. **Test Without Backend**
   - The app will show connection errors
   - Use browser DevTools Network tab to see API calls being made

## Features

### Authentication
- ✅ User registration (Sign up)
- ✅ User login
- ✅ Secure logout
- ✅ Protected routes
- ✅ Persistent sessions

### Todo Management
- ✅ Create new todos
- ✅ Edit todo titles inline
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Real-time statistics (pending/completed count)
- ✅ Toast notifications for user feedback

### UI/UX
- 🎨 Modern, clean interface
- 📱 Fully responsive design
- 🌈 Gradient backgrounds
- ✨ Smooth transitions and hover effects
- 🔔 Toast notifications for all actions

## Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Vite** - Build tool

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx          # Login form component
│   │   │   └── SignupForm.tsx         # Sign up form component
│   │   ├── todos/
│   │   │   ├── AddTodoForm.tsx        # Add new todo form
│   │   │   ├── TodoItem.tsx           # Individual todo item
│   │   │   └── TodoList.tsx           # Todo list with stats
│   │   └── RedirectToTodos.tsx        # Redirect helper component
│   ├── lib/
│   │   ├── api.ts                      # Fetch API calls to backend
│   │   └── auth-context.tsx            # Authentication context
│   ├── pages/
│   │   ├── AuthPage.tsx                # Authentication page
│   │   └── TodosPage.tsx               # Main todos page
│   ├── App.tsx                         # Root component
│   ├── Root.tsx                        # Router root with auth guard
│   ├── routes.ts                       # Route configuration
│   └── types.ts                        # TypeScript type definitions
├── styles/
│   └── theme.css                       # Theme styles
└── ...
```

## Getting Started

### Prerequisites

You need a backend server running with the required endpoints. See `API_DOCUMENTATION.md` for specifications.

### Installation

1. Clone the repository

2. Install dependencies:
```bash
pnpm install
```

3. Configure API URL:
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and set your backend URL
VITE_API_URL=http://localhost:3000/api
```

### Development

Run the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
pnpm run build
```

## How to Use

### First Time Setup

1. **Sign Up**: When you first open the app, you'll see the login page. Click "Sign up" to create a new account.
2. **Create Account**: Enter your name, email, and password (min 6 characters).
3. **Start Using**: After signing up, you'll be automatically logged in and redirected to the todos page.

### Managing Todos

- **Add Todo**: Type in the input field and click "Add" or press Enter
- **Complete Todo**: Click the checkbox to mark as complete/incomplete
- **Edit Todo**: Click the edit (pencil) icon, modify the text, and press Enter or click the checkmark
- **Delete Todo**: Click the trash icon to remove a todo

### Account Management

- **Logout**: Click the "Logout" button in the top right corner
- **Login Again**: Use your email and password on the login page

## Current Implementation

### Frontend with Real Fetch Calls

The frontend application **already includes real fetch API calls** to a backend server. All API calls are located in `/src/app/lib/api.ts`.

**What this means:**
- ✅ Real HTTP requests using fetch API
- ✅ Proper authentication headers (Bearer token)
- ✅ Error handling for network failures
- ⚠️ **Requires a backend server to work**

**Without a backend:**
- App will show "Failed to fetch" errors
- Network tab will show failed API requests
- You can see what endpoints are being called

**To make it work:**
1. Implement backend endpoints (see `API_DOCUMENTATION.md`)
2. Set `VITE_API_URL` in `.env` to your backend URL
3. Start your backend server
4. The app will work seamlessly

### Backend Implementation Guide

See `API_DOCUMENTATION.md` for:
- What endpoints to implement
- Required request/response formats
- Database schema
- Security requirements
- Example code for Node.js/Express

## API Endpoints

The frontend makes fetch calls to these endpoints:

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle completion
- `GET /api/todos/stats` - Get todo statistics

**Your backend must implement all 11 endpoints following the specification in `API_DOCUMENTATION.md`.**

## Key Files

- **`/src/app/lib/api.ts`** - ✅ Real fetch API calls (already implemented)
- **`/src/app/lib/auth-context.tsx`** - Authentication state management
- **`/src/app/routes.ts`** - Route configuration
- **`/API_DOCUMENTATION.md`** - 📋 Backend implementation guide
- **`/.env.example`** - Environment variables template

## Features in Detail

### Authentication System
- Session persistence using localStorage
- Protected routes that redirect to login
- Automatic redirection after login/logout
- Context-based auth state management

### Todo Operations
- Real-time updates without page refresh
- Optimistic UI updates
- Error handling with user-friendly messages
- Statistics tracking (total, completed, pending)

### User Experience
- Responsive design (mobile, tablet, desktop)
- Loading states for async operations
- Toast notifications for all actions
- Smooth animations and transitions
- Keyboard shortcuts (Enter to save, Escape to cancel)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

### LocalStorage Usage

The application uses localStorage to store the JWT auth token:
- `auth_token` - JWT token from backend for authentication

### Testing Tips
1. Open browser DevTools > Network tab to see API calls
2. Check Console for error messages
3. Verify backend is running and accessible
4. Use different browsers/incognito windows to test multiple accounts

## Future Enhancements

Potential features to add:
- Filter todos (all/active/completed)
- Search functionality
- Due dates and reminders
- Priority levels
- Categories/tags
- Drag and drop reordering
- Dark mode
- Export/import todos
- Collaboration features

## Support

For backend implementation guidance, refer to:
- `API_DOCUMENTATION.md` - Complete API documentation
- Popular backend frameworks documentation (Express, Django, FastAPI, etc.)

## License

This project is provided as-is for educational and development purposes.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS