import { createContext } from 'react';
import type { IPlaceReducerState } from 'src/shared/types';
import type { IPlaceReducerAction } from 'src/features/Places/store/placeReducer';

export const PlaceContext = createContext<IPlaceReducerState | null>(null);
export const PlaceDispatchContext = createContext<React.ActionDispatch<
  [action: IPlaceReducerAction]
> | null>(null);
