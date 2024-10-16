/* eslint-disable react/prop-types */
import { Component } from "react";

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article>
        <h4>Total tasks: {this.props.count}</h4>
      </article>
    );
  }
}

export default Count;
