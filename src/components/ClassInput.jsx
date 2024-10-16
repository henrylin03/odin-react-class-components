/* eslint-disable react/prop-types */
import { Component } from "react";
import Count from "./Count";

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
    const selectedTodoId = e.target.dataset.todo;
    const todosWithoutSelectedTodo = this.state.todos.filter(
      (todo) => todo.id !== selectedTodoId
    );

    this.setState((state) => ({
      ...state,
      todos: todosWithoutSelectedTodo,
      count: todosWithoutSelectedTodo.length,
    }));
  }

  render() {
    const todos = this.state.todos.map((todo) => (
      <li key={todo.id}>
        {todo.text}
        <button type="button" data-todo={todo.id} onClick={this.handleDelete}>
          Delete
        </button>
      </li>
    ));

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
        <ul>{todos}</ul>

        <Count count={this.state.count} />
      </section>
    );
  }
}

export default ClassInput;
