# Simple Todo App

A lightweight, browser-based todo application built with vanilla JavaScript using Object-Oriented Programming (OOP) principles and ES6 modules. Users can create, complete, and delete todo items through a clean, responsive interface.

---

## Features

- **View pre-loaded todos** — a set of hard-coded todos is rendered on page load
- **Add new todos** — open a modal form to create a todo with a name and optional due date
- **Mark todos complete** — toggle a checkbox on any todo card to mark it as done
- **Delete todos** — remove any todo card with the delete button
- **Form validation** — real-time inline validation prevents submitting an empty or too-short todo name
- **Form reset on submit** — after a todo is successfully created, the form fields and validation state are cleared for the next use

---

## File Structure

```
se_project_todo-app/
├── components/
│   ├── Todo.js           # Todo class — creates and manages individual todo elements
│   └── FormValidator.js  # FormValidator class — handles form validation logic
├── pages/
│   ├── index.js          # Main application entry point
│   └── index.css         # Main stylesheet (imports block stylesheets)
├── utils/
│   └── constants.js      # Shared data: initialTodos array and validationConfig object
├── blocks/               # BEM block stylesheets
│   ├── button.css
│   ├── counter.css
│   ├── form.css
│   ├── header.css
│   ├── page.css
│   ├── popup.css
│   ├── todo.css
│   └── todos.css
├── vendor/
│   ├── fonts.css         # Font-face declarations
│   └── normalize.css     # CSS reset
└── index.html            # Application markup and todo template
```

---

## File Descriptions

### `index.html`

The application's single HTML page. Key elements include:

- **Header** — displays the app title and the `+ Add Todo` button
- **Popup modal** — a hidden form (`#add-todo-popup`) for creating new todos, containing a required name field (2–40 characters) and an optional date field
- **Todo list** — a `<ul class="todos__list">` where todo cards are injected at runtime
- **`<template id="todo-template">`** — an HTML template element that defines the markup for a single todo card; cloned by the `Todo` class for each item

The `<script>` tag for `index.js` uses `type="module"` to enable ES6 module imports.

---

### `utils/constants.js`

Exports two shared objects used throughout the app:

**`initialTodos`** — an array of pre-loaded todo objects rendered on page load. Each object has the shape:

```js
{
  id: "uuid-string",
  name: "Todo name",
  completed: true | false,
  date: new Date()
}
```

**`validationConfig`** — a configuration object consumed by `FormValidator`. It centralizes all CSS selectors and class names used during validation:

```js
{
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "button_disabled"
}
```

---

### `components/Todo.js`

The `Todo` class is responsible for creating a fully functional todo card element from the HTML template.

**Constructor**

```js
new Todo(data, selector)
```

| Parameter  | Type   | Description                                            |
|------------|--------|--------------------------------------------------------|
| `data`     | Object | A todo data object (`id`, `name`, `completed`, `date`) |
| `selector` | String | CSS selector for the `<template>` element (e.g. `"#todo-template"`) |

**Public method: `getView()`**

Clones the template, populates it with the todo's data, attaches event listeners, and returns the finished `<li>` element ready to be appended to the DOM.

- Sets the todo name as text content
- Sets the checkbox `checked` state based on `data.completed`
- Assigns unique `id` and `for` attributes to the checkbox and label using the todo's `id`
- If a valid date is provided, formats and displays it as `Due: Mon DD, YYYY`

**Private method: `_setEventListeners()`**

Attaches two event listeners to the rendered element:

- **Delete button (`click`)** — removes the todo card from the DOM
- **Checkbox (`change`)** — updates `data.completed` to reflect the checkbox state

---

### `components/FormValidator.js`

The `FormValidator` class handles all validation behavior for a given form element.

**Constructor**

```js
new FormValidator(settings, formElement)
```

| Parameter     | Type        | Description                                       |
|---------------|-------------|---------------------------------------------------|
| `settings`    | Object      | The `validationConfig` object from `constants.js` |
| `formElement` | HTMLElement | The form DOM element to validate                  |

**Public method: `enableValidation()`**

Initializes validation on the form. Finds all inputs and the submit button, sets the initial button state, and attaches `input` event listeners to each field for real-time validation feedback.

**Public method: `resetValidation()`**

Resets the form to its default post-submit state:

- Clears all input field values
- Hides all inline error messages
- Disables the submit button

Called in `index.js` after a todo is successfully submitted.

**Private methods**

| Method                       | Description                                                             |
|------------------------------|-------------------------------------------------------------------------|
| `_checkInputValidity(input)` | Checks a single input against the browser's constraint API; shows or hides its error |
| `_showInputError(input)`     | Adds error class to the input and displays the validation message       |
| `_hideInputError(input)`     | Removes error class and clears the error message                        |
| `_hasInvalidInput()`         | Returns `true` if any input in the form is currently invalid            |
| `_toggleButtonState()`       | Enables or disables the submit button based on form validity            |
| `_addInputEventListeners()`  | Queries all inputs and the submit button; sets up `input` listeners     |

---

### `pages/index.js`

The main entry point that wires all components together.

**Imports**

```js
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
```

The `uuidv4` function is imported from the [uuid](https://github.com/uuidjs/uuid) package via the jspm CDN. It generates a unique ID for each new todo created through the form.

**Key logic**

| Function / handler       | Description                                                                        |
|--------------------------|------------------------------------------------------------------------------------|
| `openModal(modal)`       | Adds `popup_visible` class to show the popup                                       |
| `closeModal(modal)`      | Removes `popup_visible` class to hide the popup                                    |
| `generateTodo(data)`     | Instantiates a `Todo` and returns its rendered element via `getView()`             |
| Add button `click`       | Opens the add-todo popup                                                           |
| Close button `click`     | Closes the popup without resetting the form (preserves any in-progress input)      |
| Form `submit`            | Reads form values, creates a new todo with a `uuidv4()` ID, appends it to the list, closes the modal, and resets the form |
| `formValidator`          | A `FormValidator` instance created with `validationConfig` and the add-todo form   |
| `initialTodos.forEach`   | Renders each pre-loaded todo on page load                                          |

---

## Technology

- **HTML5** — template element, constraint validation API
- **CSS3** — BEM methodology for scoped, maintainable styles
- **Vanilla JavaScript** — ES6 classes, modules, arrow functions
- **[uuid](https://github.com/uuidjs/uuid)** via jspm CDN — generates unique IDs for new todo items

---

## How to Run

This project uses ES6 modules, which require a local server — opening `index.html` directly in a browser will not work due to CORS restrictions on module imports.

The recommended approach is the **Live Server** extension for VS Code:

1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Open the project folder in VS Code
3. Right-click `index.html` and select **Open with Live Server**

The app will open at `http://127.0.0.1:5500` (or similar) and will hot-reload on file changes.

---

## Deployment

This project is deployed on GitHub Pages:

- ADD LINK HERE
