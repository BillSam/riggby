import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Assignment from './assignment';
import Task from './task';
import MorningSessions from './morning-sessions';
import Notifications from './notifications';
import EventType from './event-type';
import Event from './event';
import Profile from './profile';
import Comment from './comment';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/assignment`} component={Assignment} />
      <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}/morning-sessions`} component={MorningSessions} />
      <ErrorBoundaryRoute path={`${match.url}/notifications`} component={Notifications} />
      <ErrorBoundaryRoute path={`${match.url}/event-type`} component={EventType} />
      <ErrorBoundaryRoute path={`${match.url}/event`} component={Event} />
      <ErrorBoundaryRoute path={`${match.url}/profile`} component={Profile} />
      <ErrorBoundaryRoute path={`${match.url}/comment`} component={Comment} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
