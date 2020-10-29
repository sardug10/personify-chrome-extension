import { elements } from "./base";

export const renderTodo = (todo) => {
  const markup = `
    <li class="todo__item" id = "${todo.id}">
        ${todo.description}
        <i class="fa fa-check todo__icons" aria-hidden="true"></i>
        <i class="fa fa-times todo__icons" aria-hidden="true"></i>
    </li>
    `;

  elements.todoList.insertAdjacentHTML("beforeend", markup);
};

export const deleteTodo = (id) => {
  const el = document.getElementById(id);
  el.parentNode.removeChild(el);
};

export const todoChecked = (id) => {
  const el = document.getElementById(id);
  el.classList.toggle("todo__item--checked");
};

export const clearInput = () => {
  elements.todoInput.value = "";
};
