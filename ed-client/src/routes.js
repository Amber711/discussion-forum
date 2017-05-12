/**
 * Created by Amber on 5/9/17.
 */
import LoginPage from './Login/LoginPage';
import Nav from './Nav/Nav'
import HomeCourses from './Home/HomeCourses'
import Auth from './Auth/Auth'
import CourseList from './ProfileCourses/CourseList'
import LecturePage from './Lecture/LecturePage'

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
            path: '/profile',
            component: CourseList
        },
        {
            path: '/lecture',
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

export default routes;