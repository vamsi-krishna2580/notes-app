import { User, Todo, AuthResponse, ApiResponse } from '../types';

/**
 * API Client
 * 
 * This file contains all API calls to the backend.
 * Update API_BASE_URL to point to your backend server.
 * 
 * See API_DOCUMENTATION.md for backend endpoint specifications.
 */

// TODO: Update this to your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper to make authenticated requests
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  return data;
};
// ==================== AUTH ENDPOINTS ====================

/**
 * POST /api/auth/signup
 * Register a new user
 */
export const signup = async (
  email: string,
  password: string,
  name: string
): Promise<ApiResponse<AuthResponse>> => {
  try {
    const data = await fetchWithAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    if(!data.success){
      return{
        ...data,
        error: data.message || data.error,
      }
    }

    // Store token if signup successful
    if (data.success && data.data?.token) {
      localStorage.setItem('auth_token', data.data.token);
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Signup failed',
    };
  }
};

/**
 * POST /api/auth/login
 * Login existing user
 */
export const login = async (
  email: string,
  password: string
): Promise<ApiResponse<AuthResponse>> => {
  try {
    const data = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if(!data.success){
      return{
        ...data,
        error: data.error || data.message,
      };
    }

    // Store token if login successful
    if (data.success && data.data?.token) {
      localStorage.setItem('auth_token', data.data.token);
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

/**
 * POST /api/auth/logout
 * Logout current user
 */
export const logout = async (): Promise<ApiResponse<null>> => {
  try {
    const data = await fetchWithAuth('/auth/logout', {
      method: 'POST',
    });

    // Clear token on logout
    localStorage.removeItem('auth_token');

    return data;
  } catch (error) {
    // Clear token even if request fails
    localStorage.removeItem('auth_token');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Logout failed',
    };
  }
};

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const data = await fetchWithAuth('/auth/me', {
      method: 'GET',
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get user',
    };
  }
};

// ==================== TODO ENDPOINTS ====================

/**
 * GET /api/todos
 * Get all todos for the authenticated user
 */
export const getTodosList = async (): Promise<ApiResponse<Todo[]>> => {
  try {
    const data = await fetchWithAuth('/todos', {
      method: 'GET',
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch todos',
    };
  }
};

/**
 * GET /api/todos/:id
 * Get a specific todo by ID
 */
export const getTodoById = async (id: string): Promise<ApiResponse<Todo>> => {
  try {
    const data = await fetchWithAuth(`/todos/${id}`, {
      method: 'GET',
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch todo',
    };
  }
};

/**
 * POST /api/todos
 * Create a new todo
 */
export const createTodo = async (title: string): Promise<ApiResponse<Todo>> => {
  try {
    const data = await fetchWithAuth('/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create todo',
    };
  }
};

/**
 * PUT /api/todos/:id
 * Update an existing todo
 */
export const updateTodo = async (
  id: string,
  updates: Partial<Pick<Todo, 'title' | 'completed'>>
): Promise<ApiResponse<Todo>> => {
  try {
    const data = await fetchWithAuth(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update todo',
    };
  }
};

/**
 * DELETE /api/todos/:id
 * Delete a todo
 */
export const deleteTodo = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const data = await fetchWithAuth(`/todos/${id}`, {
      method: 'DELETE',
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete todo',
    };
  }
};

/**
 * PATCH /api/todos/:id/toggle
 * Toggle todo completion status
 */
export const toggleTodo = async (id: string): Promise<ApiResponse<Todo>> => {
  try {
    const data = await fetchWithAuth(`/todos/${id}/toggle`, {
      method: 'PATCH',
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle todo',
    };
  }
};

/**
 * GET /api/todos/stats
 * Get todo statistics for the authenticated user
 */
export const getTodoStats = async (): Promise<ApiResponse<{
  total: number;
  completed: number;
  pending: number;
}>> => {
  try {
    const data = await fetchWithAuth('/todos/stats', {
      method: 'GET',
    });

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch stats',
    };
  }
};
