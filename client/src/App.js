import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Projects from "./components/Projects";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/projects")
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Sprint Challenge Node Express</h1>
          <Projects projects={this.state.projects} />
        </header>
      </div>
    );
  }
}

export default App;
