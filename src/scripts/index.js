import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';
import { openPopup, closePopup} from '../components/modal.js';
import {createCardElement, deleteCardElement, likeCard} from '../components/card.js';
/*import cardTemplate from '../components/card.js';*/

//DOM-узлы
const placeList = document.querySelector(".places__list");

//Выводим карточки на страницу
initialCards.forEach(function (card) {
    placeList.append(createCardElement(card, deleteCardElement, likeCard, addNewCard, handleClickImage));
});

const profileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCloseBtnProfile = document.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Находим форму профиля в DOM
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');

//Находим поля формы профиля в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const buttonSaveProfile = formEditProfile.querySelector('.popup__button');

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
buttonSaveProfile.addEventListener('click', () => {
    closePopup(popupProfile) 
 })

//Обработчик события открытия модального окна профиля
profileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);
});

//Обработчик события закрытия модального окна профиля
popupCloseBtnProfile.addEventListener('click', () => {
    closePopup(popupProfile);
})

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseBtnNewCard = document.querySelector('.popup__close');
const buttonSaveCard = popupNewCard.querySelector('.popup__button');
const cardImage = document.querySelector('.card__image ');
const cardTitle = document.querySelector('.card__title');

//Находим форму карточки в DOM
const formNewCard = document.querySelector('.popup__form[name="new-place"]');

//Обработчик события открытия модального окна карточки
addProfileButton.addEventListener('click', () => {
    openPopup(popupNewCard);
})

//Обработчик события закрытия модального окна карточки
popupCloseBtnNewCard.addEventListener('click', () => {
    closePopup(popupNewCard);
})

//Функция добавления новой карточки
export function addNewCard (evt) {
    evt.preventDefault();

//Находим поля формы карточки
const cardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formNewCard.querySelector('.popup__input_type_url');

    const cardNew = {
        link: cardLinkInput.value,
        name: cardNameInput.value,
    }

//Вставляем новые карточки в DOM
placeList.prepend(createCardElement(cardNew, deleteCardElement, likeCard, handleClickImage));
    formNewCard.reset();
}

//Обработчик события при добавлении карточки при нажатии кнопки "Сохранить"
formNewCard.addEventListener('submit',addNewCard);
buttonSaveCard.addEventListener('click', () => {
    closePopup(popupNewCard);
}) 

const imageOpen = document.querySelector('.popup_type_image');
const imageButton = document.querySelector('.popup__close');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

export function openImage(imgSrc, imgCaption) {
    imageCaption.textContent = imgCaption;
    popupImage.src = imgSrc;
    popupImage.alt = imgCaption;
    openPopup(imageOpen);
}

function handleClickImage (evt) {
    const imgSrc = evt.target.src;
    const imgCaption = evt.target.alt;
    openImage(imgSrc, imgCaption);
}

//Обработчик события закрытия модального окна image
imageButton.addEventListener('click', () => {
    closePopup(imageOpen);
})







