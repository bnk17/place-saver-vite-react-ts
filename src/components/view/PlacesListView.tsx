import type { IPlaceCategory, IPlaceData } from 'src/shared/types';
import { PlaceItem } from '../PlaceDetails/PlaceDetails';
import { TagManager } from '../TagsManager/TagsManager';
import { Button } from '../ui/Button';
import type { IPlaceReducerAction } from 'src/reducers/PlaceReducer';

type IPlacesListViewProps = {
  places: IPlaceData[];
  categories: IPlaceCategory[];
  reducerDispatchAction: React.ActionDispatch<
    [action: IPlaceReducerAction]
  > | null;
};
export const IPlacesListView = ({
  places,
  categories,
  reducerDispatchAction,
}: IPlacesListViewProps) => {
  if (places.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p className="text-lg">Aucun spot n'a été enregistré</p>
        <Button
          className="bg-zinc-900"
          onClick={() => {
            if (reducerDispatchAction !== null)
              reducerDispatchAction({
                type: 'Set_Update_App_Mode',
                payload: 'form_search',
              });
          }}
        >
          Rechercher un spot
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1 border-b-1 border-gray-200">
      {places.map(({ name, adress, imgSrc, googleMapsUrl }) => {
        return (
          <PlaceItem
            key={name}
            name={name}
            adress={adress}
            imgSrc={imgSrc}
            googleMapsUrl={googleMapsUrl}
          />
        );
      })}
      <TagManager mode="read" tags={categories} />
    </div>
  );
};
