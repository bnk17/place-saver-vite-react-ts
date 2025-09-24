import { useContext, type Ref } from 'react';
import {
  PlaceContext,
  PlaceDispatchContext,
} from 'src/context/Places/PlacesContext';
import { AddCategory, CategoriesList } from '../PlaceForm/PlaceCategoriesList';
import { PlaceItem } from '../PlaceItem/PlaceItem';
import { PlaceSearch } from '../PlaceSearch/PlaceSearch';

type IPlaceCreationSetupProps = {
  searchInputRef: Ref<HTMLInputElement | null>;
};

export const PlaceCreationStep = ({
  searchInputRef,
}: IPlaceCreationSetupProps) => {
  const placeDispatchAction = useContext(PlaceDispatchContext);
  const placeState = useContext(PlaceContext);
  const { adress, name, imgSrc } = placeState?.form.selectedPlace || {};

  switch (placeState?.form.mode) {
    case 'initial':
      return <PlaceSearch inputRef={searchInputRef} />;

    case 'adding_details':
      return (
        <section className="relative h-full">
          {adress && name && imgSrc && (
            <PlaceItem adress={adress} name={name} imgSrc={imgSrc} />
          )}
          <AddCategory onAddCategory={placeDispatchAction} />
          <CategoriesList categories={placeState.form.categories} />
        </section>
      );

    default:
      break;
  }
};
