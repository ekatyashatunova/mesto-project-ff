//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточек

export function createCardElement(card, deleteCardCall, likeCallBack) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const titleElement = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    imageElement.src = card.link;
    imageElement.alt = card.name;
    titleElement.textContent = card.name;

    deleteButton.addEventListener("click", () => {
        deleteCardCall(cardElement);
    });

    likeButton.addEventListener('click', () => {
        likeCallBack(likeButton);
    })
    return cardElement;
}

//Функция удаления карточек
export function deleteCardElement(cardElement) {
    cardElement.remove();
}

export function likeCard(likeButton) {
   if(likeButton.classList.add('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active')
   } else {
    likeButton.classList.add('card__like-button_is-active')
   }
}
















