import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './notifications.reducer';
import { INotifications } from 'app/shared/model/notifications.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Notifications extends React.Component<INotificationsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { notificationsList, match } = this.props;
    return (
      <div>
        <h2 id="notifications-heading">
          <Translate contentKey="riggbyApp.notifications.home.title">Notifications</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="riggbyApp.notifications.home.createLabel">Create new Notifications</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.body">Body</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.attachment">Attachment</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.targetGroup">Target Group</Translate>
                </th>
                <th>
                  <Translate contentKey="riggbyApp.notifications.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notificationsList.map((notifications, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${notifications.id}`} color="link" size="sm">
                      {notifications.id}
                    </Button>
                  </td>
                  <td>{notifications.title}</td>
                  <td>{notifications.body}</td>
                  <td>{notifications.createdBy}</td>
                  <td>
                    <TextFormat type="date" value={notifications.createdAt} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {notifications.attachment ? (
                      <div>
                        <a onClick={openFile(notifications.attachmentContentType, notifications.attachment)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                          &nbsp;
                        </a>
                        <span>
                          {notifications.attachmentContentType}, {byteSize(notifications.attachment)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{notifications.status ? 'true' : 'false'}</td>
                  <td>
                    <Translate contentKey={`riggbyApp.TargetGroup.${notifications.targetGroup}`} />
                  </td>
                  <td>{notifications.user ? notifications.user.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${notifications.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${notifications.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${notifications.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ notifications }: IRootState) => ({
  notificationsList: notifications.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
