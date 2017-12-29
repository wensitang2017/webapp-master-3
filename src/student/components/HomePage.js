import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'reactstrap';

export default class HomePage extends React.Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }


  render() {
    const { isAuthenticated } = this.props.auth;
    
    return (
      <div>
      {
        !isAuthenticated() && (
            <Button
                className="btn-margin"
                onClick={this.login.bind(this)}
            >
              Login
            </Button>
        )
      }
      {
        isAuthenticated() && (
            <Button
                className="btn-margin"
                onClick={this.logout.bind(this)}
            >
              Log Out
            </Button>
        )
      }
      </div>
    )
  }

}