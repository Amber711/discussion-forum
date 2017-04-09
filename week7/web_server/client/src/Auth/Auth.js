/**
 * Created by Amber on 4/9/17.
 */
class Auth {

    /**
     * Authenticate a user. Save a token in local Storage
     * @param token
     * @param email
     */
    static authenticateUser(token, email) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    }

    /**
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * to deauthenticate a user by removing token and email from local storage.
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    /**
     *
     * get a token value
     * @returns {string}
     */

    static getToken() {
        return localStorage.getItem('token')
    }

    static getEmail() {
        return localStorage.getItem('email');
    }
}
export default Auth;