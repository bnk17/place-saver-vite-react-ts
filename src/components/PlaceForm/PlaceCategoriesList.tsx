import type { IPlaceCategory } from 'src/shared/types';

type PlaceCategoryListProps = {
  category: IPlaceCategory;
};
export const PlaceCategoriesList = ({ category }: PlaceCategoryListProps) => {
  return <div className="p-2 size-10 bg-slate-400">{category.name}</div>;
};
