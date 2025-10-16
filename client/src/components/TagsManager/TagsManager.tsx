import { useContext, useEffect, useRef, useState, type FormEvent } from 'react';
import { PlaceDispatchContext } from 'src/context/Places/PlacesContext';
import type { IPlaceReducerAction } from 'src/features/Places/store/placeReducer';
import type { IPlaceTag } from 'src/shared/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type Tag = IPlaceTag;
type TagItemProps = {
  tag: Tag;
  onRemove?: (tagName: string) => void;
};

export const TagItem = ({ tag, onRemove }: TagItemProps) => (
  <div
    className="flex cursor-pointer items-center gap-1 rounded-sm border border-blue-600 bg-blue-200 px-1 py-0.5 text-[12px] font-semibold text-blue-700"
    onClick={() => onRemove?.(tag.name)}
  >
    {tag.name} <span className="text-[10px] text-red-600">x</span>
  </div>
);

type TagManagerProps = {
  tags: Tag[];
  onTagChange?: React.ActionDispatch<[action: IPlaceReducerAction]> | null;
};

export const TagManager = ({ tags, onTagChange = null }: TagManagerProps) => {
  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useContext(PlaceDispatchContext);

  const [showTagInput, setShowTagInput] = useState(false);

  const handleAddTag = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!tagInput) return;
    if (onTagChange) {
      onTagChange({
        type: 'Set_Place_Tags',
        payload: tagInput,
      });
    }
    setTagInput('');
    tagInputRef.current?.focus();
  };

  useEffect(() => {
    if (tagInputRef.current !== null && showTagInput)
      tagInputRef.current.focus();
  }, [tagInputRef, showTagInput]);

  const handleRemoveTag = (name: string) => {
    if (dispatch) {
      dispatch({
        type: 'Set_Delete_Tag',
        payload: name,
      });
    }
  };

  return (
    <div className="mt-2 mb-2 flex h-full max-h-fit w-full flex-col gap-2 overflow-y-auto pb-2">
      <p className="text-sm font-medium">Tags selectionnés</p>
      {tags.length === 0 ? (
        <p className="text-[12px] font-light text-gray-400">
          Aucun tag sélectionné
        </p>
      ) : (
        <div className="mb-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <TagItem key={tag.name} tag={tag} onRemove={handleRemoveTag} />
          ))}
        </div>
      )}
      <Button
        size="sm"
        variant="ghost"
        type="button"
        className="border-zinc-900 text-zinc-900"
        onClick={() => setShowTagInput((prev) => !prev)}
      >
        + Créer un nouveau tag
      </Button>

      {showTagInput && (
        <form className="flex items-end gap-1" onSubmit={handleAddTag}>
          <Input
            inputRef={tagInputRef}
            name="tags"
            placeholder="Nom du tag"
            type="text"
            value={tagInput}
            onValueChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTag();
            }}
          />
        </form>
      )}
    </div>
  );
};
