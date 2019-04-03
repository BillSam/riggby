import { Moment } from 'moment';
import { IMorningSessions } from 'app/shared/model/morning-sessions.model';
import { ITask } from 'app/shared/model/task.model';
import { IUser } from 'app/shared/model/user.model';

export interface IAssignment {
  id?: number;
  dueDate?: Moment;
  dueDay?: string;
  status?: boolean;
  createdAt?: Moment;
  createdBy?: Moment;
  morningSession?: IMorningSessions;
  task?: ITask;
  users?: IUser[];
}

export const defaultValue: Readonly<IAssignment> = {
  status: false
};
