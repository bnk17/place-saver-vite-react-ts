import { fireEvent, render, screen } from '@testing-library/react';
import App from 'src/App';
import { describe, expect, test } from 'vitest';

describe('Test all actions of placeReducer', () => {
  beforeEach(() => {
    render(<App />);
  });
  test('app mode should not switch if there is no click on the search button or nav button', async () => {
    expect(screen.getByText('Rechercher un spot')).toBeInTheDocument();
    expect(
      screen.getByText("Aucun spot n'a été enregistré...")
    ).toBeInTheDocument();
  });

  test('app mode should switch between places_list and places_form_search', async () => {
    fireEvent.click(await screen.getByText('Rechercher un spot'));
    expect(screen.getByTestId('place-search-input')).toBeInTheDocument();
  });
});
