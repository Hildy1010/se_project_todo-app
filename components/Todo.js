class Todo {
    constructor (data, selector) {
        this.data = data;
        this.selector = selector;
    };

    _setEventListeners() {

    };

    getView(){
        const template = document.querySelector("#todo-template").cloneNode(true);
    };
};