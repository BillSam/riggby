import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import assignment, {
  AssignmentState
} from 'app/entities/assignment/assignment.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
// prettier-ignore
import morningSessions, {
  MorningSessionsState
} from 'app/entities/morning-sessions/morning-sessions.reducer';
// prettier-ignore
import notifications, {
  NotificationsState
} from 'app/entities/notifications/notifications.reducer';
// prettier-ignore
import eventType, {
  EventTypeState
} from 'app/entities/event-type/event-type.reducer';
// prettier-ignore
import event, {
  EventState
} from 'app/entities/event/event.reducer';
// prettier-ignore
import profile, {
  ProfileState
} from 'app/entities/profile/profile.reducer';
// prettier-ignore
import comment, {
  CommentState
} from 'app/entities/comment/comment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly assignment: AssignmentState;
  readonly task: TaskState;
  readonly morningSessions: MorningSessionsState;
  readonly notifications: NotificationsState;
  readonly eventType: EventTypeState;
  readonly event: EventState;
  readonly profile: ProfileState;
  readonly comment: CommentState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  assignment,
  task,
  morningSessions,
  notifications,
  eventType,
  event,
  profile,
  comment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
