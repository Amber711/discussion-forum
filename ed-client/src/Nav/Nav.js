import React from 'react';
import { Link } from "react-router";
import PropTypes from "prop-types"
import "./Nav.css"
import Auth from '../Auth/Auth'
import BitPic from "../../public/bittiger.png"

const Nav=({ children }) => (
    <div className="homeV1NavbarContainer absolute">
        <div className="menu-container">
            <nav className="navbar megamenu navbar-default">
                <div className="nav-container">
                    <div className="navbar-header pull-left hidden-xs hidden-sm">
                        <a className="navbar-brand" href="/">
                            <img className="logo-bittiger" src={BitPic} alt=""/>
                        </a>
                    </div>


                    <div className="nav pull-right btns-navbar">
                        {Auth.isUserAuthenticated() ?
                            (
                                <div className="navbar-right">
                                    <p  className="navbar-text navbar-right user" >
                                        {Auth.getEmail()}
                                    </p>

                                    <Link to="/logout" type="button" className="btn btn-default navbar-btn" onClick={Auth.deauthenticateUser}>sign out</Link>
                                </div>


                            ):
                            (
                                <div className="btn btn-default btn-lg btn-bit" id="navbarSignUpLoginButton">
                                    <Link to="/login" className="signinBtn">Sign in</Link>&nbsp;/ <Link className="signinBtn" id="registerAccountButton" to="/sign-up">Register</Link>
                                </div>
                            )


                        }
                    </div>

                    <div className="nav pull-right btns-navbar nav-lang-btns">
                        <a className="btn btn-default btn-sm en selected" href="#">EN</a>&nbsp;
                        <a className="lang-seperator">&nbsp;</a>
                        <a className="btn btn-default btn-sm zh" href="#">中</a>
                    </div>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed pull-left">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div id="homeV1-navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">






                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle">LEARN<span className="caret"></span></a>
                            </li>

                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle">RESOURCES<span className="caret"></span></a>
                            </li>


                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle">PARTNERS<span className="caret"></span></a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle">ABOUT<span className="caret"></span></a>

                            </li>
                            {
                                Auth.isUserAuthenticated()?
                                    (
                                        <li className="dropdown">
                                            <Link to="/profile" className="dropdown-toggle">PROFILE<span className="caret"></span></Link>
                                        </li>
                                    ):(
                                        ''
                                )
                            }
                        </ul>

                    </div>
                </div>
            </nav>
            <br />
            {children}
        </div>

    </div>
);

Nav.propTypes = {
    children: PropTypes.object.isRequired
};
export default Nav