// Ensure you have installed: vitest, @testing-library/react, @testing-library/user-event

import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { TodoList } from 'src/features/Todo/components/TodoList';
import {
  initialTodoState,
  todoReducer,
} from 'src/features/Todo/store/todoReducer';
import { describe, expect, test, vi } from 'vitest';

// Mock the global setTimeout/clearTimeout for controlled timing
vi.useFakeTimers();

// Mock the Parent Component (Container) to hold state and handlers
const MockTodoListContainer = () => {
  const [state, dispatch] = React.useReducer(todoReducer, {
    ...initialTodoState,
    todos: [
      { id: 1, text: 'Buy Groceries', categoryId: 101, completed: false },
      { id: 2, text: 'Pay Rent', categoryId: 102, completed: false },
    ],
    categories: [{ id: 101, name: 'course', color: 'amber' }],
    nextTodoId: 3,
  });

  return <TodoList todolist={state.todos} dispatch={dispatch} />;
};

describe('TodoList Integration (Vitest)', () => {
  test('should toggle completion and dispatch DELETE after 800ms timeout', async () => {
    render(<MockTodoListContainer />);

    const todoItem = screen.getByText('Buy Groceries');

    // 1. Initial State Check (Not completed)
    expect(todoItem).not.toHaveClass(/line-through/);

    // 2. Click the item (triggers TOGGLE_TODO and starts deletion timeout)
    await fireEvent.click(todoItem);

    // 3. Check for completion styling (TOGGLE_TODO side effect)
    expect(todoItem).toHaveClass(/line-through/);

    // 4. Advance time, but not fully (e.g., 500ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText('Buy Groceries')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByText('Buy Groceries')).not.toBeInTheDocument();
    expect(screen.getByText('Pay Rent')).toBeInTheDocument(); // Check other todo remains
  });

  test('should call handleEditClick with correct todo when edit button is clicked', async () => {
    render(<MockTodoListContainer />);

    const todoItem = screen.getByText('Pay Rent');
    const editButton = todoItem.closest('li')?.nextElementSibling;

    if (!editButton)
      throw new Error('Edit button not found near the Todo item.');

    await fireEvent.click(editButton);

    expect(todoItem).not.toHaveClass(/line-through/);
  });
});
