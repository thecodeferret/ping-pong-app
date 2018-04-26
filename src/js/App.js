import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import '../css/App.css';
import Routes from "./Routes";
import { Cookies } from 'react-cookie';

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthenticated: false,
        isAuthenticating: true
      };
    }

    async componentDidMount() {
      try {
        const cookies = new Cookies();

        if (cookies.get('pingPongJWT') !== 'undefined' && cookies.get('pingPongJWT') !== 'null' && cookies.get('pingPongJWT') !== undefined) {
          this.userHasAuthenticated(true);
        }else{
          this.userHasAuthenticated(false);
        }
      }
      catch(e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }

      this.setState({ isAuthenticating: false });
    }

    userHasAuthenticated = authenticated => {
      this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = event => {
      const cookies = new Cookies();

      cookies.set('pingPongJWT', null);
      this.userHasAuthenticated(false);
    }

    render() {
        const childProps = {
          isAuthenticated: this.state.isAuthenticated,
          userHasAuthenticated: this.userHasAuthenticated
        };
    return (
        !this.state.isAuthenticating &&
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"> <i className="fas fa-table-tennis"></i> Ping Pong</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.state.isAuthenticated
                        ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                        : <Fragment>
                            <LinkContainer to="/">
                                <NavItem>Register</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        </Fragment>
                        }
                </Nav>
                </Navbar.Collapse>
            </Navbar>

        <Routes childProps={childProps} />
        </div>
        );
        }
    }

export default App;