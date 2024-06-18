const configAPI = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "d6861576-603e-40be-9c84-d05dd645bb31",
    "Content-Type": "application/json",
  },
}

const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`); 
}

//Получение информации о пользователе с сервера
export const getEditProfile = () => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: 'GET',
    headers: configAPI.headers,
  }) 
  .then(handleResponse);
}

//Получение инфы о карточках с сервера
export const getInitialCard = () => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: 'GET',
    headers: configAPI.headers,
  })
  .then(handleResponse)
}

//Редактирование профиля и отправка данных на сервер
export const editProfileToServer = (nameInput, jobInput) => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: configAPI.headers,
    body: JSON.stringify({
    name: nameInput.value,
    about: jobInput.value,
  }),
})
.then(handleResponse)
}

//Добавление новой карточки и отправка на сервер
export const newCardToServer = (newCard) => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    }),
  })
  .then(handleResponse)
}

//Удаление карточки
export const deleteCardId = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configAPI.headers,
})
.then(handleResponse)
}

//Постановка лайка
export const likeCardId = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: configAPI.headers,
})
.then(handleResponse)
}

//Снятие лайка
export const unlikeCardId = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: configAPI.headers,
})
.then(handleResponse)
} 


//Обновление аватара пользователя
/*export const updateAvatar = (profileAvatarInput) => {
  return fetch(`${configAPI.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configAPI.headers,
    body: JSON.stringify({
      avatar: profileAvatarInput.value
    }),
  })
}*/

