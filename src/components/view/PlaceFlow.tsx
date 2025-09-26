import { useContext, type Ref } from 'react';
import {
  PlaceContext,
  PlaceDispatchContext,
} from 'src/context/Places/PlacesContext';
import type {
  IPlaceCategory,
  IPlaceData,
  IPlaceReducerState,
} from 'src/shared/types';
import { FormAddingDetailsView } from './FormAddingDetailsView';
import { PlaceSearch } from './FormSearchView';
import { IPlacesListView } from './PlacesListView';

type IPlaceFlowProps = {
  searchInputRef: Ref<HTMLInputElement | null>;
  placeSelected: IPlaceData | undefined;
  formTags: IPlaceCategory[];
  placesSavedList: IPlaceReducerState['savedPlacesList'];
};

export const PlaceFlow = ({
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
          places={placeState.savedPlacesList.place}
          categories={placeState.savedPlacesList.categories}
          reducerDispatchAction={placeReducerAction}
        />
      );

    case 'form_search': {
      return <PlaceSearch inputRef={searchInputRef} />;
    }

    case 'form_adding_details':
      return (
        <FormAddingDetailsView
          placeSelected={placeSelected}
          formTag={formTags}
          reducerDispatchAction={placeReducerAction}
        />
      );

    default:
      break;
  }
};
