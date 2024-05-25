import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';
import { openPopup, closePopup } from '../components/modal.js';
import { createCardElement, deleteCardElement, likeCard} from '../components/card.js';
import { enableValidation, clearValidation } from '../components/validation.js';

//DOM-узлы
const placeList = document.querySelector('.places__list');

//Выводим карточки на страницу
initialCards.forEach(function (card) {
    placeList.append(createCardElement(card, deleteCardElement, likeCard, openImage));
});

const profileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

  

//Находим форму профиля в DOM
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');

//Находим поля формы профиля в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

//Обработчик отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

//Очистка формы профиля
    formEditProfile.reset();
}

//Обработчик события профиля при нажатии кнопку "Сохранить"
formEditProfile.addEventListener('submit', handleFormSubmit);

//Обработчик события открытия модального окна профиля
profileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);

//Очистка формы профиля
    clearValidation(popupProfile.querySelector(validationConfig.formSelector), validationConfig);
});

const popupNewCard = document.querySelector('.popup_type_new-card');
const cardImage = document.querySelector('.card__image');
const cardTitle = document.querySelector('.card__title');

//Находим форму карточки в DOM
const formNewCard = document.querySelector('.popup__form[name="new-place"]');

//Находим поля формы карточки
const cardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewCard.querySelector('.popup__input_type_url');

//Обработчик события открытия модального окна карточки
addProfileButton.addEventListener('click', () => {
    openPopup(popupNewCard);

    //Очистка формы карточки
    clearValidation(popupNewCard.querySelector(validationConfig.formSelector), validationConfig);
});

//Функция добавления новой карточки
function addNewCard(evt) {
    evt.preventDefault();

    const cardNew = {
        link: cardLinkInput.value,
        name: cardNameInput.value,
    };

//Вставляем новые карточки в DOM
    placeList.prepend(createCardElement(cardNew, deleteCardElement, likeCard, openImage));
    formNewCard.reset();
}

//Обработчик события при добавлении карточки при нажатии кнопки "Сохранить"
formNewCard.addEventListener('submit', addNewCard);

const imageOpen = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

//Отк
function openImage(imgSrc, imgCaption) {
    imageCaption.textContent = imgCaption;
    popupImage.src = imgSrc;
    popupImage.alt = imgCaption;
    openPopup(imageOpen);
}

    closeButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => {
        closePopup(popup) 
    });
});

enableValidation(validationConfig);

