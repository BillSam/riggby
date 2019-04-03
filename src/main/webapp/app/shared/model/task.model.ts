import { Moment } from 'moment';
import { IAssignment } from 'app/shared/model/assignment.model';

export const enum TaskFrequency {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  DAILY = 'DAILY'
}

export interface ITask {
  id?: number;
  title?: string;
  description?: string;
  createdBy?: Moment;
  createdAt?: Moment;
  frequency?: TaskFrequency;
  assignment?: IAssignment;
}

export const defaultValue: Readonly<ITask> = {};
