/**
 * Created by Amber on 5/9/17.
 */
import LoginPage from './Login/LoginPage';
import Nav from './Nav/Nav'
import Courses from './Courses/Courses'
import Auth from './Auth/Auth'

const routes = {
    component: Nav,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                if(Auth.isUserAuthenticated()){
                    callback(null, LoginPage);
                }else {
                    callback(null, Courses)
                }
            }
        },

        {
            path: 'login',
            component: LoginPage
        },
        {
           path: 'courses',
            component: Courses
        }

    ]
};

export default routes;