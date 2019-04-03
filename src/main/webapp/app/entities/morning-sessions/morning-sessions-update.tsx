import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAssignment } from 'app/shared/model/assignment.model';
import { getEntities as getAssignments } from 'app/entities/assignment/assignment.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './morning-sessions.reducer';
import { IMorningSessions } from 'app/shared/model/morning-sessions.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMorningSessionsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMorningSessionsUpdateState {
  isNew: boolean;
  assignmentId: string;
}

export class MorningSessionsUpdate extends React.Component<IMorningSessionsUpdateProps, IMorningSessionsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      assignmentId: '0',
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

    this.props.getAssignments();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { morningSessionsEntity } = this.props;
      const entity = {
        ...morningSessionsEntity,
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
    this.props.history.push('/entity/morning-sessions');
  };

  render() {
    const { morningSessionsEntity, assignments, loading, updating } = this.props;
    const { isNew } = this.state;

    const { body, image, imageContentType } = morningSessionsEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="riggbyApp.morningSessions.home.createOrEditLabel">
              <Translate contentKey="riggbyApp.morningSessions.home.createOrEditLabel">Create or edit a MorningSessions</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : morningSessionsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="morning-sessions-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="riggbyApp.morningSessions.title">Title</Translate>
                  </Label>
                  <AvField id="morning-sessions-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="quoteLabel" for="quote">
                    <Translate contentKey="riggbyApp.morningSessions.quote">Quote</Translate>
                  </Label>
                  <AvField id="morning-sessions-quote" type="text" name="quote" />
                </AvGroup>
                <AvGroup>
                  <Label id="verseLabel" for="verse">
                    <Translate contentKey="riggbyApp.morningSessions.verse">Verse</Translate>
                  </Label>
                  <AvField id="morning-sessions-verse" type="text" name="verse" />
                </AvGroup>
                <AvGroup>
                  <Label id="bodyLabel" for="body">
                    <Translate contentKey="riggbyApp.morningSessions.body">Body</Translate>
                  </Label>
                  <AvInput id="morning-sessions-body" type="textarea" name="body" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="createdBy">
                    <Translate contentKey="riggbyApp.morningSessions.createdBy">Created By</Translate>
                  </Label>
                  <AvField id="morning-sessions-createdBy" type="text" name="createdBy" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="riggbyApp.morningSessions.image">Image</Translate>
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
                <Button tag={Link} id="cancel-save" to="/entity/morning-sessions" replace color="info">
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
  assignments: storeState.assignment.entities,
  morningSessionsEntity: storeState.morningSessions.entity,
  loading: storeState.morningSessions.loading,
  updating: storeState.morningSessions.updating,
  updateSuccess: storeState.morningSessions.updateSuccess
});

const mapDispatchToProps = {
  getAssignments,
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
)(MorningSessionsUpdate);
