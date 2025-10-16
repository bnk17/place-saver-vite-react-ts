import { Cancel01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import clsx from 'clsx';
import { useRef, type Ref } from 'react';
import { DialogTrigger, Pressable } from 'react-aria-components';
import { Button } from 'src/components/ui/Button';
import { ModalBase } from 'src/components/ui/ModalBase';
import type {
  ITodoCategoriesProps,
  ITodoCategoryModalProps,
} from '../types/components.types';
import type { Category } from '../types/store.types';
import { categoryColors } from '../utils';

interface CategoryItemProps {
  variant: 'page' | 'modal';
  category: Category;
  categorySelected: number | null;
  ref?: Ref<HTMLLIElement>;
  onSelect?: (category: Category) => void;
  onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  variant,
  category,
  categorySelected,
  ref,
  onSelect,
  onClick,
}) => {
  if (variant === 'modal' && category.name === 'Toutes') {
    return null;
  }

  const isSelected = categorySelected === category.id;

  return (
    <li
      key={category.id}
      ref={ref}
      onClick={() => (onSelect ? onSelect(category) : onClick())}
      className={clsx(
        'cursor-pointer rounded-md border px-2 py-1 text-sm transition-colors select-none',
        isSelected
          ? `${categoryColors[category.color]} border-none font-medium`
          : `border-gray-200 bg-white text-gray-700 hover:bg-gray-100 ${`focus:bg-${category.color}-900`}`
        // ---------------------------------
      )}
    >
      {category.name}
    </li>
  );
};

export const TodoCategories = ({
  categories,
  categorySelected,
  onSelectCategory,
}: ITodoCategoriesProps) => {
  const categoryRefs = useRef<Record<number, HTMLLIElement | null>>({});

  function handleSelectCategory(categoryId: number) {
    const el = categoryRefs.current[categoryId];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
    onSelectCategory(categoryId);
  }

  return (
    <ul className="relative flex w-full items-center gap-2 overflow-x-auto py-2">
      {categories.map((cat) => (
        <CategoryItem
          variant="page"
          key={cat.id}
          ref={(el) => {
            categoryRefs.current[cat.id] = el;
          }}
          onClick={() => handleSelectCategory(cat.id)}
          category={cat}
          categorySelected={categorySelected}
        />
      ))}
    </ul>
  );
};

export const TodoCategoryModal = ({
  state,
  isModalOpen,
  categorySelected,
  setCategorySelected,
  setIsModalOpen,
}: ITodoCategoryModalProps) => {
  return (
    <DialogTrigger>
      <Pressable>
        <div>
          <ModalBase isOpen={isModalOpen}>
            <ul className="flex flex-col flex-wrap gap-3 p-4">
              <div className="flex w-full justify-center">
                <button className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <HugeiconsIcon
                    icon={Cancel01FreeIcons}
                    size={18}
                    onClick={() => setIsModalOpen(false)}
                  />
                </button>
              </div>
              <h4 className="font-medium">Sélectionner une catégorie</h4>
              <div className="flex flex-col gap-1">
                {state.categories.map(
                  (cat) =>
                    cat.name !== 'Toutes' && (
                      <CategoryItem
                        variant="modal"
                        key={cat.id}
                        onClick={() => {
                          setCategorySelected({ id: cat.id, name: cat.name });
                          setIsModalOpen(false);
                        }}
                        category={cat}
                        categorySelected={categorySelected?.id ?? null}
                      />
                    )
                )}
              </div>
            </ul>
          </ModalBase>
          {categorySelected ? (
            <div className="mt-1 flex items-center">
              <button
                className="flex w-fit items-center gap-1 rounded-md bg-blue-100 px-1 text-sm text-[12px] font-semibold text-blue-600"
                onClick={() => setCategorySelected(null)}
              >
                {categorySelected.name}
                <span className="text-red-500">
                  <HugeiconsIcon
                    icon={Cancel01FreeIcons}
                    width={13}
                    strokeWidth={2.8}
                  />
                </span>
              </button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsModalOpen(true)}
              >
                Changer la catégorie
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-1 p-1.5 text-sm font-medium text-gray-600"
            >
              Choisir la catégorie
            </button>
          )}
        </div>
      </Pressable>
    </DialogTrigger>
  );
};
