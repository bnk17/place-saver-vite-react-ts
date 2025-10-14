import { placeReducer } from 'src/reducers/placeReducer';
import type { IPlaceData, IPlaceReducerState } from 'src/shared/types';
import { describe, expect, test } from 'vitest';

describe('Test all actions of placeReducer ', () => {
  const testInitialState: IPlaceReducerState = {
    form: {
      selectedPlace: undefined,
      tags: [],
    },
  };

  const newSelectedPlace: IPlaceData = {
    name: 'Rmdn.',
    adress: 'Paris',
    imgSrc: 'image.src.com/image.jpg',
  };

  // ----------------------
  // Set_Place_Tags
  // ----------------------
  test('should not mutate the initialState when adding tags', () => {
    const result = placeReducer(testInitialState, {
      type: 'Set_Place_Tags',
      payload: 'new tag',
    });
    const filterTags = result.form.tags.some((tag) => tag.name === 'new tag');

    expect(testInitialState.form.tags.length).toEqual(0);
    expect(filterTags).toBeTruthy();
  });

  test('should not mutate form selected place when adding tags', () => {
    const result = placeReducer(testInitialState, {
      type: 'Set_Select_Place',
      payload: newSelectedPlace,
    });

    placeReducer(testInitialState, {
      type: 'Set_Place_Tags',
      payload: 'new tag',
    });

    expect(result.form.selectedPlace).toEqual(newSelectedPlace);
  });

  // ----------------------
  // Set_Select_Place
  // ----------------------
  test('should update the selectedPlace and the appMode should be set to form_adding_details', () => {
    const result = placeReducer(testInitialState, {
      type: 'Set_Select_Place',
      payload: newSelectedPlace,
    });

    expect(result.form.selectedPlace).toEqual(newSelectedPlace);
  });

  test('should not mutate the initialState when selecting a place', () => {
    const result = placeReducer(testInitialState, {
      type: 'Set_Select_Place',
      payload: newSelectedPlace,
    });

    expect(testInitialState.form.selectedPlace).toBeUndefined();
    expect(result.form.selectedPlace).toEqual(newSelectedPlace);
  });

  // ----------------------
  // Set_Delete_Tag
  // ----------------------
  test('should delete a tag from the form', () => {
    const stateWithTags = {
      ...testInitialState,
      form: {
        ...testInitialState.form,
        tags: [{ name: 'food' }, { name: 'drinks' }],
      },
    };

    const result = placeReducer(stateWithTags, {
      type: 'Set_Delete_Tag',
      payload: 'food',
    });

    expect(result.form.tags).toEqual([{ name: 'drinks' }]);
  });

  // ----------------------
  // Reset_Form
  // ----------------------
  test('should reset form and return the place initial state', () => {
    const stateWithData: IPlaceReducerState = {
      form: {
        selectedPlace: newSelectedPlace,
        tags: [{ name: 'romantic' }],
      },
    };

    const result = placeReducer(stateWithData, { type: 'Reset_Form' });

    expect(result.form).toEqual(testInitialState.form);
  });

  // ----------------------
  // Unknown action (defensive test)
  // ----------------------
  test('should return same state for unknown action types', () => {
    // @ts-expect-error testing unknown action
    const result = placeReducer(testInitialState, { type: 'UNKNOWN_ACTION' });
    expect(result).toBe(testInitialState); // same reference
  });
});
