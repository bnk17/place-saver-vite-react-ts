import React from 'react';
import type { Category, Todo, TodoAction, TodoState } from './store.types';

export type ITodoFormProps = {
  dispatch: React.ActionDispatch<[action: TodoAction]>;
  state: TodoState;
};

export type ITodoCategoriesProps = {
  categories: Category[];
  categorySelected: number | null;
  onSelectCategory: React.Dispatch<React.SetStateAction<number | null>>;
};

export type ITodoListProps = {
  todolist: Todo[];
  dispatch: React.ActionDispatch<[action: TodoAction]>;
};

export type ICategoryColorKey = Category['color'];

export type CustomCategory = Omit<Category, 'color'>;
export type ITodoCategoryModalProps = {
  state: TodoState;
  isModalOpen: boolean;
  categorySelected: CustomCategory | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategorySelected: React.Dispatch<
    React.SetStateAction<CustomCategory | null>
  >;
};
