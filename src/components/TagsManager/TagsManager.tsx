import type { IPlaceCategory } from 'src/shared/types';
import { Button } from '../ui/Button';
import { useContext, useRef, useState } from 'react';
import type { IPlaceReducerAction } from 'src/reducers/PlaceReducer';
import { Input } from '../ui/Input';
import { PlaceDispatchContext } from 'src/context/Places/PlacesContext';

type Tag = IPlaceCategory; // keeping type compatible, just renamed

// Individual Tag display component
type TagItemProps = {
  tag: Tag;
  onRemove: (tagName: string) => void;
};

const TagItem = ({ tag, onRemove }: TagItemProps) => (
  <div
    className="flex cursor-pointer items-center gap-1 rounded-sm border border-blue-600 bg-blue-200 px-1 py-0.5 text-[12px] font-semibold text-blue-700"
    onClick={() => onRemove(tag.name)}
  >
    {tag.name} <span className="text-[10px] text-red-600">x</span>
  </div>
);

// Main TagManager component
type TagManagerProps = {
  tags: Tag[];
  mode: 'form' | 'read';
  onTagChange?: React.ActionDispatch<[action: IPlaceReducerAction]> | null;
};

export const TagManager = ({
  tags,
  onTagChange = null,
  mode = 'form',
}: TagManagerProps) => {
  const [tagInput, setTagInput] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useContext(PlaceDispatchContext);

  const handleAddTag = () => {
    if (!tagInput) return;
    if (onTagChange) {
      onTagChange({
        type: 'Set_Place_Categories',
        payload: tagInput,
      });
    }
    setTagInput('');
    inputRef.current?.focus();
  };

  const handleRemoveTag = (name: string) => {
    if (mode === 'form' && dispatch) {
      dispatch({
        type: 'Set_Delete_Category',
        payload: name,
      });
    }
  };

  return (
    <div className="mb-2 flex flex-col gap-2">
      {mode === 'form' && (
        <div className="flex items-end gap-1">
          <Input
            inputRef={inputRef}
            name="tags"
            placeholder="Ajouter un tag"
            type="text"
            value={tagInput}
            onValueChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTag();
            }}
          />
          <Button
            size="sm"
            type="button"
            className="mt-2 px-2"
            onClick={handleAddTag}
          >
            Ajouter
          </Button>
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <TagItem key={tag.name} tag={tag} onRemove={handleRemoveTag} />
        ))}
      </div>
    </div>
  );
};
