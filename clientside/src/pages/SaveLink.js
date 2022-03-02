import axios from "axios";
import React, { Component } from "react";
import { Container, Row, Col, span } from "react-bootstrap";
import { domainClient } from "../config.json";

class SaveLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const linkId = window.localStorage.getItem("link");
    // if (linkId) {
    //   axios
    //     .get("http://" + domainClient + "/auth/save-link/" + linkId)
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    window.location.href =
      "http://" + domainClient + "/auth/save-link/" + linkId;
  }

  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Col>
              <span>Success login. Thank you!</span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SaveLink;
