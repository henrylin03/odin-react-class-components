/* eslint-disable react/prop-types */
import { Component } from "react";
import Count from "./Count";
import Task from "./Task";

const DEMO_TASKS = [
  { id: "demo1", text: "Just some demo tasks" },
  { id: "demo2", text: "As an example" },
];

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: DEMO_TASKS,
      inputVal: "",
      count: DEMO_TASKS.length,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateTaskText = this.updateTaskText.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    const newTaskId = crypto.randomUUID();
    this.setState((state) => ({
      todos: state.todos.concat({ id: newTaskId, text: state.inputVal }),
      inputVal: "",
      count: state.count + 1,
    }));
  }

  handleDelete(e) {
    const selectedTodoId = e.target.parentNode.id;
    const todosWithoutSelectedTodo = this.state.todos.filter(
      (todo) => todo.id !== selectedTodoId
    );

    this.setState((state) => ({
      ...state,
      todos: todosWithoutSelectedTodo,
      count: todosWithoutSelectedTodo.length,
    }));
  }

  updateTaskText(taskObject) {
    const updatedTasks = this.state.todos.map((todo) =>
      todo.id === taskObject.id ? taskObject : todo
    );
    this.setState((state) => ({
      ...state,
      todos: updatedTasks,
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>

        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>

        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <Task
              key={todo.id}
              todo={todo}
              handleDelete={this.handleDelete}
              updateTaskText={this.updateTaskText}
            />
          ))}
        </ul>

        <Count count={this.state.count} />
      </section>
    );
  }
}

export default ClassInput;
