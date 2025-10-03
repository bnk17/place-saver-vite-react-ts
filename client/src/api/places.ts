import { post } from 'src/lib/api';
import { type IPlaceData, type IPlaceTag } from 'src/shared/types';

/**
 * POST /api/place
 * Creates a place item in db.
 */

type SavePlaceDTO = IPlaceData & { tags: IPlaceTag[] };
type SavePlaceResponse = {
  success: boolean;
  error: string;
  cause: string;
};
export const savePlace = (placeInfo: SavePlaceDTO) => {
  const body = placeInfo;
  const response = post<SavePlaceResponse>('api/places', body);

  return response;
};
