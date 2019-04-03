import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMorningSessions, defaultValue } from 'app/shared/model/morning-sessions.model';

export const ACTION_TYPES = {
  FETCH_MORNINGSESSIONS_LIST: 'morningSessions/FETCH_MORNINGSESSIONS_LIST',
  FETCH_MORNINGSESSIONS: 'morningSessions/FETCH_MORNINGSESSIONS',
  CREATE_MORNINGSESSIONS: 'morningSessions/CREATE_MORNINGSESSIONS',
  UPDATE_MORNINGSESSIONS: 'morningSessions/UPDATE_MORNINGSESSIONS',
  DELETE_MORNINGSESSIONS: 'morningSessions/DELETE_MORNINGSESSIONS',
  SET_BLOB: 'morningSessions/SET_BLOB',
  RESET: 'morningSessions/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMorningSessions>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MorningSessionsState = Readonly<typeof initialState>;

// Reducer

export default (state: MorningSessionsState = initialState, action): MorningSessionsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MORNINGSESSIONS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MORNINGSESSIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MORNINGSESSIONS):
    case REQUEST(ACTION_TYPES.UPDATE_MORNINGSESSIONS):
    case REQUEST(ACTION_TYPES.DELETE_MORNINGSESSIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MORNINGSESSIONS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MORNINGSESSIONS):
    case FAILURE(ACTION_TYPES.CREATE_MORNINGSESSIONS):
    case FAILURE(ACTION_TYPES.UPDATE_MORNINGSESSIONS):
    case FAILURE(ACTION_TYPES.DELETE_MORNINGSESSIONS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MORNINGSESSIONS_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MORNINGSESSIONS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MORNINGSESSIONS):
    case SUCCESS(ACTION_TYPES.UPDATE_MORNINGSESSIONS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MORNINGSESSIONS):
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

const apiUrl = 'api/morning-sessions';

// Actions

export const getEntities: ICrudGetAllAction<IMorningSessions> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MORNINGSESSIONS_LIST,
    payload: axios.get<IMorningSessions>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMorningSessions> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MORNINGSESSIONS,
    payload: axios.get<IMorningSessions>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMorningSessions> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MORNINGSESSIONS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMorningSessions> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MORNINGSESSIONS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMorningSessions> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MORNINGSESSIONS,
    payload: axios.delete(requestUrl)
  });
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
