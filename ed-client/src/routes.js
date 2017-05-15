/**
 * Created by Amber on 5/9/17.
 */
import Nav from './Nav/Nav'
import React from 'react';
import LoginPage from './Login/LoginPage'
import HomeCourses from './Home/HomeCourses'
import CourseList from './ProfileCourses/CourseList'
import LecturePage from './Lecture/LecturePage';
import LectureVideo from './Lecture/LectureVideo';
import QuestionList from './Lecture/QuestionList'
import App from './App/App'
import { Route, IndexRoute } from 'react-router';



/*
const routes = {
    component: Nav,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                if(Auth.isUserAuthenticated()){
                    callback(null, HomeCourses)
                }else {
                    callback(null, LoginPage);

                }
            }
        },

        {
            path: '/login',
            component: LoginPage
        },
        {
           path: '/home',
            component: HomeCourses
        },
        {
            path: '/profile/:userId',
            component: CourseList
        },
        {
            path: '/lecture/:courseId',
            component: LecturePage
        },
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
                replace('/');
            }
        }

    ]
};

export default routes;*/
export default (
    <Route path="/" component={Nav}>
        <IndexRoute component={App} />
        <Route path="/home" component={HomeCourses} />
        <Route path="/profile/:userId" component={CourseList} />
        <Route path="/lecture/:courseId/:videoId" component={LecturePage}>
                <IndexRoute component={LectureVideo} />
                <Route path="/:courseId/question_list/:videoId" component={QuestionList} />
            </Route>
        <Route path="/logout" component={LoginPage} />


    </Route>
)
