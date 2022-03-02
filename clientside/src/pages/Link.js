import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container } from "react-bootstrap";
import NavBarComponent from "../Navbar";
// import { Alert } from "@material-ui/lab";
import { clientAuthUrl, clientRedirectUri } from "../config.json";

class Link extends Component {
  link = "";

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.link = this.props.match.params.link;
    this.saveToLocaleStorage(this.link);

    window.location.href = clientAuthUrl;
  }

  saveToLocaleStorage(link) {
    window.localStorage.setItem("link", link);
  }

  render() {
    return (
      <div className="App">
        <Container fluid>Redirect...</Container>
      </div>
    );
  }
}

export default withRouter(Link);
