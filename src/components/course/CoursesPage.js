import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import * as courseActions from "../../actions/courseActions";
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component{

  constructor(props,context){
    super(props,context);
    this.state =
    {
    course: {title: " "}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event){
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave(){
    this.props.actions.createCourse(this.state.course);
  }

  courseRow(course,index)
  {
    return <div key={index}>{course.title}</div>;
  }

  render () {
    return (
      <div>
        <h1>
          Courses
        </h1>
        <h3>{this.props.courses.map(this.courseRow)}</h3>
        <h2>Add Course</h2>
        <input
        type="text"
        onChange={this.onTitleChange}
        value={this.state.course.title}/>

        <input
        type="submit"
        onClick={this.onClickSave}
        value="Save"/>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions,dispatch) //course => dispatch(courseActions.createCourse(course))
  };
}

function mapStateToProps(state, ownProps)
{
  return {
    courses: state.courses //like in rootReducer
  };
}

CoursesPage.propTypes =
{
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
