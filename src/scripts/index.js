import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';
import { openPopup, closePopup, closePopupEsc } from '../components/modal.js';
import {createCardElement, deleteCardElement} from '../components/card.js';

//DOM-узлы
const placeList = document.querySelector(".places__list");

//Выводим карточки на страницу
initialCards.forEach(function (card) {
    placeList.append(createCardElement(card, deleteCardElement));
});


const profileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCloseBtnProfile = document.querySelector('.popup__close');

//Находим форму профиля в DOM
const formEditProfile = document.querySelector('.popup__form');

//Находим поля формы профиля в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

//Обработчик отправки формы 
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameInput.value = '';
    jobInput.value = '';
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    nameInput.textContent = profileTitle;
    jobInput.textContent = profileDescription;
}
//Обработчик события профиля при нажатии кнопку "Сохранить"
formEditProfile.addEventListener('submit', handleFormSubmit); 

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseBtnNewCard = document.querySelector('.popup__close');

//Находим форму карточки в DOM
const formNewCard = document.querySelector('.popup__form');

//Находим поля формы добавления новых карточек в DOM
/*const nameNewCardInput = formNewCard.querySelector('.popup__input_type_card-name');
const urlNewCardInput = formNewCard.querySelector('.popup__input_type_url');*/

const newCardButton = document.querySelector('.popup__button');

const imageOpen = document.querySelector('.popup_type_image');
const imageButton= document.querySelector('.popup__close');

//Функия открытия карточки





//Обработчик события открытия модального окна профиля
profileButton.addEventListener('click', () => {
    openPopup(popupProfile);
});

//Обработчик события закрытия модального окна профиля
popupCloseBtnProfile.addEventListener('click', () => {
    closePopup(popupProfile);
})

//Обработчик события открытия модального окна карточки
addProfileButton.addEventListener('click', () => {
    openPopup(popupNewCard);
})

//Обработчик события закрытия модального окна карточки
popupCloseBtnNewCard.addEventListener('click', () => {
    closePopup(popupNewCard);
})

//Обработчик события открытия модального окна картинки
imageButton.addEventListener('click', () => {
    openPopup(imageOpen);
})

//Обработчик события закрытия модального окна картинки



