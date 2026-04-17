import { Todo } from '../../types';
import { TodoItem } from './TodoItem';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No todos yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
          <Circle className="w-5 h-5 text-blue-600" />
          <span className="text-sm">
            <span className="font-semibold text-blue-600">{pendingCount}</span> Pending
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-sm">
            <span className="font-semibold text-green-600">{completedCount}</span> Completed
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}
