// place form categories
export type IPlaceCategory = {
  name: string;
};

export type IPlaceData = {
  categories: IPlaceCategory[];
  name: string;
  adress?: string;
  additionnalInfo?: string;
  imgSrc?: string;
};

export type IPlaceReducerState = {
  isFormOpen?: boolean;
  form: {
    categories: IPlaceCategory[];
    name: string;
    adress: string;
    additionnalInfo: string;
    imgSrc: string;
  };
  placesState: IPlaceData[];
};
