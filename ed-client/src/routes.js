/**
 * Created by Amber on 5/9/17.
 */
import LoginPage from './Login/LoginPage';
import Nav from './Nav/Nav'
import HomeCourses from './Home/HomeCourses'
import Auth from './Auth/Auth'
import CourseList from './ProfileCourses/CourseList'
import LecturePage from './Lecture/LecturePage';
import App from 'App'

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
    <Router path="/" component={App}>

    </Router>
)
