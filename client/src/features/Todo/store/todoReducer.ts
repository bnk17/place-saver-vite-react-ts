import type {
  Category,
  TodoAction,
  TodoState,
} from 'features/Todo/types/store.types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 100, name: 'Toutes', color: 'amber' },
  { id: 101, name: 'Courses', color: 'violet' },
  { id: 102, name: 'Maison', color: 'rose' },
  { id: 103, name: 'Paperasse', color: 'amber' },
  { id: 104, name: 'Idées', color: 'blue' },
  { id: 105, name: 'Tv', color: 'violet' },
  { id: 106, name: 'Adresse', color: 'amber' },
];
export const initialTodoState: TodoState = {
  todos: [],
  categories: DEFAULT_CATEGORIES,
  nextTodoId: 1,
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
                // categoryId: action.payload.newCategoryId,
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
