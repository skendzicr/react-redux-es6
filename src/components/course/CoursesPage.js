import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import * as courseActions from "../../actions/courseActions";
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends React.Component{

  constructor(props,context){
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index)  {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render () {
    const {courses}= this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"  
          className="btn btn-primary"  
          onClick={this.redirectToAddCoursePage}  
          
          />
        <CourseList courses={courses} />
      </div>
    ) ;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch) //course => dispatch(courseActions.createCourse(course))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.courses //like in rootReducer
  };
};

CoursesPage.propTypes =
{
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
