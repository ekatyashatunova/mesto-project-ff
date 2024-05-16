/*import {popupProfile, newCardOpen} from '../scripts/index.js';*/

//Функция открытия попапа
 export function openPopup(popupOpen) {
    popupOpen.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
   /* document.addEventListener('click', closeByOverlay);*/
}

//Функция закрытия попапа
export function closePopup(popupClose) {
     popupClose.classList.remove('popup_is-opened');
    const closeButtonPopup = document.querySelectorAll('.popup__close');
    closeButtonPopup.forEach((button) => {
        button.addEventListener('click', () => {
        popupClose.classList.remove('popup_is-opened');
        });
    });
    }
    document.removeEventListener('keydown', closePopupEsc);
    /*document.removeEventListener('click', closeByOverlay);*/



//Функция закрытия попапа по оверлею
 /*function closeByOverlay(evt) {
    if (evt.target === )

}*/


//Функция закрытия попапа по кнопке ESC
 export function closePopupEsc(evt) {
    if (evt.key ==='Escape') {
        const popupOpened = document.querySelector('.popup_is-opened');
        closePopup(popupOpened);
    }
}


   


