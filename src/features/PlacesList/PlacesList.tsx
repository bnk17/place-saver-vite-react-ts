import { useContext } from 'react';
import { PlaceDispatchContext } from 'src/context/Places/PlacesContext';
import type { IPlaceData } from 'src/shared/types';

type PlacesListProps = {
  placesList: IPlaceData[];
};
export const PlacesList = ({ placesList }: PlacesListProps) => {
  const dispatch = useContext(PlaceDispatchContext);

  function handleDeletePlace(name: string) {
    if (dispatch === null) return;
    dispatch({ type: 'Set_Delete_Place', payload: name });
  }
  if (placesList.length === 0) return <p className="mt-2">Rien à afficher</p>;
  return (
    <section className="flex flex-col gap-2 mt-2">
      <h1 className="text-lg font-semibold">List des lieux</h1>
      {placesList.map((place) => {
        return (
          <div
            key={place.name}
            className="relative bg-gray-100 rounded-lg p-2 border-2 border-gray-300"
          >
            <div className="text-sm flex items-center gap-2">
              <p className="text-sm font-medium ">{place.name}</p>
              <p className=" w-[20ch] truncate">{place.adress}</p>
              {/* <p className="text-gray-500 italic text-[12px]">
                {place.additionnalInfo}
              </p> */}
              <div className="flex gap-1">
                {place.categories.map((cat) => {
                  return (
                    <div
                      key={cat.name}
                      className="bg-blue-200 text-blue-700 text-[11px] rounded-sm flex"
                      onClick={() => {
                        if (dispatch === null) return;
                        dispatch({
                          type: 'Set_Delete_Category',
                          payload: cat.name,
                        });
                      }}
                    >
                      {cat.name}
                    </div>
                  );
                })}
              </div>
              <span
                className=" top-0 right-0 px-2 text-gray-600 border-1 border-gray-300 m-2 rounded-sm"
                onClick={() => handleDeletePlace(place.name)}
              >
                -
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
