import clsx from 'clsx';
import React, { useReducer, useState } from 'react';
import { initialTodoState, todoReducer } from 'src/reducers/todoReducer';
// Import your types and functions from the files above

const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const todoListFiltered = state.todos.filter(
    (t) => t.categoryId === categorySelected
  );

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
    <div className="mt-5 flex flex-col">
      {/* You will create your form here. 
        It will need to display <option> elements from state.categories 
        when the user is creating a new task.
      */}
      {/* <TodoForm categories={state.categories} onAddTodo={handleAddTodo} /> */}

      <ul className="flex items-center gap-2">
        {state.categories.map((cat) => (
          <li
            className={clsx(
              'rounded-full border-1 border-gray-300 px-2',
              categorySelected === cat.id &&
                'border-none bg-zinc-700 text-white'
            )}
            key={cat.id}
            onClick={() => setCategorySelected(cat.id)}
          >
            {cat.name}
          </li>
        ))}
      </ul>

      <h2>Tasks</h2>
      <ul>
        {todoListFiltered.map((todo) => {
          const category = state.categories.find(
            (c) => c.id === todo.categoryId
          );
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>{' '}
              <small>({category ? category.name : 'No Category'})</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
