import expect from 'expect';
import * as actions from '../actions/courseActions';
import courseReducer from './courseReducer';

describe('Course Reducer', () => {
    
        it('should add course when CREATE_COURSE_SUCCESS action is passed', () => {
            const initialState = [
                {title:'A'},
                {title:'B'}
            ] ;
            const newCourse = {
                title: 'C'
            };
            const action = actions.createCoursesSuccess(newCourse);
            const newState = courseReducer(initialState, action);
            
            expect(newState.length).toEqual(3);
            expect(newState[0].title).toEqual('A');
            expect(newState[1].title).toEqual('B');
            expect(newState[2].title).toEqual('C');
        });
    
        it('should update course when UPDATE_COURSE_SUCCESS action is passed', () => {
            const initialState = [
                {id:'A', title: 'A' },
                {id:'B', title: 'B' },
                {id:'C', title: 'C'}
            ] ;
            const course = { id: 'B', title: 'New Title' };
            const action = actions.updateCoursesSuccess(course);
            const newState = courseReducer(initialState, action);
            const updatedCourse = newState.find(updated => updated.id === course.id);
            const untouchedCourse = newState.find(untouched => untouched.id === 'A');
            
            expect(newState.length).toEqual(3);
            expect(updatedCourse.title).toEqual('New Title');
            expect(untouchedCourse.title).toEqual('A');
        });
});