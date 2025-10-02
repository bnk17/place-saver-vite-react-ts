import { useReducer } from 'react';
import { placeReducer, placeInitialState } from 'src/reducers/PlaceReducer';
import { PlaceContext, PlaceDispatchContext } from './PlacesContext';

type IPlaceProviderProps = {
  children: React.ReactNode;
};

export function PlaceProvider({ children }: IPlaceProviderProps) {
  const [state, dispatch] = useReducer(placeReducer, placeInitialState);

  return (
    <PlaceContext value={state}>
      <PlaceDispatchContext value={dispatch}>{children}</PlaceDispatchContext>
    </PlaceContext>
  );
}
