import type { IPlaceReducerAction } from 'src/reducers/placeReducer';
import type {
  IPlaceTag,
  IPlaceData,
  IPlaceReducerState,
} from 'src/shared/types';
import { PlaceItem } from '../PlaceDetails/PlaceDetails';
import { TagManager } from '../TagsManager/TagsManager';
import { Button } from '../ui/Button';
import { savePlace } from 'src/api/places';

type IFormAddingDetailsViewProps = {
  appMode: IPlaceReducerState['appMode'];
  placeSelected: IPlaceData | undefined;
  formTag: IPlaceTag[];
  reducerDispatchAction: React.ActionDispatch<
    [action: IPlaceReducerAction]
  > | null;
};

export const FormAddingDetailsView = ({
  appMode,
  placeSelected,
  formTag,
  reducerDispatchAction,
}: IFormAddingDetailsViewProps) => {
  if (placeSelected === undefined) return;
  const { adress, name, googleMapsUrl, imgSrc, website, rating, phoneNumber } =
    placeSelected;

  function onSavePlaceClick() {
    savePlace({
      adress,
      name,
      googleMapsUrl,
      imgSrc,
      website,
      rating,
      phoneNumber,
      tags: formTag,
    })
      .then(() => {
        if (reducerDispatchAction !== null) {
          reducerDispatchAction({
            type: 'Set_Update_App_Mode',
            payload: 'initial',
          });
          reducerDispatchAction({ type: 'Reset_Form' });
        }
      })
      .catch((e) => {
        if (e instanceof Error) console.log(e.cause);
      });
  }
  return (
    <div className="mt-5">
      <PlaceItem
        adress={placeSelected.adress}
        name={placeSelected.name}
        imgSrc={placeSelected.imgSrc}
      />
      <TagManager
        tags={formTag}
        onTagChange={reducerDispatchAction}
        mode={appMode}
      />
      <Button
        onClick={() => onSavePlaceClick()}
        className="absolute bottom-0 left-0 w-full bg-zinc-900"
      >
        Sauvegarder le lieu
      </Button>
    </div>
  );
};
