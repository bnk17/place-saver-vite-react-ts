import { post, useGet } from 'src/lib/api';
import { type IPlaceData, type IPlaceTag } from 'src/shared/types';

/**
 * POST /api/place
 * Creates a place item in db.
 */

type PlaceDTO = IPlaceData & { tags: IPlaceTag[] };
type ApiResponseDTO<T> = {
  success: boolean;
  data?: T;
  error?: string;
  cause?: string;
};
export const savePlace = (placeInfo: PlaceDTO) => {
  const body = placeInfo;
  const response = post('api/places', body);

  return response;
};

/**
 * GET /api/places
 * Fetch all places
 */
export const useGetPlaces = () => {
  const response = useGet<ApiResponseDTO<PlaceDTO[]>>('api/places');

  return response;
};
