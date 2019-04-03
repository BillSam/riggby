import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CommentDetail extends React.Component<ICommentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { commentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="riggbyApp.comment.detail.title">Comment</Translate> [<b>{commentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="body">
                <Translate contentKey="riggbyApp.comment.body">Body</Translate>
              </span>
            </dt>
            <dd>{commentEntity.body}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="riggbyApp.comment.title">Title</Translate>
              </span>
            </dt>
            <dd>{commentEntity.title}</dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="riggbyApp.comment.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={commentEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="riggbyApp.comment.event">Event</Translate>
            </dt>
            <dd>{commentEntity.event ? commentEntity.event.id : ''}</dd>
            <dt>
              <Translate contentKey="riggbyApp.comment.notification">Notification</Translate>
            </dt>
            <dd>{commentEntity.notification ? commentEntity.notification.id : ''}</dd>
            <dt>
              <Translate contentKey="riggbyApp.comment.user">User</Translate>
            </dt>
            <dd>{commentEntity.user ? commentEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/comment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/comment/${commentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ comment }: IRootState) => ({
  commentEntity: comment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDetail);
