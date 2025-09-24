// initial state

import type {
  IFormMode,
  IPlaceData,
  IPlaceReducerState,
} from 'src/shared/types';

//actions
type SetUpdateFormMode = { type: 'Set_Update_Form_Mode'; payload: IFormMode };
type SetSelectPlace = { type: 'Set_Select_Place'; payload: IPlaceData };
type SetSavePlace = { type: 'Set_Save_Place'; payload: IPlaceData };
type SetDeletePlace = { type: 'Set_Delete_Place'; payload: IPlaceData['name'] };
type SetDeleteCategory = { type: 'Set_Delete_Category'; payload: string };
type SetPlaceCategories = {
  type: 'Set_Place_Categories';
  payload: string;
};

export type IPlaceStateAction =
  | SetUpdateFormMode
  | SetSelectPlace
  | SetSavePlace
  | SetDeletePlace
  | SetPlaceCategories
  | SetDeleteCategory;

export const placeInitialState: IPlaceReducerState = {
  form: {
    mode: 'initial',
    selectedPlace: undefined,
    categories: [],
  },
  savedPlacesList: [],
};

//reducer function
export const PlaceReducer = (
  state: IPlaceReducerState,
  action: IPlaceStateAction
): IPlaceReducerState => {
  if (action === null) return state;

  switch (action.type) {
    case 'Set_Update_Form_Mode': {
      return {
        ...state,
        form: { ...state.form, mode: action.payload },
      };
    }
    case 'Set_Select_Place': {
      return {
        ...state,
        form: {
          ...state.form,
          mode: 'adding_details',
          selectedPlace: action.payload,
        },
      };
    }

    case 'Set_Place_Categories':
      return {
        ...state,
        form: {
          ...state.form,
          mode: 'adding_details',
          categories: [...state.form.categories, { name: action.payload }],
        },
      };

    case 'Set_Save_Place': {
      return {
        ...state,
        form: {
          ...state.form,
          mode: 'ready_for_submission',
        },
        savedPlacesList: [...state.savedPlacesList, action.payload],
      };
    }

    case 'Set_Delete_Place': {
      return {
        ...state,
        savedPlacesList: state.savedPlacesList.filter((place) => {
          return place.name !== action.payload;
        }),
      };
    }

    case 'Set_Delete_Category': {
      return {
        ...state,
        form: {
          ...state.form,
          categories: state.form.categories.filter((cat) => {
            return cat.name !== action.payload;
          }),
        },
      };
    }

    default:
      return state;
  }
};
