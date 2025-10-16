import { AiWebBrowsingFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import clsx from 'clsx';
import type { IPlaceData } from 'src/shared/types';

export const PlaceItem = ({ name, adress, imgSrc, website }: IPlaceData) => {
  return (
    <div className="relative flex w-full flex-wrap items-center justify-between gap-2 pb-2 text-sm">
      <div className="flex grow items-center gap-2">
        {imgSrc === undefined ? (
          <span className="size-14 rounded-lg bg-gray-200" />
        ) : (
          <img
            className="size-14 rounded-lg"
            src={imgSrc}
            alt="picture of the place"
          />
        )}
        <div className="cursor-pointer">
          <p className="w-[20ch] text-lg font-medium">{name}</p>
          <p className="w-[25ch] text-[13px] text-zinc-600">{adress}</p>
        </div>
      </div>
      {/* <button
        className={clsx(
          'mr-2 p-1',
          googleMapsUrl !== null ? 'text-zinc-900' : 'text-gray-300'
        )}
        disabled={googleMapsUrl !== null}
      >
        <a href={googleMapsUrl}>
          <HugeiconsIcon icon={MapsSearchIcon} />
        </a>
      </button> */}
      <button
        className={clsx(
          'mr-2 p-1',
          website !== null ? 'text-zinc-900' : 'text-gray-300'
        )}
        disabled={website !== null}
      >
        <a href={website}>
          <HugeiconsIcon icon={AiWebBrowsingFreeIcons} />
        </a>
      </button>
    </div>
  );
};
