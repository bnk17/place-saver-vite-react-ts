import {
  Edit02FreeIcons,
  TaskDaily01FreeIcons,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { ITodoListProps } from '../types/components.types';
import type { EditTodoAction } from '../types/store.types';

export const TodoList = ({ todolist, dispatch }: ITodoListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleOpenEditModal = (todoToEdit: Todo) => {
    setEditingTodo(todoToEdit);
    setIsEditModalOpen(true);
  };

  const handleToggleTodo = (id: number) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: { id },
    });
  };

  return (
    <div>
      <ul className="flex flex-col gap-1">
        <h2 className="flex gap-1">
          <span>
            <HugeiconsIcon icon={TaskDaily01FreeIcons} width={20} />
          </span>
          Todos
        </h2>
        {todolist.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggleTodo={handleToggleTodo}
              dispatch={dispatch}
              onEditClick={handleOpenEditModal}
            />
          );
        })}
      </ul>
      <TodoEditModal
        todo={editingTodo}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        dispatch={dispatch} // Pass your main dispatch function
      />
    </div>
  );
};

// Assuming these types are defined elsewhere or passed via generic props
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the shape of the dispatch action for context
interface DeleteAction {
  type: 'DELETE_TODO';
  payload: { id: Todo['id'] };
}
// Define the structure for the TodoItem's props
interface ITodoItemProps {
  todo: Todo;
  handleToggleTodo: (id: Todo['id']) => void;
  // Dispatch can handle different actions, here we specify DELETE
  dispatch: React.Dispatch<DeleteAction>;
  // NEW: Handler to tell the parent to open the edit modal for this todo
  onEditClick: (todo: Todo) => void;
}

const TodoItem = ({
  todo,
  handleToggleTodo,
  dispatch,
  onEditClick,
}: ITodoItemProps) => {
  const handleToggleAndDelete = () => {
    // 1. Toggle the completion state
    // We determine the *new* completed state (toggling from current state)
    const newCompletedState = !todo.completed;
    handleToggleTodo(todo.id);

    // 2. If the item is marked as complete, set a timeout to delete it
    if (newCompletedState) {
      setTimeout(() => {
        dispatch({
          type: 'DELETE_TODO',
          payload: { id: todo.id },
        });
      }, 800); // Wait 800ms before dispatching the delete action
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the <li>'s onClick (toggle/delete) from firing
    onEditClick(todo); // Notify the parent component to open the edit modal
  };

  return (
    <div className="flex w-full items-center gap-2">
      <li
        key={todo.id}
        className="ml-0.5 flex w-fit cursor-pointer items-center gap-1 select-none"
        onClick={handleToggleAndDelete}
      >
        <input
          className="h-4 w-4 cursor-pointer"
          type="checkbox"
          checked={todo.completed}
          // Stop propagation here to ensure it doesn't fire the <li> onClick twice
          onChange={(e) => e.stopPropagation()}
        />
        <span
          className={clsx(
            'text-base break-words', // Added break-words for long text
            todo.completed
              ? 'text-gray-500 italic line-through'
              : 'text-gray-800'
          )}
        >
          {todo.text}
        </span>
      </li>
      {/* Edit Button */}
      <button
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-violet-700 active:bg-violet-100"
        onClick={handleEditClick} // Use the dedicated edit handler
      >
        <HugeiconsIcon icon={Edit02FreeIcons} size={15} strokeWidth={2} />
      </button>
    </div>
  );
};

interface TodoEditModalProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  dispatch: React.Dispatch<EditTodoAction>;
}
const TodoEditModal: React.FC<TodoEditModalProps> = ({
  todo,
  isOpen,
  onClose,
  dispatch,
}) => {
  const [editText, setEditText] = useState(todo?.text);

  useEffect(() => {
    // Reset the input text whenever a new todo is passed in and the modal opens
    if (isOpen) {
      setEditText(todo?.text);
    }
  }, [isOpen, todo?.text]);

  if (todo === null || editText === undefined) return;

  // Handler to dispatch the edit action
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim() !== todo?.text && editText.trim() !== '') {
      dispatch({
        type: 'EDIT_TODO',
        payload: {
          id: todo?.id,
          newText: editText.trim(),
        },
      });
    }
    onClose(); // Close the modal after saving or if the text is unchanged/empty
  };

  if (!isOpen) {
    return null;
  }

  // Simple, full-screen overlay modal for Tailwind CSS
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Éditer la todo
        </h2>
        <form onSubmit={handleSaveEdit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
