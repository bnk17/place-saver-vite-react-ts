import { placeInitialState, placeReducer } from 'src/reducers/placeReducer';
import { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { AppHeader } from './components/Header/Header';
import {
  PlaceContext,
  PlaceDispatchContext,
} from './context/Places/PlacesContext';

import {
  LocationFavourite02Icon,
  SearchList01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlaceFlow } from './features/Places/components/PlacesList/PlaceFlow';

export function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [placeState, placeDispatchAction] = useReducer(
    placeReducer,
    placeInitialState
  );
  function handleAppChangeModeClick() {
    if (placeState.appMode === 'places_list') {
      placeDispatchAction({
        type: 'Set_Update_App_Mode',
        payload: 'place_form_search',
      });
      return;
    }
    placeDispatchAction({
      type: 'Set_Update_App_Mode',
      payload: 'places_list',
    });
  }

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [placeState.appMode]);

  return (
    <main className="flex h-[90vh] flex-col p-4 md:m-auto md:h-[100vh] md:max-w-[600px] lg:max-w-[800px]">
      <AppHeader
        formMode={placeState.appMode}
        buttonIcon={
          placeState.appMode === 'places_list' ? (
            <HugeiconsIcon
              icon={SearchList01Icon}
              strokeWidth={2}
              className="text-zinc-900"
            />
          ) : (
            <HugeiconsIcon
              icon={LocationFavourite02Icon}
              strokeWidth={2}
              className="text-zinc-900"
            />
          )
        }
        onChangeMode={() => handleAppChangeModeClick()}
      />
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
    </main>
  );
}

export default App;
