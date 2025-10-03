import { MapsSearchIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { IPlaceData } from 'src/shared/types';

export const PlaceItem = ({
  name,
  adress,
  imgSrc,
  googleMapsUrl,
}: IPlaceData) => {
  return (
    <div className="relative flex h-full w-full flex-wrap items-center justify-between gap-2 pb-2 text-sm">
      <div className="flex grow items-center gap-2">
        {imgSrc === null ? (
          <span className="size-14 rounded-lg bg-gray-200" />
        ) : (
          <img
            className="size-14 rounded-lg"
            src={imgSrc}
            alt="picture of the place"
          />
        )}
        <div>
          <p className="text-lg font-medium">{name}</p>
          <p className="w-[25ch] text-[13px] text-zinc-600">{adress}</p>
        </div>
      </div>
      {googleMapsUrl !== null && (
        <button className="p-1">
          <a href={googleMapsUrl}>
            <HugeiconsIcon icon={MapsSearchIcon} />
          </a>
        </button>
      )}
    </div>
  );
};
