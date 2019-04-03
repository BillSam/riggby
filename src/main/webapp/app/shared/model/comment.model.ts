import { Moment } from 'moment';
import { IEvent } from 'app/shared/model/event.model';
import { INotifications } from 'app/shared/model/notifications.model';
import { IUser } from 'app/shared/model/user.model';

export interface IComment {
  id?: number;
  body?: any;
  title?: string;
  createdAt?: Moment;
  event?: IEvent;
  notification?: INotifications;
  user?: IUser;
}

export const defaultValue: Readonly<IComment> = {};
