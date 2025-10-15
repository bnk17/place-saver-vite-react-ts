import { TaskDaily01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import clsx from 'clsx';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Input } from 'src/components/ui/Input';
import {
  initialTodoState,
  todoReducer,
  type Category,
  type Todo,
  type TodoAction,
} from 'src/features/TodoList/reducer/todoReducer';
// Import your types and functions from the files above

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const todoListFiltered = state.todos.filter(
    (t) => t.categoryId === categorySelected
  );
  const todosListToDisplay =
    categorySelected === '101' ? state.todos : todoListFiltered;

  return (
    <div className="mt-5 flex flex-col gap-3">
      <TodoForm dispatch={dispatch} />
      <div className="flex flex-col gap-2">
        <TodoCategories
          categories={state.categories}
          categorySelected={categorySelected}
          onSelectCategory={setCategorySelected}
        />
        <TodoList todolist={todosListToDisplay} dispatch={dispatch} />
      </div>
    </div>
  );
};

type ITodoCategoriesProps = {
  categories: Category[];
  categorySelected: number | null;
  onSelectCategory: React.Dispatch<React.SetStateAction<number | null>>;
};

export const TodoCategories = ({
  categories,
  categorySelected,
  onSelectCategory,
}: ITodoCategoriesProps) => {
  // store a ref for each category
  const categoryRefs = useRef<Record<number, HTMLLIElement | null>>({});

  function handleSelectCategory(categoryId: number) {
    const el = categoryRefs.current[categoryId];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
    onSelectCategory(categoryId);
  }

  return (
    <ul className="relative flex w-full items-center gap-2 overflow-x-auto py-2">
      {/* Optional gradient overlay at the right edge */}

      {categories.map((cat) => (
        <li
          key={cat.id}
          ref={(el) => (categoryRefs.current[cat.id] = el)}
          onClick={() => handleSelectCategory(cat.id)}
          className={clsx(
            'cursor-pointer rounded-md border border-gray-300 px-3 whitespace-nowrap transition-colors select-none',
            categorySelected === cat.id
              ? 'border-none bg-zinc-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          )}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  );
};

type ITodoListProps = {
  todolist: Todo[];
  dispatch: React.ActionDispatch<[action: TodoAction]>;
};

export const TodoList = ({ todolist, dispatch }: ITodoListProps) => {
  // Example handler for your form submission

  const handleToggleTodo = (id: number) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: { id },
    });
  };

  return (
    <ul className="flex flex-col gap-1">
      <h2 className="flex gap-1">
        <span>
          <HugeiconsIcon icon={TaskDaily01FreeIcons} width={20} />
        </span>
        Todos
      </h2>
      {todolist.map((todo) => {
        return (
          <li key={todo.id} className="ml-0.5 flex gap-1 select-none">
            <input
              className="w-4"
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                handleToggleTodo(todo.id);
                if (e.target.checked) {
                  setTimeout(
                    () =>
                      dispatch({
                        type: 'DELETE_TODO',
                        payload: { id: todo.id },
                      }),
                    500
                  );
                }
              }}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

type ITodoFormProps = {
  dispatch: React.ActionDispatch<[action: TodoAction]>;
};
export const TodoForm = ({ dispatch }: ITodoFormProps) => {
  const [todoValue, setTodoValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleAddTodo = (text: string, categoryId: number) => {
    dispatch({
      type: 'ADD_TODO',
      payload: { text, categoryId },
    });

    setTodoValue('');
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  });

  return (
    <Input
      inputRef={inputRef}
      className="rounded-md border-1 border-gray-300 px-2 py-0.5 outline-blue-600"
      name="tags"
      placeholder="Écrire une todo"
      type="text"
      value={todoValue}
      onValueChange={(e) => setTodoValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleAddTodo(todoValue, 101);
      }}
    />
  );
};

export default TodoApp;
