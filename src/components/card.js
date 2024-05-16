
//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточек
export function createCardElement(card, deleteCardCall) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const titleElement = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    imageElement.src = card.link;
    imageElement.alt = card.name;
    titleElement.textContent = card.name;
    deleteButton.addEventListener("click", function () {
        deleteCardCall(cardElement);
    });
    return cardElement;
}

//Функция удаления карточек
export function deleteCardElement(cardElement) {
    cardElement.remove();
}

//Функция добавления новой карточки
function addNewCard (evt) {
    evt.preventDefault();

    const cardNameInput = document.querySelector('.popup__input_type_card-name');
    const cardLinkInput = document.querySelector('.popup__input_type_url');

    const cardData = {
        link: cardLinkInput.value,
        name:  cardNameInput.value,
    }

    const newCard = createCardElement(cardData);

    const placesItem = document.querySelector('.laces__item');
    placesItem.prepend(newCard);


}

