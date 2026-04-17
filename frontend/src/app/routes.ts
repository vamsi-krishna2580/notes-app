import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { AuthPage } from './pages/AuthPage';
import { TodosPage } from './pages/TodosPage';
import { RedirectToTodos } from './components/RedirectToTodos';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: RedirectToTodos },
      { path: 'auth', Component: AuthPage },
      { path: 'todos', Component: TodosPage },
      { path: '*', Component: RedirectToTodos },
    ],
  },
]);