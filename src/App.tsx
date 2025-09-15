import { useReducer } from 'react';
import {
  PlaceFormReducer,
  placeInitialState,
} from 'src/reducers/PlaceFormReducer';
import './App.css';
import { PlaceForm } from './components/PlaceForm/PlaceForm';
import { Button } from './components/ui/Button';
import {
  PlaceContext,
  PlaceDispatchContext,
} from './context/Places/PlacesContext';
import { PlacesList } from './features/PlacesList/PlacesList';

export function App() {
  const [placeFomState, placeFormDispatch] = useReducer(
    PlaceFormReducer,
    placeInitialState
  );

  function handleOpenFormCLick() {
    if (!placeFomState.isFormOpen) {
      placeFormDispatch({ type: 'Clear_Form' });
    }
    placeFormDispatch({
      type: 'Set_Form_Open',
      payload: !placeFomState.isFormOpen,
    });
  }

  return (
    <main className="flex flex-col lg:max-w-[800px] lg:m-auto p-4 bg-[#fafafa] h-[100vh]">
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">ChaaLaba</h1>
        <Button
          variant="secondary"
          className="text-sm"
          onClick={() => handleOpenFormCLick()}
        >
          {placeFomState.isFormOpen ? 'Fermer formulaire' : ' Ajouter un lieu'}
        </Button>
      </section>
      <PlaceContext value={placeFomState}>
        <PlaceDispatchContext value={placeFormDispatch}>
          <main className="lg:max-w-[500px] max-h-max">
            {placeFomState.isFormOpen ? (
              <PlaceForm place={placeFomState} />
            ) : (
              <PlacesList placesList={placeFomState.placesState} />
            )}
          </main>
        </PlaceDispatchContext>
      </PlaceContext>
    </main>
  );
}

export default App;
