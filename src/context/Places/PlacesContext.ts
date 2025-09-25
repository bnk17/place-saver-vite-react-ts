import { createContext } from 'react';
import type { IPlaceReducerAction } from 'src/reducers/PlaceReducer';

import type { IPlaceReducerState } from 'src/shared/types';

export const PlaceContext = createContext<IPlaceReducerState | null>(null);
export const PlaceDispatchContext = createContext<React.ActionDispatch<
  [action: IPlaceReducerAction]
> | null>(null);
