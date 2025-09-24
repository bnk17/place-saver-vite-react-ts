import type { IPlaceReducerState } from 'src/shared/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type PlaceFormProps = {
  place: IPlaceReducerState;
};
export const PlaceForm = ({ place }: PlaceFormProps) => {
  return (
    <form
      className="flex h-full w-full flex-col justify-end gap-2"
      onLoad={(e) => console.log(e)}
    >
      <div
        className={
          'relative mb-10 flex h-fit w-full items-end justify-center gap-2 rounded-2xl border-2 border-slate-300 p-3 shadow-blue-500/25 transition-all duration-75 ease-out focus-within:shadow-lg'
        }
      >
        <Input
          name="name"
          placeholder="Entrer le nom du lieu"
          value={place.form.name}
          onValueChange={() => null}
        />

        <Button size="md" className="h-[30px]">
          send
        </Button>
      </div>
    </form>
  );
};
