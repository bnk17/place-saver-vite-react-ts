import type { IPlaceCategory } from 'src/shared/types';
import { Button } from '../ui/Button';
import { useContext, useRef, useState } from 'react';
import type { IPlaceStateAction } from 'src/reducers/PlaceFormReducer';
import { Input } from '../ui/Input';
import { PlaceDispatchContext } from 'src/context/Places/PlacesContext';

type PlaceCategoryListProps = {
  category: IPlaceCategory;
};

export const PlaceCategoriesList = ({ category }: PlaceCategoryListProps) => {
  return <div className="size-10 bg-slate-400 p-2">{category.name}</div>;
};

type IAddcategory = {
  onAddCategory: React.ActionDispatch<[action: IPlaceStateAction]> | null;
};

export const AddCategory = ({ onAddCategory }: IAddcategory) => {
  const categoryInputRef = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  function handleAddCategories() {
    if (onAddCategory === null || category === null) return;
    onAddCategory({
      type: 'Set_Place_Categories',
      payload: category,
    });
    setCategory(null);
    categoryInputRef.current?.focus();
  }

  return (
    <div className="flex items-end gap-1">
      <Input
        inputRef={categoryInputRef}
        name="categories"
        placeholder="Ajouter des catégories"
        type="text"
        value={category ?? ''}
        onValueChange={(e) => {
          setCategory(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setCategory(category);
            handleAddCategories();
          }
        }}
      />
      <Button
        size="sm"
        type="button"
        className="mt-2 h-[44px] px-2"
        onClick={() => handleAddCategories()}
      >
        Ajouter
      </Button>
    </div>
  );
};

type ICategoriesListProps = {
  places: IPlaceCategory[];
};

export const CategoriesList = ({ places }: ICategoriesListProps) => {
  const placeReducerAction = useContext(PlaceDispatchContext);
  return (
    <div>
      <div className="mt-2 flex gap-1">
        {places.map((cat) => {
          return (
            <div
              key={cat.name}
              className="flex cursor-pointer items-center gap-1 rounded-sm border-1 border-blue-600 bg-blue-200 px-1 py-0.5 text-sm text-blue-700"
              onClick={() => {
                if (placeReducerAction !== null)
                  placeReducerAction({
                    type: 'Set_Delete_Category',
                    payload: cat.name,
                  });
              }}
            >
              {cat.name} <span className="text-[10px] text-red-600">x</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
