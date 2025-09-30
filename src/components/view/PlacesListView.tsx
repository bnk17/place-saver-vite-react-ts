import type { IPlaceReducerAction } from 'src/reducers/PlaceReducer';
import type { IPlaceReducerState } from 'src/shared/types';
import { PlaceItem } from '../PlaceDetails/PlaceDetails';
import { TagItem } from '../TagsManager/TagsManager';
import { Button } from '../ui/Button';

type IPlacesListViewProps = {
  places: IPlaceReducerState['savedPlacesList'];
  reducerDispatchAction: React.ActionDispatch<
    [action: IPlaceReducerAction]
  > | null;
};
export const IPlacesListView = ({
  places,
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
    <div className="mt-10 flex flex-col gap-2">
      {places.map(({ place, categories }) => {
        return (
          <div key={place.name} className="border-b-1 border-gray-200">
            <PlaceItem
              name={place.name}
              adress={place.adress}
              imgSrc={place.imgSrc}
              googleMapsUrl={place.googleMapsUrl}
            />
            <div className="mb-2 flex flex-wrap gap-1">
              {categories.map((tag) => {
                return <TagItem key={tag.name} tag={tag} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
