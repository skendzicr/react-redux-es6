import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';

export const loadAuthorsSuccess = authors => {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
};
export const updateAuthorsSuccess = author => {
  return { type: types.UPDATE_AUTHORS_SUCCESS, author }; 
};
export const createAuthorsSuccess = author => {
  return { type: types.CREATE_AUTHORS_SUCCESS, author }; 
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

export const saveAuthor = author => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return AuthorApi.saveAuthor(author)
      .then(newAuthor => {
        author.id ? dispatch(updateAuthorsSuccess(newAuthor)) :
          dispatch(createAuthorsSuccess(newAuthor));
      }).catch(error => {
        dispatch(ajaxCallError());
        throw (error);
      });
  };
};
