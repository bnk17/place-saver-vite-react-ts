import { useEffect, useReducer, useRef, useState } from 'react';
import { PlaceReducer, placeInitialState } from 'src/reducers/PlaceFormReducer';
import './App.css';
import { PlaceSearch } from './components/PlaceSearch/PlaceSearch';
import {
  PlaceContext,
  PlaceDispatchContext,
} from './context/Places/PlacesContext';
import { PlacesList } from './features/PlacesList/PlacesList';
import { Button } from './components/ui/Button';

export function App() {
  const [mode, setMode] = useState<'place-list' | 'search'>('search');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [placeState, placeDispatchAction] = useReducer(
    PlaceReducer,
    placeInitialState
  );

  function handleChangeMode() {
    if (mode === 'search') {
      setMode('place-list');
      return;
    }
    setMode('search');
  }

  useEffect(() => {
    if (mode === 'search') inputRef.current?.focus();
  }, [mode]);

  return (
    <main className="flex h-[90vh] flex-col p-4 md:h-[100vh] lg:m-auto lg:max-w-[800px]">
      <section className="flex items-center justify-between">
        <h1 className="text-h1 text-zinc-00 w-full font-semibold">Rmnd.</h1>
        <Button
          className="w-fit bg-zinc-900 text-nowrap"
          size="sm"
          onClick={() => handleChangeMode()}
        >
          {mode === 'search' ? 'Liste des lieux' : 'Rechercher un lieu'}
        </Button>
      </section>
      <PlaceContext value={placeState}>
        <PlaceDispatchContext value={placeDispatchAction}>
          <main className="h-full lg:max-w-[500px]">
            {mode === 'search' ? (
              <PlaceSearch inputRef={inputRef} />
            ) : (
              <PlacesList placesList={placeState.placesState} />
            )}
          </main>
        </PlaceDispatchContext>
      </PlaceContext>
    </main>
  );
}

export default App;
