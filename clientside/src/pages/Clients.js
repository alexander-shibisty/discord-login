import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  thead,
  tbody,
  tr,
  th,
  td,
  br,
  span,
} from "react-bootstrap";
import NavBarComponent from "../Navbar";
// import { Alert } from "@material-ui/lab";
import { domain, redirectUrl } from "../config.json";

class Clients extends Component {
  id = null;

  constructor(props) {
    super(props);
    this.state = {
      // links: [],
      clients: [],
    };
  }
  componentDidMount() {
    this.id = this.props.match.params.id;

    axios
      .get("/manage/clients/" + this.id)
      .then((res) => {
        if (res.data) {
          this.setState({
            clients: res.data.data,
          });
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("/auth/getUserData")
      .then((res) => {
        if (res.data.login) {
          this.setState({
            login: true,
            username: res.data.username,
          });
        } else {
          window.location.href = redirectUrl;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLink(linkId, clientId) {
    axios
      .delete("/manage/clients/" + linkId + "/" + clientId)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <NavBarComponent
          username={this.state.username}
          isLogin={this.state.login}
        />
        <Container fluid>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Information</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.clients.map((client, index) => {
                    return (
                      <tr key={client._id}>
                        <td>{String(index + 1)}</td>
                        <td>
                          ID: {client._id}
                          <br />
                          Username: {client.username}
                          <br />
                          E-mail: {client.email}
                          <br />
                          Fetched At: {client.fetchedAt}
                          <br />
                          {client.guilds.map((guild) => {
                            return (
                              <span key={guild._id}>
                                {" "}
                                {guild.id}: {guild.name}: {guild.permissions}
                                <br />
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            type="submit"
                            size="lg"
                            onClick={(event) => {
                              this.deleteLink(this.id, client._id, event);
                            }}
                          >
                            Remove link
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Clients);
