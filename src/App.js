import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <Home></Home>
      </div>
    );
  }
}

export default App;
