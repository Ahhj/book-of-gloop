import React, { Component } from "react";

export default class Page extends Component {
  render() {
    return (<div className="Page">
      <h1> {this.props.name} </h1>
      { this.props.content }
    </div>);
  }
}
