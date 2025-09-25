import { useEffect, useReducer, useRef } from 'react';
import { PlaceReducer, placeInitialState } from 'src/reducers/PlaceReducer';
import './App.css';
import { AppHeader } from './components/Header/Header';
import { PlaceFlow } from './components/view/PlaceFlow';
import {
  PlaceContext,
  PlaceDispatchContext,
} from './context/Places/PlacesContext';

export function App() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [placeState, placeDispatchAction] = useReducer(
    PlaceReducer,
    placeInitialState
  );

  function handleAppChangeModeClick() {
    if (placeState.form.mode === 'submited') {
      placeDispatchAction({ type: 'Set_Update_Form_Mode', payload: 'initial' });
      return;
    }
    placeDispatchAction({ type: 'Set_Update_Form_Mode', payload: 'submited' });
  }

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [placeState.form.mode]);

  return (
    <main className="flex h-[90vh] flex-col p-4 md:m-auto md:h-[100vh] md:max-w-[600px] lg:max-w-[800px]">
      <AppHeader
        formMode={placeState.form.mode}
        buttonLabel={placeState.form.mode === 'initial' ? 'Lieux' : 'Trouver'}
        onChangeMode={() => handleAppChangeModeClick()}
      />
      <PlaceContext value={placeState}>
        <PlaceDispatchContext value={placeDispatchAction}>
          <section className="relative h-full">
            <PlaceFlow
              searchInputRef={searchInputRef}
              placeSelected={placeState.form.selectedPlace}
              formTags={placeState.form.categories}
              placesSavedList={placeState.savedPlacesList}
            />
          </section>
        </PlaceDispatchContext>
      </PlaceContext>
    </main>
  );
}

export default App;
