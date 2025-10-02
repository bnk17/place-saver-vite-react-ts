import { placeReducer } from 'src/reducers/PlaceReducer';
import type { IPlaceData, IPlaceReducerState } from 'src/shared/types';
import { describe, expect, test } from 'vitest';

describe('Test all actions of placeReducer ', () => {
  const testInitialState: IPlaceReducerState = {
    appMode: 'initial',
    form: {
      selectedPlace: undefined,
      tags: [],
    },
    savedPlacesList: [],
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

  describe('Test all actions of placeReducer', () => {
    // ----------------------
    // Set_Update_App_Mode
    // ----------------------
    test('should update the appMode to form_adding_details', () => {
      const result = placeReducer(testInitialState, {
        type: 'Set_Update_App_Mode',
        payload: 'form_adding_details',
      });
      expect(result.appMode).toBe('form_adding_details');
    });

    test("the test shouldn't pass if the value expected is not form_adding_details", () => {
      const result = placeReducer(testInitialState, {
        type: 'Set_Update_App_Mode',
        payload: 'form_adding_details',
      });
      expect(result.appMode).not.toBe('wrong value');
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
      expect(result.appMode).toBe('form_adding_details');
    });

    test("test shouldn't pass because result.appMode should be equal to form_adding_details", () => {
      const result = placeReducer(testInitialState, {
        type: 'Set_Select_Place',
        payload: newSelectedPlace,
      });

      expect(result.form.selectedPlace).toEqual(newSelectedPlace);
      expect(result.appMode).not.toBe('initial');
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
    // Set_Save_Place
    // ----------------------
    test('should save a place with current tags into savedPlacesList', () => {
      const stateWithTags = {
        ...testInitialState,
        form: {
          ...testInitialState.form,
          tags: [{ name: 'food' }, { name: 'drinks' }],
        },
      };

      const result = placeReducer(stateWithTags, {
        type: 'Set_Save_Place',
        payload: newSelectedPlace,
      });

      expect(result.savedPlacesList).toHaveLength(1);
      expect(result.savedPlacesList[0].place).toEqual(newSelectedPlace);
      expect(result.savedPlacesList[0].tags).toEqual(stateWithTags.form.tags);
    });

    // ----------------------
    // Set_Delete_Place
    // ----------------------
    test('should delete a place by name from savedPlacesList', () => {
      const stateWithPlace = {
        ...testInitialState,
        savedPlacesList: [
          { place: newSelectedPlace, tags: [] },
          {
            place: { name: 'Another', adress: 'Berlin', imgSrc: 'other.jpg' },
            tags: [],
          },
        ],
      };

      const result = placeReducer(stateWithPlace, {
        type: 'Set_Delete_Place',
        payload: 'Rmdn.', // deletes by name
      });

      expect(result.savedPlacesList).toHaveLength(1);
      expect(result.savedPlacesList[0].place?.name).toBe('Another');
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
    test('should reset form but keep savedPlacesList intact', () => {
      const stateWithData: IPlaceReducerState = {
        appMode: 'form_adding_details',
        form: {
          selectedPlace: newSelectedPlace,
          tags: [{ name: 'romantic' }],
        },
        savedPlacesList: [{ place: newSelectedPlace, tags: [] }],
      };

      const result = placeReducer(stateWithData, { type: 'Reset_Form' });

      expect(result.appMode).toBe('initial');
      expect(result.form).toEqual(testInitialState.form); // reset form
      expect(result.savedPlacesList).toEqual(stateWithData.savedPlacesList); // keep savedPlaces
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
});
