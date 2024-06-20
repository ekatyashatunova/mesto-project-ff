//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточек

export function createCardElement(card, deleteCardCall, likeCallBack, openImage, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imageElement = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const titleElement = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    /*const cardId = cardData._id;*/
    imageElement.src = card.link;
    imageElement.alt = card.name;
    titleElement.textContent = card.name;

    deleteButton.addEventListener('click', () => {
        deleteCardCall(cardElement);
    });

    likeButton.addEventListener('click', () => {
        likeCallBack(likeButton);
    });

    imageElement.addEventListener('click', () => {
        openImage(card.link, card.name);
    })

    return cardElement;
}

//Функция удаления карточек
/*export function deleteCardElement(cardElement) {
cardElement.remove();
}*/
export function deleteCardElement(cardElement) {
    if (cardElement.owner._id !== userId) {
        deleteButton.remove();   
     } else {
        deleteButton.addEventListener('click', (evt) => {
            deleteCardCall(cardId)
            .then(() => {
                const card = evt.target.closest('.places__item.card');
                card.remove();
              })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    
   
}

//Функция лайка карточки
export function likeCard(likeButton) {
    if (likeButton.classList.add('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
    } else {
        likeButton.classList.add('card__like-button_is-active');
    }
}













