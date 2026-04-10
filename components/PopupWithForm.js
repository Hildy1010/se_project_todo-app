import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
    }

    _getInputValues() {
        const inputs = this._form.querySelectorAll("input");
        const values = {};
        inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListeners() {
        this._form.addEventListener("submit", (evt) => {
           evt.preventDefault();
           this._handleFormSubmit(this._getInputValues()); 
        });
        super.setEventListeners();
    }

}

export default PopupWithForm;