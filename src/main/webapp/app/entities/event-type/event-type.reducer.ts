import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEventType, defaultValue } from 'app/shared/model/event-type.model';

export const ACTION_TYPES = {
  FETCH_EVENTTYPE_LIST: 'eventType/FETCH_EVENTTYPE_LIST',
  FETCH_EVENTTYPE: 'eventType/FETCH_EVENTTYPE',
  CREATE_EVENTTYPE: 'eventType/CREATE_EVENTTYPE',
  UPDATE_EVENTTYPE: 'eventType/UPDATE_EVENTTYPE',
  DELETE_EVENTTYPE: 'eventType/DELETE_EVENTTYPE',
  RESET: 'eventType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEventType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EventTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: EventTypeState = initialState, action): EventTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTTYPE):
    case REQUEST(ACTION_TYPES.DELETE_EVENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTTYPE):
    case FAILURE(ACTION_TYPES.CREATE_EVENTTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTTYPE):
    case FAILURE(ACTION_TYPES.DELETE_EVENTTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/event-types';

// Actions

export const getEntities: ICrudGetAllAction<IEventType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EVENTTYPE_LIST,
  payload: axios.get<IEventType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEventType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTTYPE,
    payload: axios.get<IEventType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEventType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEventType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEventType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
