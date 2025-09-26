// initial state

import type {
  IAppMode,
  IPlaceData,
  IPlaceReducerState,
} from 'src/shared/types';

//actions
type SetUpdateFormMode = { type: 'Set_Update_App_Mode'; payload: IAppMode };
type SetSelectPlace = { type: 'Set_Select_Place'; payload: IPlaceData };
type SetSavePlace = { type: 'Set_Save_Place'; payload: IPlaceData };
type SetDeletePlace = { type: 'Set_Delete_Place'; payload: IPlaceData['name'] };
type SetDeleteCategory = { type: 'Set_Delete_Category'; payload: string };
type SetPlaceCategories = {
  type: 'Set_Place_Categories';
  payload: string;
};

export type IPlaceReducerAction =
  | SetUpdateFormMode
  | SetSelectPlace
  | SetSavePlace
  | SetDeletePlace
  | SetPlaceCategories
  | SetDeleteCategory;

export const placeInitialState: IPlaceReducerState = {
  appMode: 'initial',
  form: {
    selectedPlace: undefined,
    categories: [],
  },
  savedPlacesList: {
    place: [],
    categories: [],
  },
};

//reducer function
export const PlaceReducer = (
  state: IPlaceReducerState,
  action: IPlaceReducerAction
): IPlaceReducerState => {
  if (action === null) return state;

  switch (action.type) {
    case 'Set_Update_App_Mode': {
      return {
        ...state,
        appMode: action.payload,
      };
    }
    case 'Set_Select_Place': {
      return {
        ...state,
        appMode: 'form_adding_details',
        form: {
          ...state.form,
          selectedPlace: action.payload,
        },
      };
    }

    case 'Set_Place_Categories':
      return {
        ...state,
        form: {
          ...state.form,
          categories: [...state.form.categories, { name: action.payload }],
        },
      };

    case 'Set_Save_Place': {
      return {
        ...state,
        appMode: 'initial',
        form: {
          ...state.form,
        },
        savedPlacesList: {
          place: [...state.savedPlacesList.place, action.payload],
          categories: [...state.form.categories],
        },
      };
    }

    case 'Set_Delete_Place': {
      return {
        ...state,
        savedPlacesList: {
          place: state.savedPlacesList.place.filter((place) => {
            return place.name !== action.payload;
          }),
          categories: [],
        },
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
