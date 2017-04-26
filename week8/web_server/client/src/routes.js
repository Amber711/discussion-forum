/**
 * Created by Amber on 4/10/17.
 */
import Base from './Base/Base';
import App from './App/App';
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';
import Auth from './Auth/Auth'

const routes = {

    // base component (wrapper for the whole application).
    component: Base,
    //childRoutes indicates what to display for {children} in Base component.
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                if(Auth.isUserAuthenticated()) {
                    callback(null, App);
                } else {
                    callback(null, LoginPage)
                }
            }
        },

        {
            path: '/login',
            component: LoginPage
        },

        {
            path: '/signup',
            component: SignUpPage
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
