import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from "./Auth/Auth";
import HomeCourses from "./Home/HomeCourses"
import LoginPage from "./Login/LoginPage"

class App extends Component {
  render() {
    return (
        <div>
            { Auth.isUserAuthenticated() ? <HomeCourses /> : <LoginPage /> }
        </div>
    )
  }
}

export default App;
