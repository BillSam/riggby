import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventDetail extends React.Component<IEventDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="riggbyApp.event.detail.title">Event</Translate> [<b>{eventEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="riggbyApp.event.title">Title</Translate>
              </span>
            </dt>
            <dd>{eventEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="riggbyApp.event.description">Description</Translate>
              </span>
            </dt>
            <dd>{eventEntity.description}</dd>
            <dt>
              <span id="dueDate">
                <Translate contentKey="riggbyApp.event.dueDate">Due Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={eventEntity.dueDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="eventCategory">
                <Translate contentKey="riggbyApp.event.eventCategory">Event Category</Translate>
              </span>
            </dt>
            <dd>{eventEntity.eventCategory}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="riggbyApp.event.status">Status</Translate>
              </span>
            </dt>
            <dd>{eventEntity.status ? 'true' : 'false'}</dd>
            <dt>
              <span id="createdBy">
                <Translate contentKey="riggbyApp.event.createdBy">Created By</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={eventEntity.createdBy} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="riggbyApp.event.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={eventEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="image">
                <Translate contentKey="riggbyApp.event.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {eventEntity.image ? (
                <div>
                  <a onClick={openFile(eventEntity.imageContentType, eventEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>
                    &nbsp;
                  </a>
                  <span>
                    {eventEntity.imageContentType}, {byteSize(eventEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="targetGroup">
                <Translate contentKey="riggbyApp.event.targetGroup">Target Group</Translate>
              </span>
            </dt>
            <dd>{eventEntity.targetGroup}</dd>
            <dt>
              <Translate contentKey="riggbyApp.event.event">Event</Translate>
            </dt>
            <dd>{eventEntity.event ? eventEntity.event.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/event" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/event/${eventEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ event }: IRootState) => ({
  eventEntity: event.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
