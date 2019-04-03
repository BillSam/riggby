import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/shared/reducers/user-management';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './notifications.reducer';
import { INotifications } from 'app/shared/model/notifications.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificationsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotificationsUpdateState {
  isNew: boolean;
  userId: string;
}

export class NotificationsUpdate extends React.Component<INotificationsUpdateProps, INotificationsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    if (errors.length === 0) {
      const { notificationsEntity } = this.props;
      const entity = {
        ...notificationsEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/notifications');
  };

  render() {
    const { notificationsEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { body, attachment, attachmentContentType } = notificationsEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="riggbyApp.notifications.home.createOrEditLabel">
              <Translate contentKey="riggbyApp.notifications.home.createOrEditLabel">Create or edit a Notifications</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : notificationsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="notifications-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="riggbyApp.notifications.title">Title</Translate>
                  </Label>
                  <AvField id="notifications-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="bodyLabel" for="body">
                    <Translate contentKey="riggbyApp.notifications.body">Body</Translate>
                  </Label>
                  <AvInput id="notifications-body" type="textarea" name="body" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="createdBy">
                    <Translate contentKey="riggbyApp.notifications.createdBy">Created By</Translate>
                  </Label>
                  <AvField id="notifications-createdBy" type="text" name="createdBy" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="createdAt">
                    <Translate contentKey="riggbyApp.notifications.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="notifications-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.notificationsEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="attachmentLabel" for="attachment">
                      <Translate contentKey="riggbyApp.notifications.attachment">Attachment</Translate>
                    </Label>
                    <br />
                    {attachment ? (
                      <div>
                        <a onClick={openFile(attachmentContentType, attachment)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {attachmentContentType}, {byteSize(attachment)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('attachment')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_attachment" type="file" onChange={this.onBlobChange(false, 'attachment')} />
                    <AvInput type="hidden" name="attachment" value={attachment} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" check>
                    <AvInput id="notifications-status" type="checkbox" className="form-control" name="status" />
                    <Translate contentKey="riggbyApp.notifications.status">Status</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="targetGroupLabel">
                    <Translate contentKey="riggbyApp.notifications.targetGroup">Target Group</Translate>
                  </Label>
                  <AvInput
                    id="notifications-targetGroup"
                    type="select"
                    className="form-control"
                    name="targetGroup"
                    value={(!isNew && notificationsEntity.targetGroup) || 'ADMIN'}
                  >
                    <option value="ADMIN">
                      <Translate contentKey="riggbyApp.TargetGroup.ADMIN" />
                    </option>
                    <option value="DEVELOPER">
                      <Translate contentKey="riggbyApp.TargetGroup.DEVELOPER" />
                    </option>
                    <option value="ACCOUNTANT">
                      <Translate contentKey="riggbyApp.TargetGroup.ACCOUNTANT" />
                    </option>
                    <option value="NETWORK">
                      <Translate contentKey="riggbyApp.TargetGroup.NETWORK" />
                    </option>
                    <option value="RECEPTION">
                      <Translate contentKey="riggbyApp.TargetGroup.RECEPTION" />
                    </option>
                    <option value="KITCHEN">
                      <Translate contentKey="riggbyApp.TargetGroup.KITCHEN" />
                    </option>
                    <option value="ALL">
                      <Translate contentKey="riggbyApp.TargetGroup.ALL" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="riggbyApp.notifications.user">User</Translate>
                  </Label>
                  <AvInput id="notifications-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/notifications" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  notificationsEntity: storeState.notifications.entity,
  loading: storeState.notifications.loading,
  updating: storeState.notifications.updating,
  updateSuccess: storeState.notifications.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsUpdate);
