//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export function deleteCardElement(cardElement) {
    cardElement.remove()
   
} 

//Функция создания карточек
export function createCardElement(card, deleteCardCall, likeCallBack, openImage, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imageElement = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const titleElement = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCount = cardElement.querySelector('.card__like-count');

    const cardId = card._id;
    const ownerId = card.owner._id;
    const countLikes = card.likes;
    imageElement.src = card.link;
    imageElement.alt = card.name;
    titleElement.textContent = card.name;
  
if(ownerId !== userId) {
    deleteButton.remove();
} else {
    deleteButton.addEventListener('click', () => {
        deleteCardCall(cardElement, cardId)}) 
}

    likeButton.addEventListener('click', () => {
        likeCallBack(likeButton);
    });

    imageElement.addEventListener('click', () => {
        openImage(card.link, card.name);
    })
    
 return cardElement; 
}

//Функция лайка карточки
export function likeCard(likeButton) {
    if (likeButton.classList.add('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
    } else {
        likeButton.classList.add('card__like-button_is-active');
    }
}

/*if (card.likes.forEach((user) => user._id === userId)) {
    likeButton.classList.add('.card__like-button_is-active')
}*/











