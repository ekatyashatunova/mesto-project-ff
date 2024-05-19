import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { openPopup, closePopup } from "../components/modal.js";
import { createCardElement, deleteCardElement, likeCard} from "../components/card.js";

//DOM-узлы
const placeList = document.querySelector(".places__list");

//Выводим карточки на страницу
initialCards.forEach(function (card) {
    placeList.append(createCardElement(card, deleteCardElement, likeCard, openImage));
});

const profileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Находим форму профиля в DOM
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');

//Находим поля формы профиля в DOM
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

//Обработчик отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

//Закрытие формы
    closePopup(popupProfile);

//Очистка формы профиля
    formEditProfile.reset();
}

//Обработчик события профиля при нажатии кнопку "Сохранить"
formEditProfile.addEventListener("submit", handleFormSubmit);

//Обработчик события открытия модального окна профиля
profileButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);
});

const popupNewCard = document.querySelector(".popup_type_new-card");
const cardImages = document.querySelectorAll(".card__image ");
const cardTitle = document.querySelector(".card__title");

//Находим форму карточки в DOM
const formNewCard = document.querySelector('.popup__form[name="new-place"]');

//Находим поля формы карточки
const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formNewCard.querySelector(".popup__input_type_url");

//Обработчик события открытия модального окна карточки
addProfileButton.addEventListener("click", () => {
    openPopup(popupNewCard);
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
    closePopup(popupNewCard);
    formNewCard.reset();
}

//Обработчик события при добавлении карточки при нажатии кнопки "Сохранить"
formNewCard.addEventListener("submit", addNewCard);

const imageOpen = document.querySelector(".popup_type_image");
const imageButton = document.querySelector(".popup__close");
const popupImage = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

function openImage(imgSrc, imgCaption) {
    imageCaption.textContent = imgCaption;
    popupImage.src = imgSrc;
    popupImage.alt = imgCaption;
    openPopup(imageOpen);
}

//Обработчик события закрытия модального окна image
imageButton.addEventListener("click", () => {
    closePopup(imageOpen);
});


