import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MorningSessions from './morning-sessions';
import MorningSessionsDetail from './morning-sessions-detail';
import MorningSessionsUpdate from './morning-sessions-update';
import MorningSessionsDeleteDialog from './morning-sessions-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MorningSessionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MorningSessionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MorningSessionsDetail} />
      <ErrorBoundaryRoute path={match.url} component={MorningSessions} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MorningSessionsDeleteDialog} />
  </>
);

export default Routes;
