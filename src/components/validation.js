//Валидация профиля
/*const validationConfig = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; */

//Показываем сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(errorElement);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
    console.log(errorElement);

}

//Скрываем сообщение об ошибке
function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

//Проверка валидности 
function checkInputValidity(formElement, inputElement, validationConfig ) {
   if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
   } else {
    inputElement.setCustomValidity("");
   }

    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
      } else {
        hideInputError(formElement, inputElement, validationConfig);
      }
}

//Добавляем слушателей всем полям ввода
function setEventListeners(formElement,validationConfig ) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonElement);
    toggleButtonState(inputList,buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputSelector.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig )
          });
        });
}

//Функция включения валидации
export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          }); 
          setEventListeners(formElement, validationConfig)
          });
    }

//
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

//Функция переключения кнопки "Сохранить"
function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass)
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    }
}

//Функция очистки ошибок валидации
export function clearValidation(formElement, validationConfig) {
   const inputErrorList =  Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   inputErrorList.forEach((inputElement) => {
    hideInputError(formElement, inputElement.validationConfig)
   });
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  formElement.reset();
  toggleButtonState(inputList, buttonElement, validationConfig);
}




