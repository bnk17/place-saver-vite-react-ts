import { LocationFavourite02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { DialogTrigger, Pressable } from 'react-aria-components';
import { useGetPlaces } from 'src/api/places';
import type { IPlaceReducerAction } from 'src/reducers/placeReducer';
import type { IPlaceReducerState } from 'src/shared/types';
import { PlaceItem } from '../PlaceDetails/PlaceDetails';
import { Button } from '../ui/Button';
import { ModalBase } from '../ui/ModalBase';

type IPlacesListViewProps = {
  places: IPlaceReducerState;
  reducerDispatchAction: React.ActionDispatch<
    [action: IPlaceReducerAction]
  > | null;
};
export const IPlacesListView = ({
  reducerDispatchAction,
}: IPlacesListViewProps) => {
  const { data } = useGetPlaces();

  if (data?.data === undefined || data.data.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-2 text-center">
          <span>
            <HugeiconsIcon
              icon={LocationFavourite02Icon}
              strokeWidth={2}
              size={50}
              className="text-gray-400"
            />
          </span>
          Aucun spot n'a été enregistré...
        </div>
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
    <div className="mt-5 flex h-[750px] w-full flex-col gap-2 overflow-y-scroll pb-5">
      {data.data.map((place) => {
        return (
          <DialogTrigger key={place.name}>
            <Pressable>
              <div className="w-full border-b-1 border-gray-200">
                <ModalBase isDismissable>
                  <div className="size-full bg-amber-100">
                    <div className="w-full p-2">{place.adress}</div>
                    <Button variant="primary" size="sm" className="bg-red-500">
                      Supprimer
                    </Button>
                  </div>
                </ModalBase>
                <PlaceItem
                  name={place.name}
                  adress={place.adress}
                  imgSrc={place.imgSrc}
                  googleMapsUrl={place.googleMapsUrl}
                  website={place.website}
                />
              </div>
            </Pressable>
          </DialogTrigger>
        );
      })}
    </div>
  );
};
