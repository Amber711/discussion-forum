/**
 * Created by Amber on 5/9/17.
 */
import React from 'react';
import PropTypes from "prop-types"

import './LoginForm.css'

const LoginForm = ({
    onSubmit,
    onChange,
    user
}) => (
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-md-offset-3">

                <div className="at-form">

                    <div className="at-title">
                        <h3>Sign In</h3>
                    </div>


                    <div className="at-oauth">

                        <button className="btn at-social-btn" id="at-facebook" name="facebook">
                            <i className="fa fa-facebook"></i> Sign In with Facebook
                        </button>

                        <button className="btn at-social-btn" id="at-google" name="google">
                            <i className="fa fa-google"></i> Sign In with Google
                        </button>

                    </div>


                    <div className="at-sep">
                        <strong>OR</strong>
                    </div>





                    <div className="at-pwd-form">
                        <form id="at-pwd-form" action="/" onSubmit={onSubmit}>
                            <fieldset>






                                <div className="at-input form-group has-feedback">
                                    <label className="control-label">
                                        Username or email
                                    </label>
                                    <input type="text" className="form-control" id="email" name="email" placeholder="Username or email" onChange={onChange}/>

                                        <span className="help-block hide"></span>
                                </div>








                                <div className="at-input form-group has-feedback">
                                    <label className="control-label">
                                        Password
                                    </label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} />

                                        <span className="help-block hide"></span>
                                </div>





                                <div className="at-pwd-link">
                                    <p>

                                        <a href="/forgot-password" id="at-forgotPwd" className="at-link at-pwd">Forgot your password?</a>

                                    </p>
                                </div>

                                <button type="submit" className="at-btn submit btn btn-lg btn-block btn-default" id="at-btn">
                                    Sign In
                                </button>
                            </fieldset>
                        </form>
                    </div>




                    <div className="at-signup-link">
                        <p>
                            Don't have an account?
                            <a href="/sign-up" id="at-signUp" className="at-link at-signup">Register</a>

                        </p>
                    </div>


                    <div className="at-resend-verification-email-link at-wrap">
                        <p>
                            Verification email lost?
                            <a href="/send-again" id="at-resend-verification-email" className="at-link at-resend-verification-email">Send again</a>

                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LoginForm