import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleDelete: (completed) => {
      todoCounter.updateTotal(false);
      if (completed) {
        todoCounter.updateCompleted(false);
      }
    },
    handleCheck: (completed) => {
      todoCounter.updateCompleted(completed);
    },
  });
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm("#add-todo-popup", (values) => {
  const name = values.name;
  const dateInput = values.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const todo = { name, date, id: uuidv4() };

  const todoElement = generateTodo(todo);
  section.addItem(todoElement);
  todoCounter.updateTotal(true);

  addTodoPopup.close();
  formValidator.resetValidation();
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const formValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form")
);
formValidator.enableValidation();
