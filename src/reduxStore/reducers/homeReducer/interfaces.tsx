import {IRadioButton} from '../../../components/atoms/radioButtonList';

export interface IUserInfo {
  name?: string;
  surname?: string;
  gender?: string;
  info?: string;
  id?: number;
}

export interface IHomeScreenState {
  users: IUsers;
  userForAddOrUpdate?: IUserInfo;
  genderRadioButton: IRadioButton[];
}

export type IUsers = Record<number, IUserInfo>;
