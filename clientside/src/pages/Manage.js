import axios from "axios";
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  thead,
  tbody,
  tr,
  th,
  td,
} from "react-bootstrap";
import NavBarComponent from "../Navbar";
// import { Alert } from "@material-ui/lab";
import { domain, redirectUrl } from "../config.json";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
  }
  componentDidMount() {
    axios
      .get("/manage/links")
      .then((res) => {
        if (res.data) {
          this.setState({
            links: res.data.data,
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

  createLink(event) {
    axios
      .post("/manage/links")
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLink(linkId) {
    axios
      .delete("/manage/links/" + linkId)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showLink(linkId) {
    window.location.href = "/manage/links/" + linkId;
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
              {/* <Form> */}
              <Form.Group className="mb-12" controlId="formBasicEmail">
                <Form.Text className="text-muted">
                  Click for create new link
                </Form.Text>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  onClick={this.createLink}
                >
                  Create Link
                </Button>
              </Form.Group>
              {/* </Form> */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Link</th>
                    <th>Statistic</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.links.map((link, index) => {
                    return (
                      <tr>
                        <td>{String(index + 1)}</td>
                        <td>{domain + "/l/" + link.code}</td>
                        <td>
                          <Button
                            variant="primary"
                            type="submit"
                            size="lg"
                            onClick={(event) => {
                              this.showLink(link._id, event);
                            }}
                          >
                            Users list
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            type="submit"
                            size="lg"
                            onClick={(event) => {
                              this.deleteLink(link._id, event);
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

export default Manage;
