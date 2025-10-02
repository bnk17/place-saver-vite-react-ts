import { useContext, type Ref } from 'react';
import {
  PlaceContext,
  PlaceDispatchContext,
} from 'src/context/Places/PlacesContext';
import type {
  IPlaceTag,
  IPlaceData,
  IPlaceReducerState,
} from 'src/shared/types';
import { FormAddingDetailsView } from './FormAddingDetailsView';
import { PlaceSearch } from './FormSearchView';
import { IPlacesListView } from './PlacesListView';

type IPlaceFlowProps = {
  appMode: IPlaceReducerState['appMode'];
  searchInputRef: Ref<HTMLInputElement | null>;
  placeSelected: IPlaceData | undefined;
  formTags: IPlaceTag[];
  placesSavedList: IPlaceReducerState['savedPlacesList'];
};

export const PlaceFlow = ({
  appMode,
  searchInputRef,
  placeSelected,
  formTags,
}: IPlaceFlowProps) => {
  const placeState = useContext(PlaceContext);
  const placeReducerAction = useContext(PlaceDispatchContext);

  switch (placeState?.appMode) {
    case 'initial':
      return (
        <IPlacesListView
          places={placeState.savedPlacesList}
          reducerDispatchAction={placeReducerAction}
        />
      );

    case 'form_search': {
      return <PlaceSearch inputRef={searchInputRef} />;
    }

    case 'form_adding_details':
      return (
        <FormAddingDetailsView
          appMode={appMode}
          placeSelected={placeSelected}
          formTag={formTags}
          reducerDispatchAction={placeReducerAction}
        />
      );

    default:
      break;
  }
};
