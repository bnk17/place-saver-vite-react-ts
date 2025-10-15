import { LocationFavourite02FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from 'components/ui/Button';
import { ModalBase } from 'components/ui/ModalBase';
import { DialogTrigger, Pressable } from 'react-aria-components';
import { Link, Outlet } from 'react-router';
import { useGetPlacesList } from '../../hooks/useGetPlacesList';
import { PlaceItem } from '../PlaceItem/PlaceItem';

export const PlacesList = () => {
  // Get API key from environment variable
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { placesWithDetails } = useGetPlacesList(apiKey ?? '');

  if (placesWithDetails.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-2 text-center">
          <span>
            <HugeiconsIcon
              icon={LocationFavourite02FreeIcons}
              strokeWidth={2}
              size={50}
              className="text-gray-400"
            />
          </span>
          Aucun spot n'a été enregistré...
        </div>
        <Button className="bg-zinc-900">Rechercher un spot</Button>
      </div>
    );
  }
  return (
    <div className="mt-5 flex h-fit w-full flex-col gap-2 overflow-y-auto pb-5">
      {placesWithDetails?.map((place) => {
        return (
          <DialogTrigger key={place.details.name}>
            <Pressable>
              <div className="w-full border-b-1 border-gray-200">
                <ModalBase isDismissable>
                  <div className="size-full bg-amber-100">
                    <div className="w-full p-2">{place.details.address}</div>
                    <Button variant="primary" size="sm" className="bg-red-500">
                      Supprimer
                    </Button>
                  </div>
                </ModalBase>
                <PlaceItem
                  name={place.details.name}
                  adress={place.details.address}
                  imgSrc={place.details.photos?.at(0)?.url}
                  website={place.details.website}
                />
              </div>
            </Pressable>
          </DialogTrigger>
        );
      })}
      <Link
        to="search"
        className="fixed bottom-0 left-0 m-0 flex w-full items-center justify-center p-5"
      >
        <Button variant="primary" type="button" className="w-fit bg-zinc-900">
          Trouver un spot
        </Button>
      </Link>
      <Outlet />
    </div>
  );
};
