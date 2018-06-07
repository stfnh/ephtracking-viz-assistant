import React, { Component } from "react";
import Title from "../../components/Title";

class BubbleChart extends Component {
  state = {
    title: ''
  };

  handleTitleChange = title => {
    this.setState({ title });
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Bubble chart</h1>
        <hr />
        <h5 className="title is-5">Set parameters</h5>
        <Title onChange={this.handleTitleChange} />
      </div>
    );
  }
}

export default BubbleChart;
