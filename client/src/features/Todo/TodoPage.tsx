import { useReducer, useState } from 'react';
import {
  initialTodoState,
  todoReducer,
} from 'src/features/Todo/store/todoReducer';
import { TodoCategories } from './components/TodoCategories';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export const TodoPage = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [categorySelected, setCategorySelected] = useState<number | null>(100);
  const todoListFiltered = state.todos.filter(
    (t) => t.categoryId === categorySelected
  );
  const todosListToDisplay =
    categorySelected === 100 ? state.todos : todoListFiltered;

  return (
    <div className="mt-5 flex flex-col gap-3">
      <TodoForm state={state} dispatch={dispatch} />
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

export default TodoPage;
