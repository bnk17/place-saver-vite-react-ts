import {
  initialTodoState,
  todoReducer,
} from 'src/features/Todo/store/todoReducer';
import type {
  AddCategoryAction,
  DeleteTodoAction,
  EditTodoAction,
  TodoState,
  ToggleTodoAction,
} from 'src/features/Todo/types/store.types';

describe('todoReducer', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    categoryId: 101,
    completed: false,
  };
  const mockTodo2 = {
    id: 2,
    text: 'Another Todo',
    categoryId: 102,
    completed: false,
  };
  const stateWithTodos: TodoState = {
    ...initialTodoState,
    todos: [mockTodo, mockTodo2],
    nextTodoId: 3,
  };

  const checkImmutability = (initialState: TodoState, newState: TodoState) => {
    expect(newState).not.toBe(initialState);
    expect(newState.todos).not.toBe(initialState.todos);
    if (newState.categories === initialState.categories) {
      return;
    } else {
      expect(newState.categories).not.toBe(initialState.categories);
    }
  };

  test('should return the initial state for unknown action and preserve immutability', () => {
    const newState = todoReducer(initialTodoState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toBe(initialTodoState);
  });

  test('should handle ADD_TODO and maintain immutability', () => {
    const newState = todoReducer(initialTodoState, {
      type: 'ADD_TODO',
      payload: { text: 'New Todo', categoryId: 102 },
    });

    checkImmutability(initialTodoState, newState);
    expect(newState.todos.length).toBe(1);
    expect(newState.nextTodoId).toBe(initialTodoState.nextTodoId + 1);
  });

  test('should handle TOGGLE_TODO for existing ID and maintain immutability', () => {
    const action: ToggleTodoAction = {
      type: 'TOGGLE_TODO',
      payload: { id: 1 },
    };
    const newState = todoReducer(stateWithTodos, action);

    checkImmutability(stateWithTodos, newState);
    expect(newState.todos[0].completed).toBe(true);
    expect(newState.todos[1].completed).toBe(false);
    expect(newState.todos[0]).not.toBe(stateWithTodos.todos[0]);
    expect(newState.todos[1]).toBe(stateWithTodos.todos[1]);
  });

  test('should handle TOGGLE_TODO for non-existent ID (edge case)', () => {
    const action: ToggleTodoAction = {
      type: 'TOGGLE_TODO',
      payload: { id: 999 },
    };
    const newState = todoReducer(stateWithTodos, action);

    expect(newState).not.toBe(stateWithTodos);
    expect(newState.todos).not.toBe(stateWithTodos.todos);
    expect(newState.todos).toEqual(stateWithTodos.todos);
  });

  test('should handle DELETE_TODO for existing ID and maintain immutability', () => {
    const action: DeleteTodoAction = {
      type: 'DELETE_TODO',
      payload: { id: 1 },
    };
    const newState = todoReducer(stateWithTodos, action);

    checkImmutability(stateWithTodos, newState);
    expect(newState.todos.length).toBe(1);
    expect(newState.todos[0].id).toBe(2);
  });

  test('should handle DELETE_TODO for non-existent ID (edge case)', () => {
    const action: DeleteTodoAction = {
      type: 'DELETE_TODO',
      payload: { id: 999 },
    };
    const newState = todoReducer(stateWithTodos, action);

    expect(newState).not.toBe(stateWithTodos);
    expect(newState.todos).not.toBe(stateWithTodos.todos);
    expect(newState.todos).toEqual(stateWithTodos.todos);
  });

  test('should handle EDIT_TODO for existing ID and maintain immutability', () => {
    const newText = 'Final Text';
    const action: EditTodoAction = {
      type: 'EDIT_TODO',
      payload: { id: 2, newText },
    };
    const newState = todoReducer(stateWithTodos, action);

    checkImmutability(stateWithTodos, newState);
    expect(newState.todos[1].text).toBe(newText);
    expect(newState.todos[1]).not.toBe(stateWithTodos.todos[1]);
    expect(newState.todos[0]).toBe(stateWithTodos.todos[0]);
  });

  test('should handle EDIT_TODO for non-existent ID (edge case)', () => {
    const newText = 'Should Not Change';
    const action: EditTodoAction = {
      type: 'EDIT_TODO',
      payload: { id: 999, newText },
    };
    const newState = todoReducer(stateWithTodos, action);

    expect(newState).not.toBe(stateWithTodos);
    expect(newState.todos).not.toBe(stateWithTodos.todos);
    expect(newState.todos).toEqual(stateWithTodos.todos);
  });

  test('should handle ADD_CATEGORY and maintain immutability', () => {
    const action: AddCategoryAction = {
      type: 'ADD_CATEGORY',
      payload: { name: 'Work', color: 'red' },
    };
    const newState = todoReducer(stateWithTodos, action);
    const expectedCategoriesLength = stateWithTodos.categories.length + 1;

    expect(newState.categories).not.toBe(stateWithTodos.categories);
    expect(newState.todos).toBe(stateWithTodos.todos);

    expect(newState.categories.length).toBe(expectedCategoriesLength);
  });
});
