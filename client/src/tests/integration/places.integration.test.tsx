import { render, screen } from '@testing-library/react';
import { PlacesList } from 'src/features/Places/components/PlacesList/PlacesList';
import { describe, expect, test } from 'vitest';

describe('Tests display of the features places-list and place-search-form', () => {
  beforeEach(() => {
    render(<PlacesList />);
  });
  test('app mode should not switch if there is no click on the search button or nav button', async () => {
    expect(screen.getByText('Rechercher un spot')).toBeInTheDocument();
    expect(
      screen.getByText("Aucun spot n'a été enregistré...")
    ).toBeInTheDocument();
  });
});
