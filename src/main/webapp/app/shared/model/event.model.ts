import { Moment } from 'moment';
import { IEventType } from 'app/shared/model/event-type.model';
import { IComment } from 'app/shared/model/comment.model';

export const enum EventCategory {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}

export const enum TargetGroup {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  ACCOUNTANT = 'ACCOUNTANT',
  NETWORK = 'NETWORK',
  RECEPTION = 'RECEPTION',
  KITCHEN = 'KITCHEN',
  ALL = 'ALL'
}

export interface IEvent {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: Moment;
  eventCategory?: EventCategory;
  status?: boolean;
  createdBy?: Moment;
  createdAt?: Moment;
  imageContentType?: string;
  image?: any;
  targetGroup?: TargetGroup;
  event?: IEventType;
  comments?: IComment[];
}

export const defaultValue: Readonly<IEvent> = {
  status: false
};
