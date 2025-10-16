import {
  AddIcon,
  LocationFavourite02FreeIcons,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import clsx from 'clsx';
import { Button } from 'components/ui/Button';
import { ModalBase } from 'components/ui/ModalBase';
import { DialogTrigger, Pressable } from 'react-aria-components';
import { useGetPlacesList } from '../hooks/useGetPlacesList';
import { PlaceItem } from './PlaceItem';
import { PlaceSearch } from './PlaceSearchForm';
import { useState } from 'react';

export const PlacesList = () => {
  // Get API key from environment variable
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { placesWithDetails } = useGetPlacesList(apiKey ?? '');
  const [isSearchmodalOpen, setIsSearchmodalOpen] = useState(false);

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
    <div className="mt-5 flex h-fit w-full flex-col gap-2 overflow-y-auto pb-15">
      {placesWithDetails?.map((place, i) => {
        return (
          <DialogTrigger key={place.details.name}>
            <Pressable>
              <div
                className={clsx(
                  'w-full',
                  i !== placesWithDetails.length - 1 &&
                    'border-b-1 border-gray-200'
                )}
              >
                {/* <ModalBase isDismissable>
                  <div className="size-full bg-amber-100">
                    <div className="w-full p-2">{place.details.address}</div>
                    <Button variant="primary" size="sm" className="bg-red-500">
                      Supprimer
                    </Button>
                  </div>
                </ModalBase> */}
                <PlaceItem
                  name={place.details.name}
                  adress={place.details.address}
                  imgSrc={place.details.photos?.at(0)?.url}
                  website={place.details.website ?? undefined}
                />
              </div>
            </Pressable>
          </DialogTrigger>
        );
      })}
      <div className="flex items-center justify-center">
        <DialogTrigger>
          <Pressable>
            <div>
              <ModalBase isOpen={isSearchmodalOpen}>
                <div className="bg-opacity-50 fixed inset-0 z-50 flex w-full items-end bg-black/20">
                  <div className="flex h-[400px] w-full flex-col gap-2 rounded-t-xl bg-white p-6 shadow-2xl">
                    <h3 className="text-left text-lg font-medium">
                      Trouver un spot
                    </h3>
                    <PlaceSearch />
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setIsSearchmodalOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button onClick={() => setIsSearchmodalOpen(true)}>
                        Trouver
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalBase>
              <div className="fixed inset-0 z-1 mb-8 flex items-end justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full border-none bg-zinc-800 p-3 text-white"
                  onClick={() => setIsSearchmodalOpen(true)}
                >
                  <HugeiconsIcon icon={AddIcon} />
                </button>
              </div>
            </div>
          </Pressable>
        </DialogTrigger>
      </div>
    </div>
  );
};
