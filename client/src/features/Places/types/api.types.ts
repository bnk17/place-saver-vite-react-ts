import type { IPlaceTag } from 'src/shared/types';

export type PlaceDTO = { placeId: string; tags: IPlaceTag[] };
export type ApiResponseDTO<T> = {
  success: boolean;
  data?: T;
  error?: string;
  cause?: string;
};
