import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INotifications, defaultValue } from 'app/shared/model/notifications.model';

export const ACTION_TYPES = {
  FETCH_NOTIFICATIONS_LIST: 'notifications/FETCH_NOTIFICATIONS_LIST',
  FETCH_NOTIFICATIONS: 'notifications/FETCH_NOTIFICATIONS',
  CREATE_NOTIFICATIONS: 'notifications/CREATE_NOTIFICATIONS',
  UPDATE_NOTIFICATIONS: 'notifications/UPDATE_NOTIFICATIONS',
  DELETE_NOTIFICATIONS: 'notifications/DELETE_NOTIFICATIONS',
  SET_BLOB: 'notifications/SET_BLOB',
  RESET: 'notifications/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INotifications>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NotificationsState = Readonly<typeof initialState>;

// Reducer

export default (state: NotificationsState = initialState, action): NotificationsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICATIONS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICATIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTIFICATIONS):
    case REQUEST(ACTION_TYPES.UPDATE_NOTIFICATIONS):
    case REQUEST(ACTION_TYPES.DELETE_NOTIFICATIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICATIONS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICATIONS):
    case FAILURE(ACTION_TYPES.CREATE_NOTIFICATIONS):
    case FAILURE(ACTION_TYPES.UPDATE_NOTIFICATIONS):
    case FAILURE(ACTION_TYPES.DELETE_NOTIFICATIONS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICATIONS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICATIONS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTIFICATIONS):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTIFICATIONS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTIFICATIONS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/notifications';

// Actions

export const getEntities: ICrudGetAllAction<INotifications> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTIFICATIONS_LIST,
  payload: axios.get<INotifications>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INotifications> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFICATIONS,
    payload: axios.get<INotifications>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INotifications> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTIFICATIONS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INotifications> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTIFICATIONS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INotifications> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTIFICATIONS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
