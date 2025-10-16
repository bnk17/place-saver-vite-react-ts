import { useEffect, useRef, useState } from 'react';
import { Input } from 'src/components/ui/Input';
import type { ITodoFormProps } from '../types/components.types';
import { TodoCategoryModal } from './TodoCategories';

export const TodoForm = ({ state, dispatch }: ITodoFormProps) => {
  const [todoValue, setTodoValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [categorySelected, setCategorySelected] = useState<{
    id: number;
    name: string;
  } | null>(null);

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
    <div className="flex flex-col items-start">
      <Input
        inputRef={inputRef}
        className="w-full rounded-md border-1 border-gray-300 p-1.5 text-lg outline-blue-600"
        name="tags"
        placeholder="Écrire une todo"
        type="text"
        value={todoValue}
        onValueChange={(e) => setTodoValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter')
            handleAddTodo(todoValue, categorySelected?.id ?? 0);
        }}
      />
      <TodoCategoryModal
        state={state}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
      />
    </div>
  );
};
