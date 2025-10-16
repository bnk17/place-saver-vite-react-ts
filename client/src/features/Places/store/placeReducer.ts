// initial state

import type { IPlaceReducerState } from 'src/shared/types';
import type { IPlaceReducerAction } from '../types/store.types';

export const placeInitialState: IPlaceReducerState = {
  form: {
    selectedPlace: undefined,
    tags: [],
  },
};

//reducer function
export const placeReducer = (
  state: IPlaceReducerState,
  action: IPlaceReducerAction
): IPlaceReducerState => {
  if (action === null) return state;

  switch (action.type) {
    case 'Set_Select_Place': {
      return {
        ...state,
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
      return placeInitialState;
    }

    default:
      return state;
  }
};
