
const cardTemplate = document.querySelector("#card-template").content;

const placeList = document.querySelector(".places__list");

function createCardElement(card, deleteCardCall) {
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

function deleteCardElement(cardElement) {
    cardElement.remove();
}

initialCards.forEach(function (card) {
    placeList.append(createCardElement(card, deleteCardElement));
});
