import React, { PropTypes } from 'react';

import Auth from '../Auth/Auth';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {

    constructor(props, context) {
        //you pass props to the super() only when you need to use it inside the constructor.
        super(props, context);
       //set the initial component state  initialize user object
        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    };
    //submit form
    processForm(event) {
        event.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;

        console.log('submit, email:' , email);
        console.log('submit, password:' , password);

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            cache: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.user.email,
                password: this.state.user.password
            })
        }).then(response => {
            if(response.status == 200) {
                //if get the response successfully, clear the errors object.
                this.setState({
                    errors: {}
                });

                response.json().then(function(json) {
                    console.log('submit the login form & receive the token:',json);
                    Auth.authenticateUser(json.token.email);
                    this.context.router.replace('/');
                }.bind(this));
            } else {
                console.log('Login failed');
                response.json().then(function (json) {
                    console.log('login failed, reponsed json:', json);
                    const errors = json.errors ? json.errors : {};
                    errors.summary = json.message;
                    this.setState({errors});
                }.bind(this));
            }
        });
    }

    //onChange
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user; //changeUser() is for LoginForm.js to use. but state is LoginPage.js
        user[field] = event.target.value;

        this.setState({
            user
        })
    }

    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors = {this.state.errors}
                user={this.state.user}
            />
        )
    }
}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginPage;