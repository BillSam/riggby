import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IComment } from 'app/shared/model/comment.model';

export const enum TargetGroup {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  ACCOUNTANT = 'ACCOUNTANT',
  NETWORK = 'NETWORK',
  RECEPTION = 'RECEPTION',
  KITCHEN = 'KITCHEN',
  ALL = 'ALL'
}

export interface INotifications {
  id?: number;
  title?: string;
  body?: any;
  createdBy?: string;
  createdAt?: Moment;
  attachmentContentType?: string;
  attachment?: any;
  status?: boolean;
  targetGroup?: TargetGroup;
  user?: IUser;
  comments?: IComment[];
}

export const defaultValue: Readonly<INotifications> = {
  status: false
};
