import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './morning-sessions.reducer';
import { IMorningSessions } from 'app/shared/model/morning-sessions.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMorningSessionsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MorningSessionsDetail extends React.Component<IMorningSessionsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { morningSessionsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="riggbyApp.morningSessions.detail.title">MorningSessions</Translate> [<b>{morningSessionsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="riggbyApp.morningSessions.title">Title</Translate>
              </span>
            </dt>
            <dd>{morningSessionsEntity.title}</dd>
            <dt>
              <span id="quote">
                <Translate contentKey="riggbyApp.morningSessions.quote">Quote</Translate>
              </span>
            </dt>
            <dd>{morningSessionsEntity.quote}</dd>
            <dt>
              <span id="verse">
                <Translate contentKey="riggbyApp.morningSessions.verse">Verse</Translate>
              </span>
            </dt>
            <dd>{morningSessionsEntity.verse}</dd>
            <dt>
              <span id="body">
                <Translate contentKey="riggbyApp.morningSessions.body">Body</Translate>
              </span>
            </dt>
            <dd>{morningSessionsEntity.body}</dd>
            <dt>
              <span id="createdBy">
                <Translate contentKey="riggbyApp.morningSessions.createdBy">Created By</Translate>
              </span>
            </dt>
            <dd>{morningSessionsEntity.createdBy}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="riggbyApp.morningSessions.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {morningSessionsEntity.image ? (
                <div>
                  <a onClick={openFile(morningSessionsEntity.imageContentType, morningSessionsEntity.image)}>
                    <Translate contentKey="entity.action.open">Open</Translate>
                    &nbsp;
                  </a>
                  <span>
                    {morningSessionsEntity.imageContentType}, {byteSize(morningSessionsEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/morning-sessions" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/morning-sessions/${morningSessionsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ morningSessions }: IRootState) => ({
  morningSessionsEntity: morningSessions.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MorningSessionsDetail);
