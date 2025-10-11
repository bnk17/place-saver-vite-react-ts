// place form categories
export type IPlaceTag = {
  name: string;
};

export type IPlaceData = {
  name: string;
  adress: string;
  categories?: string;
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

export type IAppMode = 'initial' | 'form_search' | 'form_adding_details';

export type IPlaceReducerState = {
  appMode: IAppMode;
  form: {
    selectedPlace: IPlaceData | undefined;
    tags: IPlaceTag[];
  };
};

export type ISavePlaceIdDTO = {
  placeId: string;
  tags?: { name: string }[];
};
export type ISavePlaceIdResponseDTO = {
  success: boolean;
  data: {
    id: number;
    placeId: string;
  };
};
