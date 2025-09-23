import { createContext } from 'react';
import type { IPlaceStateAction } from 'src/reducers/PlaceFormReducer';

import type { IPlaceReducerState } from 'src/shared/types';

export const PlaceContext = createContext<IPlaceReducerState | null>(null);
export const PlaceDispatchContext = createContext<React.ActionDispatch<
  [action: IPlaceStateAction]
> | null>(null);
