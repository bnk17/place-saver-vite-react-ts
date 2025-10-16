import { Button } from 'components/ui/Button';
import { useContext } from 'react';
import { TagManager } from 'src/components/TagsManager/TagsManager';
import {
  PlaceContext,
  PlaceDispatchContext,
} from 'src/context/Places/PlacesContext';
import { savePlaceId } from 'src/features/Places/services/places.api';
import { PlaceItem } from './PlaceItem';
import { useNavigate } from 'react-router';

export const PlaceSearchAddDetails = () => {
  const placesState = useContext(PlaceContext);
  const placesDispatchAction = useContext(PlaceDispatchContext);
  const placeSelected = placesState?.form.selectedPlace;
  const placeSelectedTag = placesState?.form.tags;
  const navigate = useNavigate();

  function onSavePlaceClick() {
    const placeId = placeSelected?.placeId;

    if (typeof placeId !== 'undefined') {
      savePlaceId({
        tags: placeSelectedTag ?? [],
        placeId,
      })
        .then((res) => {
          if (res.success) {
            if (placesDispatchAction !== null) {
              placesDispatchAction({ type: 'Reset_Form' });
              void navigate('/places');
            }
          } else {
            throw new Error('Une erreur est survenue, merci de réessayer.');
          }
        })
        .catch((e) => {
          if (e instanceof Error) console.log(e.cause);
        });
    }
  }

  if (placeSelected === undefined) return;

  return (
    <div className="mt-5 h-full">
      <PlaceItem
        adress={placeSelected.adress}
        name={placeSelected.name}
        imgSrc={placeSelected.imgSrc}
      />
      <TagManager
        tags={placeSelectedTag ?? []}
        onTagChange={placesDispatchAction}
      />
      <div className="fixed bottom-0 left-0 flex h-full w-full items-end justify-end p-6">
        <Button
          onClick={() => onSavePlaceClick()}
          className="left-0 w-full bg-zinc-900"
        >
          Sauvegarder le lieu
        </Button>
      </div>
    </div>
  );
};
