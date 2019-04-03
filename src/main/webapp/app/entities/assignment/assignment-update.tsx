import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMorningSessions } from 'app/shared/model/morning-sessions.model';
import { getEntities as getMorningSessions } from 'app/entities/morning-sessions/morning-sessions.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/shared/reducers/user-management';
import { getEntity, updateEntity, createEntity, reset } from './assignment.reducer';
import { IAssignment } from 'app/shared/model/assignment.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAssignmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAssignmentUpdateState {
  isNew: boolean;
  idsuser: any[];
  morningSessionId: string;
  taskId: string;
}

export class AssignmentUpdate extends React.Component<IAssignmentUpdateProps, IAssignmentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsuser: [],
      morningSessionId: '0',
      taskId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getMorningSessions();
    this.props.getTasks();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.dueDate = convertDateTimeToServer(values.dueDate);
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.createdBy = convertDateTimeToServer(values.createdBy);

    if (errors.length === 0) {
      const { assignmentEntity } = this.props;
      const entity = {
        ...assignmentEntity,
        ...values,
        users: mapIdList(values.users)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/assignment');
  };

  render() {
    const { assignmentEntity, morningSessions, tasks, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="riggbyApp.assignment.home.createOrEditLabel">
              <Translate contentKey="riggbyApp.assignment.home.createOrEditLabel">Create or edit a Assignment</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : assignmentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="assignment-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dueDateLabel" for="dueDate">
                    <Translate contentKey="riggbyApp.assignment.dueDate">Due Date</Translate>
                  </Label>
                  <AvInput
                    id="assignment-dueDate"
                    type="datetime-local"
                    className="form-control"
                    name="dueDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.assignmentEntity.dueDate)}
                  />
                  <UncontrolledTooltip target="dueDateLabel">
                    <Translate contentKey="riggbyApp.assignment.help.dueDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="dueDayLabel" for="dueDay">
                    <Translate contentKey="riggbyApp.assignment.dueDay">Due Day</Translate>
                  </Label>
                  <AvField id="assignment-dueDay" type="text" name="dueDay" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" check>
                    <AvInput id="assignment-status" type="checkbox" className="form-control" name="status" />
                    <Translate contentKey="riggbyApp.assignment.status">Status</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="createdAt">
                    <Translate contentKey="riggbyApp.assignment.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="assignment-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.assignmentEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="createdBy">
                    <Translate contentKey="riggbyApp.assignment.createdBy">Created By</Translate>
                  </Label>
                  <AvInput
                    id="assignment-createdBy"
                    type="datetime-local"
                    className="form-control"
                    name="createdBy"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.assignmentEntity.createdBy)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="morningSession.id">
                    <Translate contentKey="riggbyApp.assignment.morningSession">Morning Session</Translate>
                  </Label>
                  <AvInput id="assignment-morningSession" type="select" className="form-control" name="morningSession.id">
                    <option value="" key="0" />
                    {morningSessions
                      ? morningSessions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="task.id">
                    <Translate contentKey="riggbyApp.assignment.task">Task</Translate>
                  </Label>
                  <AvInput id="assignment-task" type="select" className="form-control" name="task.id">
                    <option value="" key="0" />
                    {tasks
                      ? tasks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="users">
                    <Translate contentKey="riggbyApp.assignment.user">User</Translate>
                  </Label>
                  <AvInput
                    id="assignment-user"
                    type="select"
                    multiple
                    className="form-control"
                    name="users"
                    value={assignmentEntity.users && assignmentEntity.users.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/assignment" replace color="info">
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
  morningSessions: storeState.morningSessions.entities,
  tasks: storeState.task.entities,
  users: storeState.userManagement.users,
  assignmentEntity: storeState.assignment.entity,
  loading: storeState.assignment.loading,
  updating: storeState.assignment.updating,
  updateSuccess: storeState.assignment.updateSuccess
});

const mapDispatchToProps = {
  getMorningSessions,
  getTasks,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentUpdate);
