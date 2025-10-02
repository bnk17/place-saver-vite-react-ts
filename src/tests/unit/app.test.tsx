import { placeReducer } from 'src/reducers/PlaceReducer';
import type { IPlaceReducerState } from 'src/shared/types';
import { describe, expect, test } from 'vitest';

describe('Test all actions of placeReducer ', () => {
  // create the initialState
  const initialState: IPlaceReducerState = {
    appMode: 'initial',
    form: {
      selectedPlace: undefined,
      tags: [],
    },
    savedPlacesList: [],
  };

  test('should update the appMode to form_adding_details', () => {
    const result = placeReducer(initialState, {
      type: 'Set_Update_App_Mode',
      payload: 'form_adding_details',
    });
    expect(result.appMode).toBe('form_adding_details');
  });

  test("the test shouldn't pass if the value expected is not form_adding_details", () => {
    const result = placeReducer(initialState, {
      type: 'Set_Update_App_Mode',
      payload: 'form_adding_details',
    });
    expect(result.appMode).not.toBe('wrong value');
  });
});
