// place form categories
export type IPlaceCategory = {
  name: string;
};

export type IPlaceData = {
  name: string;
  adress: string;
  categories?: IPlaceCategory[];
  additionnalInfo?: string;
  imgSrc?: string;
  // Optional Google Maps specific fields
  placeId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  rating?: number;
  website?: string;
  phoneNumber?: string;
  googlePhotos?: string[];
  googleMapsUrl?: string;
};

export type IPlaceReducerState = {
  placesState: IPlaceData[];
};
