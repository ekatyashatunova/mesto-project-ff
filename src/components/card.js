import { likeCardId, unlikeCardId, deleteCardId } from "../components/api";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточек
export function createCardElement(card, deleteCardCall, likeCallBack, openImage, userId) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const titleElement = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardLikeCount = cardElement.querySelector(".card__like-count");

    cardLikeCount.textContent = card.likes.length;
    const cardId = card._id;
    const ownerId = card.owner._id;
    const cardLikes = card.likes;

    imageElement.src = card.link;
    imageElement.alt = card.name;
    titleElement.textContent = card.name;

    if (ownerId !== userId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener("click", () => {
            deleteCardId(cardId)
                .then(() => {
                    deleteCardCall(cardElement, cardId);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    //Функция добавления класса кнопке "Like"
    function addLike(likeButton) {
        likeButton.classList.add("card__like-button_is-active");
    }

    //Функция удаления класса кнопке "Like"
    function deleteLike(likeButton) {
        likeButton.classList.remove("card__like-button_is-active");
    }
        
    function pressCardLike() { 
       if (cardLikes.some(user => user._id === userId)) {
       /* cardLikes.some(card => card._id === cardId)
      if (card.owner._id === userId) */ {
        
            deleteLike(likeButton);
            unlikeCardId(cardId)
           
                .then((res) => {
                    cardLikeCount.textContent = res.likes.length
                    
                })

                .then(() => {
                    likeCallBack(likeButton);
                })
                
                .catch((err) => {
                    console.log(err) 
                });
        }} else {
           
            addLike(likeButton);
            likeCardId(cardId)
                .then((res) => {
                 cardLikeCount.textContent = res.likes.length;
                })

               .then(() => {
                    likeCallBack(likeButton);
                })
                .catch((err) => {
                    console.log(err);
                })
            }        
    }

 //Событие по клику на кнопку "Like"   
    likeButton.addEventListener("click", pressCardLike);
    
    imageElement.addEventListener("click", () => {
        openImage(card.link, card.name);
    });

    return cardElement;
}

//Функция удаления карточки
export function deleteCardElement(cardElement) {
    cardElement.remove();
}

//Функция лайка карточки
export function likeCard(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}
