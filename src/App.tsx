import { useEffect, useReducer, useRef, useState } from 'react';
import { PlaceReducer, placeInitialState } from 'src/reducers/PlaceFormReducer';
import './App.css';
import { PlaceCreationStep } from './components/PlaceCreationSetup/PlaceCreationSetup';
import { Button } from './components/ui/Button';
import {
  PlaceContext,
  PlaceDispatchContext,
} from './context/Places/PlacesContext';
import { PlacesList } from './features/PlacesList/PlacesList';

export function App() {
  const [mode, setMode] = useState<'place-list' | 'search'>('search');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
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
    if (mode === 'search') searchInputRef.current?.focus();
  }, [mode]);
  console.log(placeState);
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
          <main className="relative h-full lg:max-w-[500px]">
            {mode === 'search' ? (
              <>
                <PlaceCreationStep searchInputRef={searchInputRef} />
                {placeState.form.mode === 'adding_details' && (
                  <Button
                    onClick={() => {
                      placeDispatchAction({
                        type: 'Set_Save_Place',
                        payload: placeState.form.selectedPlace,
                      });
                      placeDispatchAction({
                        type: 'Set_Update_Form_Mode',
                        payload: 'initial',
                      });
                    }}
                    className="absolute bottom-0 w-full bg-zinc-900"
                  >
                    Sauvegarder le lieu
                  </Button>
                )}
              </>
            ) : (
              <PlacesList placesList={placeState.savedPlacesList} />
            )}
          </main>
        </PlaceDispatchContext>
      </PlaceContext>
    </main>
  );
}

export default App;
