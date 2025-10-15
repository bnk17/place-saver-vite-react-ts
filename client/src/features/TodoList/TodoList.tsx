import { TaskDaily01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import clsx from 'clsx';
import React, { useReducer, useRef, useState } from 'react';
import {
  initialTodoState,
  todoReducer,
  type Category,
  type Todo,
  type TodoAction,
} from 'src/features/TodoList/reducer/todoReducer';
// Import your types and functions from the files above

const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const todoListFiltered = state.todos.filter(
    (t) => t.categoryId === categorySelected
  );

  return (
    <div className="mt-5 flex flex-col">
      <TodoCategories
        categories={state.categories}
        categorySelected={categorySelected}
        onSelectCategory={setCategorySelected}
      />
      <TodoList todolist={todoListFiltered} dispatch={dispatch} />
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
  const cateogryRef = useRef<HTMLLIElement | null>(null);
  function handleSelectCateogry(categoryId: number) {
    if (cateogryRef.current !== null) {
      cateogryRef.current.scrollIntoView({ behavior: 'instant' });
    }
    onSelectCategory(categoryId);
  }

  return (
    <ul className="relative flex w-full items-center gap-2 overflow-x-auto p-2">
      <div className="fixed right-5 h-10 w-5 rounded-md bg-white blur-xs" />
      {categories.map((cat) => (
        <li
          ref={cateogryRef}
          className={clsx(
            'rounded-md border-1 border-gray-300 px-2 select-none',
            categorySelected === cat.id && 'border-none bg-zinc-700 text-white'
          )}
          key={cat.id}
          onClick={() => handleSelectCateogry(cat.id)}
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
  const handleAddTodo = (text: string, categoryId: number) => {
    dispatch({
      type: 'ADD_TODO',
      payload: { text, categoryId },
    });
  };

  const handleToggleTodo = (id: number) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: { id },
    });
  };

  return (
    <ul className="mt-5 flex flex-col gap-1">
      <h2 className="flex gap-1">
        <span>
          <HugeiconsIcon icon={TaskDaily01FreeIcons} width={20} />
        </span>
        Todos
      </h2>
      {todolist.map((todo) => {
        return (
          <li
            key={todo.id}
            className="flex gap-1 select-none"
            onClick={() => handleToggleTodo(todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => null}
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

export default TodoApp;
