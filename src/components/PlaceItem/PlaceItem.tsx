import type { IPlaceData } from 'src/shared/types';

export const PlaceItem = ({ name, adress, imgSrc }: IPlaceData) => {
  return (
    <div className="relative mt-5 border-b-1 border-gray-200 p-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <img
            className="size-14 rounded-lg"
            src={imgSrc}
            alt="picture of the place "
          />
          <div>
            <p className="text-lg font-medium">{name}</p>
            <p className="w-[25ch] text-[12px]">{adress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
