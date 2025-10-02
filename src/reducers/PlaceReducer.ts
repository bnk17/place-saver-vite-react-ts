// initial state

import type {
  IAppMode,
  IPlaceData,
  IPlaceReducerState,
} from 'src/shared/types';

//actions
type ResetForm = { type: 'Reset_Form' };
type SetUpdateFormMode = { type: 'Set_Update_App_Mode'; payload: IAppMode };
type SetSelectPlace = { type: 'Set_Select_Place'; payload: IPlaceData };
type SetSavePlace = { type: 'Set_Save_Place'; payload: IPlaceData };
type SetDeletePlace = { type: 'Set_Delete_Place'; payload: IPlaceData['name'] };
type SetDeleteTag = { type: 'Set_Delete_Tag'; payload: string };
type SetPlaceTags = {
  type: 'Set_Place_Tags';
  payload: string;
};

export type IPlaceReducerAction =
  | SetUpdateFormMode
  | SetSelectPlace
  | SetSavePlace
  | SetDeletePlace
  | SetPlaceTags
  | SetDeleteTag
  | ResetForm;

export const placeInitialState: IPlaceReducerState = {
  appMode: 'initial',
  form: {
    selectedPlace: undefined,
    tags: [],
  },
  savedPlacesList: [],
};

//reducer function
export const placeReducer = (
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

    case 'Set_Place_Tags':
      return {
        ...state,
        form: {
          ...state.form,
          tags: [...state.form.tags, { name: action.payload }],
        },
      };

    case 'Set_Save_Place': {
      return {
        ...state,
        appMode: 'initial',
        form: placeInitialState.form,
        savedPlacesList: [
          ...state.savedPlacesList,
          {
            place: action.payload,
            tags: [...state.form.tags],
          },
        ],
      };
    }

    case 'Set_Delete_Place': {
      const filteredPlaces = state.savedPlacesList.filter(({ place }) => {
        return place?.name !== action.payload;
      });

      return {
        ...state,
        savedPlacesList: filteredPlaces,
      };
    }

    case 'Set_Delete_Tag': {
      return {
        ...state,
        form: {
          ...state.form,
          tags: state.form.tags.filter((cat) => {
            return cat.name !== action.payload;
          }),
        },
      };
    }

    case 'Reset_Form': {
      return {
        appMode: 'initial',
        form: placeInitialState.form,
        savedPlacesList: state.savedPlacesList,
      };
    }

    default:
      return state;
  }
};
