import type { IPlaceData } from 'src/shared/types';

type ResetForm = { type: 'Reset_Form' };
type SetSelectPlace = { type: 'Set_Select_Place'; payload: IPlaceData };
type SetSavePlace = { type: 'Set_Save_Place'; payload: IPlaceData };
type SetDeletePlace = { type: 'Set_Delete_Place'; payload: IPlaceData['name'] };
type SetDeleteTag = { type: 'Set_Delete_Tag'; payload: string };
type SetPlaceTags = {
  type: 'Set_Place_Tags';
  payload: string;
};

export type IPlaceReducerAction =
  | SetSelectPlace
  | SetSavePlace
  | SetDeletePlace
  | SetPlaceTags
  | SetDeleteTag
  | ResetForm;
