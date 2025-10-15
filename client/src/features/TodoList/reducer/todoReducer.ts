// --- 1. Basic Data Structures ---

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
    newCategoryId: number;
  };
}

export interface AddCategoryAction {
  type: 'ADD_CATEGORY';
  payload: {
    name: string;
    color: string;
  };
}

// --- 5. Union of All Actions ---

export type TodoAction =
  | AddTodoAction
  | ToggleTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | AddCategoryAction;

// --- 6. Initial State ---

export const initialTodoState: TodoState = {
  todos: [],
  categories: [
    { id: 100, name: 'Toutes', color: 'blue' },
    { id: 101, name: 'Courses', color: 'blue' },
    { id: 102, name: 'Maison', color: 'red' },
    { id: 103, name: 'Paperasse', color: 'green' },
    { id: 104, name: 'Idées', color: 'green' },
    { id: 105, name: 'Tv', color: 'green' },
  ],
  nextTodoId: 1, // Start next ID after the initial todos
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextTodoId,
            text: action.payload.text,
            categoryId: action.payload.categoryId,
            completed: false,
          },
        ],
        nextTodoId: state.nextTodoId + 1,
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.newText,
                categoryId: action.payload.newCategoryId,
              }
            : todo
        ),
      };

    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: state.categories.length + 1,
            name: action.payload.name,
            color: action.payload.color,
          },
        ],
      };

    default:
      // A common practice in reducers is to throw an error for unhandled actions.
      // TypeScript helps prevent reaching this default case if the action union is correct.
      return state;
  }
}
