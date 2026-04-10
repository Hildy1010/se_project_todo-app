class Todo {
  constructor(data, selector, callbacks) {
    this._data = data;
    this._selector = selector;
    this._callbacks = callbacks;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._callbacks.handleDelete(this._data.completed);
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._callbacks.handleCheck(this._data.completed);
    });
  }

  getView() {
    const template = document.querySelector(this._selector);
    this._todoElement = template.content.querySelector(".todo").cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
