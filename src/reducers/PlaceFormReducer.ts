// initial state

import type { IPlaceData, IPlaceReducerState } from 'src/shared/types';

export const placeInitialState: IPlaceReducerState = {
  placesState: [],
};

//actions
type SetAddPlace = { type: 'Set_Add_Place'; payload: IPlaceData };
type SetDeletePlace = { type: 'Set_Delete_Place'; payload: IPlaceData['name'] };

type SetPlaceCategories = {
  type: 'Set_Place_Categories';
  payload: string;
};

type SetDeleteCategory = { type: 'Set_Delete_Category'; payload: string };

export type IPlaceStateAction =
  | SetAddPlace
  | SetDeletePlace
  | SetPlaceCategories
  | SetDeleteCategory;

//reducer function
export const PlaceReducer = (
  state: IPlaceReducerState,
  action: IPlaceStateAction
): IPlaceReducerState => {
  if (action === null) return state;

  switch (action.type) {
    case 'Set_Add_Place': {
      return {
        ...state.placesState,
        placesState: [...state.placesState, action.payload],
      };
    }

    case 'Set_Delete_Place': {
      return {
        ...state,
        placesState: state.placesState.filter((place) => {
          return place.name !== action.payload;
        }),
      };
    }

    // case 'Set_Place_Categories':
    //   return {
    //     ...state,
    //     form: {
    //       ...state.form,
    //       categories: [...state.form.categories, { name: action.payload }],
    //     },
    //   };

    // case 'Set_Delete_Category': {
    //   return {
    //     ...state,
    //     form: {
    //       ...state.form,
    //       categories: state.form.categories.filter((cat) => {
    //         return cat.name !== action.payload;
    //       }),
    //     },
    //   };
    // }

    default:
      return state;
  }
};
