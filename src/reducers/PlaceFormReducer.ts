// initial state

import type { IPlaceReducerState } from 'src/shared/types';

export const placeInitialState: IPlaceReducerState = {
  isFormOpen: false,
  form: {
    categories: [],
    name: '',
    adress: '',
    additionnalInfo: '',
    imgSrc: '',
  },
  placesState: [],
};

//actions

type SetFormOpen = { type: 'Set_Form_Open'; payload: boolean };
type SetPlaceCategories = {
  type: 'Set_Place_Categories';
  payload: string;
};
type SetPlaceName = { type: 'Set_Place_Name'; payload: string };
type SetPlaceAdress = { type: 'Set_Place_Adress'; payload: string };
type SetPlaceImgSrc = { type: 'Set_Place_Img_Src'; payload: string };
type Clear_Form = { type: 'Clear_Form' };
type SetDeleteCategory = { type: 'Set_Delete_Category'; payload: string };
type SetPlaceAdditionnalInfo = {
  type: 'Set_Place_Additional_Info';
  payload: string;
};

type SetAddPlace = { type: 'Set_Add_Place' };
type SetDeletePlace = { type: 'Set_Delete_Place'; payload: string };

type IPlaceFormAction =
  | SetFormOpen
  | SetPlaceCategories
  | SetPlaceName
  | SetPlaceAdress
  | SetPlaceAdditionnalInfo
  | SetPlaceImgSrc
  | SetDeleteCategory
  | Clear_Form
  | null;

type IPlaceStateAction = SetAddPlace | SetDeletePlace;
export type IPlaceActionReducer = IPlaceFormAction | IPlaceStateAction;

//reducer function
export const PlaceFormReducer = (
  state: IPlaceReducerState,
  action: IPlaceActionReducer
): IPlaceReducerState => {
  if (action === null) return state;

  switch (action.type) {
    case 'Set_Form_Open': {
      return {
        ...state,
        isFormOpen: action.payload,
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

    case 'Set_Place_Name':
      return {
        ...state,
        form: {
          ...state.form,
          name: action.payload,
        },
      };

    case 'Set_Place_Adress':
      return {
        ...state,
        form: {
          ...state.form,
          adress: action.payload,
        },
      };

    case 'Set_Place_Additional_Info':
      return {
        ...state,
        form: {
          ...state.form,
          additionnalInfo: action.payload,
        },
      };

    case 'Clear_Form': {
      return {
        form: placeInitialState.form,
        placesState: state.placesState,
      };
    }

    case 'Set_Add_Place': {
      return {
        ...state,
        placesState: [
          ...state.placesState,
          {
            categories: state.form.categories,
            name: state.form.name,
            adress: state.form.adress,
            imgSrc: state.form.imgSrc,
            additionnalInfo: state.form.additionnalInfo,
          },
        ],
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

    default:
      return state;
  }
};
