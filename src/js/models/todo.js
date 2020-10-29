import uniqid from "uniqid";
import { elements } from "../views/base";

export default class Todo {
  constructor() {
    this.todo = [];
  }

  addTodo(description) {
    const todos = { description, id: uniqid(), checked: false };
    this.todo.push(todos);

    this.persistData();

    return todos;
  }

  deleteTodo(id) {
    const index = this.todo.findIndex((el) => el.id === id);
    this.todo.splice(index, 1);

    this.persistData();
  }

  todoChecked(id) {
    this.todo.forEach((el) => {
      if (el.id === id) {
        if (el.checked === false) {
          el.checked = true;
        } else {
          el.checked = false;
        }
      }
    });

    this.persistData();
  }

  persistData() {
    localStorage.setItem("todos", JSON.stringify(this.todo));
  }

  getData() {
    const todos = localStorage.getItem("todos");
    if (todos) this.todo = JSON.parse(todos);
  }
}
