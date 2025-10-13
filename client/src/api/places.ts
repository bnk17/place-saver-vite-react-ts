import { post, useGet } from 'src/lib/api';
import { type IPlaceTag, type ISavePlaceIdResponseDTO } from 'src/shared/types';

/**
 * POST /api/place
 * Creates a place item in db.
 */

type PlaceDTO = { placeId: string; tags: IPlaceTag[] };
type ApiResponseDTO<T> = {
  success: boolean;
  data?: T;
  error?: string;
  cause?: string;
};
export const savePlaceId = (placeInfo: PlaceDTO) => {
  const body = placeInfo;
  const response = post<ISavePlaceIdResponseDTO>('api/places', body);

  return response;
};

/**
 * GET /api/places
 * Fetch all places ids
 */
export const useGetPlacesData = () => {
  const response = useGet<ApiResponseDTO<PlaceDTO[]>>('api/places');

  return response;
};
