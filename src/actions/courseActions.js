import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export const loadCoursesSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
};
export const createCoursesSuccess = course => {
  return { type: types.CREATE_COURSES_SUCCESS, course };
};
export const updateCoursesSuccess = course => {
  return { type: types.UPDATE_COURSES_SUCCESS, course };
};

export const loadCourses = () => {
  return dispatch => {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw (error);
    });
  };
};

export const saveCourse = course => {
  return (dispatch, getState) => {
    return courseApi.saveCourse(course)
      .then(savedCourse => {
        course.id ? dispatch(updateCoursesSuccess(savedCourse)) :
          dispatch(createCoursesSuccess(savedCourse));
      }).catch(error => {
        throw (error);
      });
  };
};
