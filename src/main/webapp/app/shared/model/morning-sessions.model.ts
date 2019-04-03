import { IAssignment } from 'app/shared/model/assignment.model';

export interface IMorningSessions {
  id?: number;
  title?: string;
  quote?: string;
  verse?: string;
  body?: any;
  createdBy?: string;
  imageContentType?: string;
  image?: any;
  assignment?: IAssignment;
}

export const defaultValue: Readonly<IMorningSessions> = {};
