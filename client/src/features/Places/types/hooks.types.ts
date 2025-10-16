import type { GooglePlaceDetails } from 'src/services/googleMapsService';
import type { IPlaceTag } from 'src/shared/types';

export type IPlaceWithDetailsAndTags = {
  details: GooglePlaceDetails;
  tags: IPlaceTag[];
};

export type IUseGetPlacesProps = {
  placesWithDetails: IPlaceWithDetailsAndTags[];
  tags: IPlaceTag[]; // maybe you want a combined tag list too
};

export type IUseGoogleMapsConfig = {
  apiKey: string;
  autoInitialize?: boolean;
};
