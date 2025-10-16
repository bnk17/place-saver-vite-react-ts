import { post, useGet } from 'src/lib/api';
import { type ISavePlaceIdResponseDTO } from 'src/shared/types';
import type { ApiResponseDTO, PlaceDTO } from '../types/api.types';

/**
 * POST /api/place
 * Creates a place item in db.
 */

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
