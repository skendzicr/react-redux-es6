import expect from 'expect';
import * as courseActions from '../actions/courseActions';
import * as types from '../actions/actionTypes';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';

describe('Store', () => {
    it('should handle creating courses', () => {
        const store = createStore(rootReducer, initialState);
        const course = {
            title: "Newest course"
        };

        const action = courseActions.createCoursesSuccess(course);
        store.dispatch(action);

        const actual = store.getState().courses[0];
        const expected = {
            title: "Newest course"
        };

        expect(actual).toEqual(expected);
    });
});