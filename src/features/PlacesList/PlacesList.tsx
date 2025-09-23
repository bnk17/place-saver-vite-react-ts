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

  return (
    <section className="flex flex-col gap-2 mt-10">
      {placesList.length === 0 ? (
        <p>Aucun lieu n'a été ajouté pour le moment</p>
      ) : (
        placesList.map((place) => {
          return (
            <div
              key={place.name}
              className="relative p-2 border-b-1 border-gray-200"
            >
              <div className="text-sm flex flex-wrap justify-between items-center gap-2">
                <div className="flex gap-2 items-center">
                  <img
                    className=" size-14 rounded-lg"
                    src={place.imgSrc}
                    alt="picture of the place "
                  />
                  <div>
                    <p className="text-lg font-medium ">{place.name}</p>
                    <p className=" w-[25ch] text-[12px]">{place.adress}</p>
                  </div>
                </div>
                {/* <div className="flex gap-1">
                {place.categories?.map((cat) => {
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
              </div> */}
                <span
                  className=" top-0 right-0 px-2 text-gray-600 border-1 border-gray-300 m-2 rounded-sm"
                  onClick={() => handleDeletePlace(place.name)}
                >
                  -
                </span>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};
