import type { IPlaceReducerAction } from 'src/reducers/placeReducer';
import type { IPlaceTag, IPlaceData } from 'src/shared/types';
import { Button } from 'components/ui/Button';
import { savePlaceId } from 'src/features/Places/services/places.api';
import { PlaceItem } from '../PlaceItem/PlaceItem';
import { TagManager } from 'src/components/TagsManager/TagsManager';

type IFormAddingDetailsViewProps = {
  placeSelected: IPlaceData | undefined;
  formTag: IPlaceTag[];
  reducerDispatchAction: React.ActionDispatch<
    [action: IPlaceReducerAction]
  > | null;
};

export const PlaceAddForm = ({
  placeSelected,
  formTag,
  reducerDispatchAction,
}: IFormAddingDetailsViewProps) => {
  if (placeSelected === undefined) return;
  const { placeId } = placeSelected;

  function onSavePlaceClick() {
    if (typeof placeId === 'string') {
      savePlaceId({
        tags: formTag,
        placeId,
      })
        .then((res) => {
          if (res.success) {
            if (reducerDispatchAction !== null) {
              reducerDispatchAction({
                type: 'Set_Update_App_Mode',
                payload: 'places_list',
              });
              reducerDispatchAction({ type: 'Reset_Form' });
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
  return (
    <div className="mt-5">
      <PlaceItem
        adress={placeSelected.adress}
        name={placeSelected.name}
        imgSrc={placeSelected.imgSrc}
      />
      <TagManager tags={formTag} onTagChange={reducerDispatchAction} />
      <Button
        onClick={() => onSavePlaceClick()}
        className="absolute bottom-0 left-0 w-full bg-zinc-900"
      >
        Sauvegarder le lieu
      </Button>
    </div>
  );
};
