import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventType from './event-type';
import EventTypeDetail from './event-type-detail';
import EventTypeUpdate from './event-type-update';
import EventTypeDeleteDialog from './event-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EventTypeDeleteDialog} />
  </>
);

export default Routes;
