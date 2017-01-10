import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusAction';

export const loadAuthorsSuccess = authors => {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
};
export const loadAuthors = () => {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw (error);
    });
  };
};
