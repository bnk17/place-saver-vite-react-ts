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

export type IFormMode = 'initial' | 'adding_details' | 'ready_for_submission';
export type IPlaceReducerState = {
  form: {
    mode: IFormMode;
    selectedPlace: IPlaceData | undefined;
    categories: IPlaceCategory[];
  };
  savedPlacesList: IPlaceData[];
};
