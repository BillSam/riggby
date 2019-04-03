import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface IProfile {
  id?: number;
  dateOfEmployment?: Moment;
  firstName?: string;
  secondName?: string;
  otherName?: string;
  gitProfile?: string;
  imageContentType?: string;
  image?: any;
  bio?: any;
  gender?: Gender;
  project?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IProfile> = {};
