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
import { AddingDetailsView } from './AddingDetailsView';
import { PlaceSearch } from './InitialView';
import { SubmitedView } from './SubmitedView';

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

  switch (placeState?.form.mode) {
    case 'initial':
      return <PlaceSearch inputRef={searchInputRef} />;

    case 'adding_details':
      return (
        <AddingDetailsView
          placeSelected={placeSelected}
          formTag={formTags}
          reducerDispatchAction={placeReducerAction}
        />
      );

    case 'submited': {
      return (
        <SubmitedView
          places={placeState.savedPlacesList.place}
          categories={placeState.savedPlacesList.categories}
        />
      );
    }

    default:
      break;
  }
};
