import type { IPlaceReducerState } from 'src/shared/types';
import { Button } from '../ui/Button';

type IAppHeaderProps = {
  buttonIcon: React.ReactNode;
  formMode: IPlaceReducerState['appMode'];
  onChangeMode: () => void;
};
export const AppHeader = ({
  formMode,
  buttonIcon,
  onChangeMode,
}: IAppHeaderProps) => {
  return (
    <header className="sticky top-0 flex items-center justify-between">
      <h1 className="w-full text-[22px] font-semibold text-zinc-900">Rmnd.</h1>
      {formMode !== 'form_adding_details' && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onChangeMode()}
          type="button"
        >
          {buttonIcon}
        </Button>
      )}
    </header>
  );
};
