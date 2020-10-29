/**
 * GLOBAL APP CONTROLLER
 */

//Importing the files
import { elements } from "./views/base";
import Weather from "./models/weather";
import Todo from "./models/todo";
import * as weatherView from "./views/weatherView";
import * as todoView from "./views/todoView";
import * as generalView from "./views/generalView";

//global app state
const state = {};

//function for toggling the settings div and todo div
const toggleSettingsDiv = () => {
  elements.settingsIcon.addEventListener("click", () => {
    elements.settingsDiv.classList.toggle("display__div");
  });
};

toggleSettingsDiv();

const toggleTodoDiv = () => {
  elements.todoBtn.addEventListener("click", () => {
    elements.todoDiv.classList.toggle("display__div");
  });
};

toggleTodoDiv();

//adding event listener on windows load
window.addEventListener("load", async () => {
  // SETTING THE WEATHER ON THE WINDOWS LOAD
  //getting the query from the local storage
  const location = localStorage.getItem("location");

  //making a new weather object
  state.weather = new Weather(location);

  //calling the getWeather function
  await state.weather.getWeather();

  //preparing the UI for result
  weatherView.clearWeather();

  //rendering the result
  weatherView.renderWeather(state.weather.result);

  //making a new todo object
  state.todo = new Todo();

  //get the todos from local storage
  state.todo.getData();

  //calling the render todo function for each todo element
  state.todo.todo.forEach((el) => {
    //calling the render todo function
    todoView.renderTodo(el);

    if (el.checked === true) {
      todoView.todoChecked(el.id);
    }
  });

  //setting up the name
  const name = localStorage.getItem("name");
  generalView.displayName(name);

  //setting up the quotes
  try {
    const result = await fetch(`https://type.fit/api/quotes`);
    const data = await result.json();
    console.log(data);

    const random = Math.round(Math.random() * 1500);
    const quote = data[random];
    const markup = `
      <span class="greet__quote--text">
      "${quote.text}"</span>
      <span class="greet__quote--author">- ${quote.author}</span>
    `;
    //console.log(quote);

    elements.quoteDiv.innerHTML = "";
    elements.quoteDiv.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    console.log(error);
  }
});

//setting up the time
setInterval(() => {
  generalView.renderTime();
}, 1000);

//weather controller function
const weatherController = async () => {
  //getting the input query from form
  let query = elements.locationInput.value;
  /*if (query === "") {
    query = "delhi";
  }*/
  console.log(query);

  if (query) {
    //storing the query in local storage
    localStorage.setItem("location", query);

    //creating a new weather object if there is a query
    state.weather = new Weather(query);

    //calling the getWeather function
    await state.weather.getWeather();

    //preparing the UI for result
    weatherView.clearWeather();

    //rendering the result
    weatherView.renderWeather(state.weather.result);

    //clear the input field
    weatherView.clearInput();
  }
};

//adding event listener for submitting the location form
elements.locationForm.addEventListener("submit", () => {
  weatherController();
});

//todo function controller
const todo = () => {
  //getting the input from the todo form
  const description = elements.todoInput.value;
  console.log(description);
  //creating a new todo object if there is a description
  if (description !== "") {
    if (!state.todo) state.todo = new Todo();

    //adding the todo
    const todo = state.todo.addTodo(description);

    //render the todo
    console.log(state.todo.todo);
    todoView.renderTodo(todo);

    //clear the input field
    todoView.clearInput();
  }
};

//adding the event listener for submitting the todo form
elements.todoForm.addEventListener("submit", () => {
  console.log("todo form has been submitted");
  todo();
});

//event listener for deleting the todo
elements.todoList.addEventListener("click", (e) => {
  if (e.target.matches(".fa-times")) {
    console.log("todo is deleted");
    var el = e.target.parentNode.id;
    //console.log(el);

    //deleting the todo from object
    state.todo.deleteTodo(el);

    //deleting the todo from the UI
    todoView.deleteTodo(el);
    //console.log(state.todo.todo);
  } else if (e.target.matches(".fa-check")) {
    var el = e.target.parentNode.id;
    console.log(el);
    state.todo.todoChecked(el);
    todoView.todoChecked(el);
    console.log(state.todo.todo);
  }
});

//event listener for  submitting name forms
elements.nameForm.addEventListener("submit", () => {
  const name = elements.nameInput.value;
  //setting up the name in local storage
  localStorage.setItem("name", name);

  //displaying the name
  generalView.displayName(name);

  //clear the input field
  generalView.clearNameInput();
});

//toggling the dark mode
var checkbox = document.querySelector("input[name=theme]");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    trans();
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    trans();
    document.documentElement.setAttribute("data-theme", "dark");
  }
});

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};
