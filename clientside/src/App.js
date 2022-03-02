import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./chunks/notFound";
import axios from "axios";
import Manage from "./pages/Manage";
import Clients from "./pages/Clients";
import Link from "./pages/Link";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import SaveLink from "./pages/SaveLink";

import { authUrl } from "./config.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      login: false,
      username: "Your beautiful nickname",
    };
  }
  handleClick() {
    // if user is logged in
    if (this.state.login) {
      // show the logout button
      axios
        .get("/auth/logout")
        .then((res) => {
          this.setState({
            login: false,
            username: "Your beautiful nickname",
          });
          this.forceUpdate();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location.href = authUrl;
    }
  }

  // GETTING THE USER DATA
  componentDidMount() {
    // Please check REACT component lifecycle to understand this, whenever component mounts itself, this method will be called
    axios
      .get("/auth/getUserData")
      .then((res) => {
        console.log("res" + res.data.login);
        if (res.data.login) {
          this.setState({
            login: true,
            username: res.data.username,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home
                username={this.state.username}
                login={this.state.login}
                handleClick={this.handleClick}
              />
            </Route>
            <Route exact path="/manage/">
              <Manage username={this.state.username} login={this.state.login} />
            </Route>
            <Route exact path="/manage/links/:id">
              <Clients
                username={this.state.username}
                login={this.state.login}
              />
            </Route>
            <Route exact path="/save-link/">
              <SaveLink />
            </Route>
            <Route exact path="/success/">
              <Success />
            </Route>
            <Route exact path="/failure/">
              <Failure />
            </Route>
            <Route exact path="/l/:link">
              <Link />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
