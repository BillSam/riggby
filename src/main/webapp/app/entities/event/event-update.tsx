import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEventType } from 'app/shared/model/event-type.model';
import { getEntities as getEventTypes } from 'app/entities/event-type/event-type.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEventUpdateState {
  isNew: boolean;
  eventId: string;
}

export class EventUpdate extends React.Component<IEventUpdateProps, IEventUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      eventId: '0',
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

    this.props.getEventTypes();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.dueDate = convertDateTimeToServer(values.dueDate);
    values.createdBy = convertDateTimeToServer(values.createdBy);
    values.createdAt = convertDateTimeToServer(values.createdAt);

    if (errors.length === 0) {
      const { eventEntity } = this.props;
      const entity = {
        ...eventEntity,
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
    this.props.history.push('/entity/event');
  };

  render() {
    const { eventEntity, eventTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = eventEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="riggbyApp.event.home.createOrEditLabel">
              <Translate contentKey="riggbyApp.event.home.createOrEditLabel">Create or edit a Event</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="event-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="riggbyApp.event.title">Title</Translate>
                  </Label>
                  <AvField id="event-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="riggbyApp.event.description">Description</Translate>
                  </Label>
                  <AvField id="event-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="dueDateLabel" for="dueDate">
                    <Translate contentKey="riggbyApp.event.dueDate">Due Date</Translate>
                  </Label>
                  <AvInput
                    id="event-dueDate"
                    type="datetime-local"
                    className="form-control"
                    name="dueDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.eventEntity.dueDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="eventCategoryLabel">
                    <Translate contentKey="riggbyApp.event.eventCategory">Event Category</Translate>
                  </Label>
                  <AvInput
                    id="event-eventCategory"
                    type="select"
                    className="form-control"
                    name="eventCategory"
                    value={(!isNew && eventEntity.eventCategory) || 'INTERNAL'}
                  >
                    <option value="INTERNAL">
                      <Translate contentKey="riggbyApp.EventCategory.INTERNAL" />
                    </option>
                    <option value="EXTERNAL">
                      <Translate contentKey="riggbyApp.EventCategory.EXTERNAL" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" check>
                    <AvInput id="event-status" type="checkbox" className="form-control" name="status" />
                    <Translate contentKey="riggbyApp.event.status">Status</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="createdBy">
                    <Translate contentKey="riggbyApp.event.createdBy">Created By</Translate>
                  </Label>
                  <AvInput
                    id="event-createdBy"
                    type="datetime-local"
                    className="form-control"
                    name="createdBy"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.eventEntity.createdBy)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="createdAt">
                    <Translate contentKey="riggbyApp.event.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="event-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.eventEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="riggbyApp.event.image">Image</Translate>
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(false, 'image')} />
                    <AvInput type="hidden" name="image" value={image} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="targetGroupLabel">
                    <Translate contentKey="riggbyApp.event.targetGroup">Target Group</Translate>
                  </Label>
                  <AvInput
                    id="event-targetGroup"
                    type="select"
                    className="form-control"
                    name="targetGroup"
                    value={(!isNew && eventEntity.targetGroup) || 'ADMIN'}
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
                  <Label for="event.id">
                    <Translate contentKey="riggbyApp.event.event">Event</Translate>
                  </Label>
                  <AvInput id="event-event" type="select" className="form-control" name="event.id">
                    <option value="" key="0" />
                    {eventTypes
                      ? eventTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/event" replace color="info">
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
  eventTypes: storeState.eventType.entities,
  eventEntity: storeState.event.entity,
  loading: storeState.event.loading,
  updating: storeState.event.updating,
  updateSuccess: storeState.event.updateSuccess
});

const mapDispatchToProps = {
  getEventTypes,
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
)(EventUpdate);
