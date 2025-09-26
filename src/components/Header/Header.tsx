import type { IPlaceReducerState } from 'src/shared/types';
import { Button } from '../ui/Button';

type IAppHeaderProps = {
  buttonLabel: string;
  formMode: IPlaceReducerState['appMode'];
  onChangeMode: () => void;
};
export const AppHeader = ({
  formMode,
  buttonLabel,
  onChangeMode,
}: IAppHeaderProps) => {
  return (
    <section className="flex items-center justify-between">
      <h1 className="w-full text-[22px] font-semibold text-zinc-900">Rmnd.</h1>
      {formMode !== 'form_adding_details' && (
        <Button
          className="text-nowrap"
          size="sm"
          variant="ghost"
          onClick={() => onChangeMode()}
        >
          {buttonLabel}
        </Button>
      )}
    </section>
  );
};
