/**
 * Created by Amber on 5/9/17.
 */


class Auth {

    static isUserAuthenticated() {

        return localStorage.getItem('email') == null;
    }

    static authenticateUser(email) {
        localStorage.setItem('email', email)
    }
    static getEmail() {
        return localStorage.getItem('email')
    }
    static deauthenticateUser() {
    localStorage.removeItem('email')
}
}


export default Auth