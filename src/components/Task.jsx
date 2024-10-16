/* eslint-disable react/prop-types */
import { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      inputVal: this.props.todo.text,
    };

    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleResubmitButtonClick = this.handleResubmitButtonClick.bind(this);
  }

  handleEditButtonClick(e) {
    this.setState((state) => ({ ...state, isEditing: true }));
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleResubmitButtonClick(e) {
    const updatedTaskText = this.state.inputVal;

    this.setState((state) => ({ ...state, isEditing: false }));
    this.props.updateTaskText({
      id: this.props.todo.id,
      text: updatedTaskText,
    });
  }

  render() {
    return (
      <li id={this.props.todo.id}>
        {this.state.isEditing ? (
          <>
            <input
              type="text"
              name="task-reentry"
              value={this.state.inputVal}
              onChange={this.handleInputChange}
            />
            <button type="button" onClick={this.handleResubmitButtonClick}>
              Resubmit
            </button>
          </>
        ) : (
          <>
            {this.props.todo.text}
            <button type="button" onClick={this.handleEditButtonClick}>
              Edit
            </button>
          </>
        )}

        <button type="button" onClick={this.props.handleDelete}>
          Delete
        </button>
      </li>
    );
  }
}

export default Task;
