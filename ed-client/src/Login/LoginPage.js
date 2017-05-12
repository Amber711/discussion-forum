/**
 * Created by Amber on 5/9/17.
 */
import React from "react";
import PropTypes from 'prop-types'
import LoginForm from './LoginForm';
import Auth from '../Auth/Auth'

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();
       /* const email = this.state.user.email;
        const password = this.state.user.password;

        console.log('email:', email);
        console.log('password:', password);

        fetch('http://localhost:3000/login', {
            method: 'POST',
            cache: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                email: this.state.user.email,
                password: this.state.user.password
            })
        }).then(response => {
            if(response.status === 200) {
                response.json().then(function(json) {
                    this.context.router.replace('/courses')
                }.bind(this))
            } else {
                console.log("login failed")

            }
        })*/
       Auth.authenticateUser(this.state.user.email)
       this.context.router.replace('/home')
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        })
    }

    render() {
         return (
             <LoginForm onSubmit={this.processForm} onChange={this.changeUser} user={this.state.user} />
         )
    }
}

LoginPage.contextTypes = {
    router:PropTypes.object.isRequired
};

export default LoginPage;