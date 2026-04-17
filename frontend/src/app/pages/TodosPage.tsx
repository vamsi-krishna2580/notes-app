import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { Todo } from '../types';
import * as api from '../lib/api';
import { TodoList } from '../components/todos/TodoList';
import { AddTodoForm } from '../components/todos/AddTodoForm';
import { LogOut, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function TodosPage() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    setLoading(true);
    const response = await api.getTodosList();
    if (response.success && response.data) {
      setTodos(response.data);
    } else {
      toast.error(response.error || 'Failed to load todos');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (title: string) => {
    const response = await api.createTodo(title);
    if (response.success && response.data) {
      setTodos([...todos, response.data]);
      toast.success('Todo added successfully');
    } else {
      toast.error(response.error || 'Failed to add todo');
    }
  };

  const handleToggleTodo = async (id: string) => {
    const response = await api.toggleTodo(id);
    if (response.success && response.data) {
      setTodos(todos.map(t => t.id === id ? response.data! : t));
    } else {
      toast.error(response.error || 'Failed to update todo');
    }
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    const response = await api.updateTodo(id, { title });
    if (response.success && response.data) {
      setTodos(todos.map(t => t.id === id ? response.data! : t));
      toast.success('Todo updated successfully');
    } else {
      toast.error(response.error || 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const response = await api.deleteTodo(id);
    if (response.success) {
      setTodos(todos.filter(t => t.id !== id));
      toast.success('Todo deleted successfully');
    } else {
      toast.error(response.error || 'Failed to del todo');
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">My Todos</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadTodos}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Refresh todos"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <AddTodoForm onAdd={handleAddTodo} />
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
