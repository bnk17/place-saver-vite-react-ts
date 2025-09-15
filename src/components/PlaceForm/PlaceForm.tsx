import { useContext, useRef, useState } from 'react';

import { PlaceDispatchContext } from 'src/context/Places/PlacesContext';
import type { IPlaceActionReducer } from 'src/reducers/PlaceFormReducer';
import type { IPlaceReducerState } from 'src/shared/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type PlaceFormProps = {
  place: IPlaceReducerState;
};
export const PlaceForm = ({ place }: PlaceFormProps) => {
  const placeFormDispatch = useContext(PlaceDispatchContext);

  function handleAddplace() {
    if (placeFormDispatch === null) return;
    placeFormDispatch({ type: 'Set_Add_Place' });
    placeFormDispatch({ type: 'Clear_Form' });
  }

  if (placeFormDispatch === null) return;

  return (
    <form className="w-full  flex flex-col gap-2">
      <Input
        size="md"
        label="Nom du lieu"
        name="name"
        placeholder="Entrer le nom de votre lieu"
        type="text"
        value={place.form.name}
        onValueInputChange={(e) => {
          placeFormDispatch({
            type: 'Set_Place_Name',
            payload: e.target.value,
          });
        }}
      />
      <Input
        size="md"
        label="Adresse"
        name="adress"
        placeholder="Entrer l'adresse du lieu"
        type="text"
        value={place.form.adress}
        onValueInputChange={(e) => {
          placeFormDispatch({
            type: 'Set_Place_Adress',
            payload: e.target.value,
          });
        }}
      />
      <AddCategory onAddCategory={placeFormDispatch} />
      <div>
        <div className="flex gap-1 mt-2">
          {place.form.categories.map((cat) => {
            return (
              <div
                key={cat.name}
                className="flex items-center gap-1 border-1 border-blue-600 bg-blue-200 text-blue-700 px-1 py-0.5 text-sm rounded-sm cursor-pointer"
                onClick={() =>
                  placeFormDispatch({
                    type: 'Set_Delete_Category',
                    payload: cat.name,
                  })
                }
              >
                {cat.name} <span className="text-[10px] text-red-600">x</span>
              </div>
            );
          })}
        </div>
      </div>
      <Input
        size="md"
        label="Information supplémentaire"
        name="additionnal-info"
        placeholder="Ajouter des précisions sur le lieux"
        type="textarea"
        value={place.form.additionnalInfo}
        onValueTextAreaChange={(e) => {
          placeFormDispatch({
            type: 'Set_Place_Additional_Info',
            payload: e.target.value,
          });
        }}
      />
      <Button type="button" className="mt-2" onClick={() => handleAddplace()}>
        Enregistrer
      </Button>
    </form>
  );
};

type IAddcategory = {
  onAddCategory: React.ActionDispatch<[action: IPlaceActionReducer]> | null;
};

const AddCategory = ({ onAddCategory }: IAddcategory) => {
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
    <div className="flex gap-1 items-end">
      <Input
        size="md"
        inputRef={categoryInputRef}
        label="Catégories"
        name="categories"
        placeholder="Ajouter des catégories"
        type="text"
        value={category ?? ''}
        onValueInputChange={(e) => {
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
        className="mt-2 px-2 h-[44px]"
        onClick={() => handleAddCategories()}
      >
        Ajouter
      </Button>
    </div>
  );
};
