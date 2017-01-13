import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCourse from './components/course/ManageCoursePage';
import ManageAuthor from './components/course/ManageAuthorPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="courses" component={CoursesPage}/>
    <Route path="course" component={ManageCourse}/>
    <Route path="course/:id" component={ManageCourse}/>
    <Route path="author/:id" component={ManageAuthor}/>
    <Route path="author" component={ManageAuthor}/>
    <Route path="about" component={AboutPage}/>
  </Route>
);
