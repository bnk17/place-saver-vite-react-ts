import { useReducer } from 'react';
import {
  PlaceFormReducer,
  placeInitialState,
} from 'src/reducers/PlaceFormReducer';
import { PlaceContext, PlaceDispatchContext } from './PlacesContext';

type IPlaceProviderProps = {
  children: React.ReactNode;
};

export function PlaceProvider({ children }: IPlaceProviderProps) {
  const [state, dispatch] = useReducer(PlaceFormReducer, placeInitialState);

  return (
    <PlaceContext value={state}>
      <PlaceDispatchContext value={dispatch}>{children}</PlaceDispatchContext>
    </PlaceContext>
  );
}
