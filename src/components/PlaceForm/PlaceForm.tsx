import type { IPlaceReducerState } from 'src/shared/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type PlaceFormProps = {
  place: IPlaceReducerState;
};
export const PlaceForm = ({ place }: PlaceFormProps) => {
  return (
    <form
      className="w-full flex gap-2 h-full flex-col justify-end"
      onLoad={(e) => console.log(e)}
    >
      <div
        className={
          'border-2 border-slate-300 rounded-2xl w-full h-fit relative flex items-end justify-center p-3 gap-2 mb-10  focus-within:shadow-lg shadow-blue-500/25 transition-all ease-out duration-75'
        }
      >
        <Input
          name="name"
          placeholder="Entrer le nom du lieu"
          value={place.form.name}
          onValueChange={() => null}
        />

        <Button size="md" className="h-[30px] ">
          send
        </Button>
      </div>
    </form>
  );
};
