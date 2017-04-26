/**
 * Created by Amber on 4/9/17.
 */
import React from 'react';
import PropTypes from 'prop-types'

import SignUpForm from './SignUpForm';


class SignUpPage extends React.Component {

    constructor(props, context){
        //包含构造函数的派生类必须调用super()，它会执行基类的构造方法。

        super(props, context);
        this.state = {
            errors: {},
            user: {
                email: '',
                password: '',
                confirm_password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    };


    //invoked when form is submitted
    processForm(event) {
        event.preventDefault();
        const email = this.state.user.email;
        const password = this.state.password;
        const confirm_password = this.state.confirm_password;

        console.log('Sign up email:', email);
        console.dir('Sign up password & confirm_password:', password, confirm_password);
        if(password !== confirm_password ) {
            return;
        }

        fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            cache: false,
            headers: {
                'Accept': 'application',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.user.email,
                password: this.state.user.password
            })
            }).then(response => {
                if(response.status === 200) {
                    this.setState({
                        errors: {}
                    });


                    //实现： 直接帮用户登录并且跳转至首页
                    this.context.router.replace('/login');
                } else {
                    response.json().then(function (json) {
                        console.log('signup errors, response json:', json);
                        const errors = json.errors ? json.errors : {};
                        errors.summary = errors.message;
                        console.log('errors in signup page', this.state.errors);
                        this.setState({errors});
                    }.bind(this));
                }
            })
    }

    changeUser(event) {
        //collect user input
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        //set user input to the state
        this.setState({
            user
        });

        //check user input in the state
        if(this.state.user.password !== this.state.confirm_password) {
            const errors = this.state.errors;
            errors.password = "Password and Confirm Password don't match.";
            this.setState({errors});
        } else {
            const errors = this.state.errors;
            errors.password = '';
            this.setState({errors});
        }
    }

    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
            )

    }
}

// to make react-router work
SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;