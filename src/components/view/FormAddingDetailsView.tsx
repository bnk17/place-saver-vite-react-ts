import type { IPlaceReducerAction } from 'src/reducers/PlaceReducer';
import type {
  IPlaceCategory,
  IPlaceData,
  IPlaceReducerState,
} from 'src/shared/types';
import { PlaceItem } from '../PlaceDetails/PlaceDetails';
import { TagManager } from '../TagsManager/TagsManager';
import { Button } from '../ui/Button';

type IFormAddingDetailsViewProps = {
  appMode: IPlaceReducerState['appMode'];
  placeSelected: IPlaceData | undefined;
  formTag: IPlaceCategory[];
  reducerDispatchAction: React.ActionDispatch<
    [action: IPlaceReducerAction]
  > | null;
};
export const FormAddingDetailsView = ({
  appMode,
  placeSelected,
  formTag: formCategories,
  reducerDispatchAction,
}: IFormAddingDetailsViewProps) => {
  if (placeSelected === undefined) return;
  return (
    <div className="mt-5">
      <PlaceItem
        adress={placeSelected.adress}
        name={placeSelected.name}
        imgSrc={placeSelected.imgSrc}
      />
      <TagManager
        tags={formCategories}
        onTagChange={reducerDispatchAction}
        mode={appMode}
      />
      <Button
        onClick={() => {
          if (reducerDispatchAction !== null) {
            reducerDispatchAction({
              type: 'Set_Save_Place',
              payload: {
                adress: placeSelected.adress,
                name: placeSelected.name,
                imgSrc: placeSelected.imgSrc,
                googleMapsUrl: placeSelected.googleMapsUrl,
              },
            });
          }
        }}
        className="absolute bottom-0 left-0 w-full bg-zinc-900"
      >
        Sauvegarder le lieu
      </Button>
    </div>
  );
};
