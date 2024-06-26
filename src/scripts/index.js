import "../pages/index.css";
import { openPopup, closePopup } from "../components/modal.js";
import { createCardElement, deleteCardElement, likeCard} from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getEditProfile, getInitialCard, editProfileToServer, newCardToServer, updateAvatar, deleteCardId, likeCardId, unlikeCardId } from "../components/api.js";

//DOM-узлы
const placeList = document.querySelector(".places__list");

const profileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Объект для валидации
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

let userId;

Promise.all([getEditProfile(), getInitialCard()])
.then(([userName, cardName]) => {
    profileTitle.textContent = userName.name;
    profileDescription.textContent = userName.about;
    userId = userName._id;
    editProfileAvatar.style.backgroundImage = `url(${userName.avatar})`;

    cardName.forEach((card) => {
        placeList.append(createCardElement(card, deleteCardElement,likeCard, openImage, userId, deleteCardId, likeCardId, unlikeCardId));
    })
})
.catch((err) => {
    console.log(err)
});

//Находим форму профиля в DOM
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');

//Находим поля формы профиля в DOM
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

//Обработчик события открытия модального окна профиля
profileButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);
});

//Функция редактирования профиля при нажатии на "Сохранить"
function handleFormSubmit(evt) {
    evt.preventDefault();
    const buttonSaveProfile = formEditProfile.querySelector(".popup__button");
    buttonSaveProfile.textContent = "Сохранение...";

    editProfileToServer(nameInput, jobInput)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            formEditProfile.reset();
            clearValidation(popupProfile.querySelector(validationConfig.formSelector), validationConfig);
            closePopup(popupProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSaveProfile.textContent = "Сохранить";
        });
}

//Обработчик события профиля при нажатии кнопку "Сохранить"
formEditProfile.addEventListener("submit", handleFormSubmit);

const popupNewCard = document.querySelector(".popup_type_new-card");

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

    const buttonSaveCard = formNewCard.querySelector(".popup__button");
    buttonSaveCard.textContent = "Сохранение...";

    newCardToServer(cardNew)
        .then((element) => {
            placeList.prepend(createCardElement(element, deleteCardElement, likeCard, openImage, userId, deleteCardId, likeCardId, unlikeCardId));
            formNewCard.reset();
            clearValidation(popupNewCard.querySelector(validationConfig.formSelector), validationConfig);
            closePopup(popupNewCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSaveCard.textContent = "Сохранить";
        });
}

//Обработчик события при добавлении карточки при нажатии кнопки "Сохранить"
formNewCard.addEventListener("submit", addNewCard);

//Находим данные для карточек по клику на них
const imageOpen = document.querySelector(".popup_type_image");
const closeButtons = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

//Функция открытия изображения по клику
function openImage(imgSrc, imgCaption) {
    imageCaption.textContent = imgCaption;
    popupImage.src = imgSrc;
    popupImage.alt = imgCaption;
    openPopup(imageOpen);
}

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => {
        closePopup(popup);
    });
});

enableValidation(validationConfig);

//Находим форму и поля формы для аватара пользователя
const editProfileAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_edit_profile_avatar");
const formProfileAvatar = document.querySelector('.popup__form[name="edit-profile-avatar"]');
const profileAvatarInput = formProfileAvatar.querySelector(".popup__input_type_url");

//Обработчик события открытия модального окна аватара пользователя
editProfileAvatar.addEventListener("click", () => {
    openPopup(popupAvatar);
});

//Обработчик отправки формы аватра
function formSubmitAvatar(evt) {
    evt.preventDefault();

    const newAvatar = {
        avatar: profileAvatarInput.value,
    };

    const buttonSaveAvatar = formProfileAvatar.querySelector(".popup__button");
    buttonSaveAvatar.textContent = "Сохранение...";

    updateAvatar(newAvatar)
        .then((user) => {
            editProfileAvatar.style.backgroundImage = `url(${user.avatar})`;
            formProfileAvatar.reset();
            clearValidation(popupAvatar.querySelector(validationConfig.formSelector), validationConfig);
            closePopup(popupAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSaveAvatar.textContent = "Сохранить";
        });
}

//Обработчик события аватара при нажатии кнопку "Сохранить"
formProfileAvatar.addEventListener("submit", formSubmitAvatar);


