import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import { LoginButton, LogoutButton } from "../Button";
import NavbarComponent from "../Navbar";
function AuthComponent(props) {
  const state = props.login;
  return (
    <>
      {state ? (
        <LogoutButton login={props.login} onClick={props.onClick} />
      ) : (
        <LoginButton login={props.login} onClick={props.onClick} />
      )}
    </>
  );
}
class Home extends Component {
  render() {
    return (
      <div className="App">
        <NavbarComponent
          username={this.props.username}
          isLogin={this.props.login}
        />
        <div className="App-header">
          <AuthComponent
            login={this.props.login}
            onClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default Home;
