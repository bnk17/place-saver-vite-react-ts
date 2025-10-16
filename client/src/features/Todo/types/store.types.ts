export type Category = {
  id: number;
  name: string;
  color: string;
};

export type Todo = {
  id: number;
  text: string;
  categoryId: number;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
  categories: Category[];
  nextTodoId: number;
};

export interface AddTodoAction {
  type: 'ADD_TODO';
  payload: {
    text: string;
    categoryId: number;
  };
}

export interface ToggleTodoAction {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
}

export interface DeleteTodoAction {
  type: 'DELETE_TODO';
  payload: {
    id: number;
  };
}

export interface EditTodoAction {
  type: 'EDIT_TODO';
  payload: {
    id: number;
    newText: string;
    // newCategoryId: number;
  };
}

export interface AddCategoryAction {
  type: 'ADD_CATEGORY';
  payload: {
    name: string;
    color: string;
  };
}

export type TodoAction =
  | AddTodoAction
  | ToggleTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | AddCategoryAction;
