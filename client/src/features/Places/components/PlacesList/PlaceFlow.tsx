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
import { PlaceAddForm } from './PlaceAddForm';
import { PlaceSearch } from './PlaceSearchForm';
import { PlacesList } from './PlacesList';

type IPlaceFlowProps = {
  appMode: IPlaceReducerState['appMode'];
  searchInputRef: Ref<HTMLInputElement | null>;
  placeSelected: IPlaceData | undefined;
  formTags: IPlaceTag[];
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
    case 'places_list':
      return <PlacesList reducerDispatchAction={placeReducerAction} />;

    case 'place_form_search': {
      return <PlaceSearch inputRef={searchInputRef} />;
    }

    case 'place_form_adding_details':
      return (
        <PlaceAddForm
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
