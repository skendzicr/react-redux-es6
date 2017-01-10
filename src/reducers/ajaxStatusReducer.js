import * as types from '../actions/actionTypes';
import initialState from './initialState';

const actionSuccess = type => type.substring(type.length - 8) === '_SUCCESS';

const ajaxStatusReducer = (state = initialState.ajaxCalls, action) => {
    if (action.type === types.BEGIN_AJAX_CALL) {
        return state + 1;
    } else if (actionSuccess(action.type) || action.type === types.AJAX_CALL_ERROR) {
        return state - 1;
    } else {
        return state;
    }
};

export default ajaxStatusReducer;