import { useEffect, useReducer, useRef } from 'react';
import { placeInitialState, placeReducer } from 'src/reducers/placeReducer';
import './App.css';
import {
  PlaceContext,
  PlaceDispatchContext,
} from './context/Places/PlacesContext';

import { PlaceFlow } from './features/Places/components/PlacesList/PlaceFlow';

export function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [placeState, placeDispatchAction] = useReducer(
    placeReducer,
    placeInitialState
  );

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [placeState.appMode]);

  return (
    <div className="">
      <PlaceContext value={placeState}>
        <PlaceDispatchContext value={placeDispatchAction}>
          <section className="relative h-full">
            <PlaceFlow
              appMode={placeState.appMode}
              searchInputRef={searchInputRef}
              placeSelected={placeState.form.selectedPlace}
              formTags={placeState.form.tags}
            />
          </section>
        </PlaceDispatchContext>
      </PlaceContext>
    </div>
  );
}

export default App;
