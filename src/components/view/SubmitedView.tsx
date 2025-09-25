import type { IPlaceCategory, IPlaceData } from 'src/shared/types';
import { PlaceItem } from '../PlaceDetails/PlaceDetails';
import { TagManager } from '../TagsManager/TagsManager';
import { Button } from '../ui/Button';

type ISubmitedViewProps = {
  places: IPlaceData[];
  categories: IPlaceCategory[];
};
export const SubmitedView = ({ places, categories }: ISubmitedViewProps) => {
  if (places.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p className="text-lg">Aucun lieu n'a été enregistré</p>
        <Button className="bg-zinc-900">Chercher un lieu</Button>
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
