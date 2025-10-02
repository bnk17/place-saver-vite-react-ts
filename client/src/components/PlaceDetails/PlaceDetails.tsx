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
        <img
          className="size-14 rounded-lg"
          src={imgSrc}
          alt="picture of the place"
        />
        <div>
          <p className="text-lg font-medium">{name}</p>
          <p className="w-[25ch] text-[12px] text-zinc-600">{adress}</p>
        </div>
      </div>
      {googleMapsUrl !== undefined && (
        <button className="mt-1 rounded-md border-1 border-gray-200 bg-gray-100 px-2 py-1 text-[12px]">
          <a href={googleMapsUrl}>Accéder</a>
        </button>
      )}
    </div>
  );
};
