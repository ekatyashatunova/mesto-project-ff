const configAPI = {
    baseUrl: "https://nomoreparties.co/v1/сohort-13/",
  headers: {
    authorization: "d6861576-603e-40be-9c84-d05dd645bb31",
    "Content-Type": "application/json",
  },
}

//Получение информации о пользователе с сервера
export const getEditProfile = () => {
  return fetch(`.${configAPI.baseUrl}/users/me`, {
    method: 'GET',
    headers: configAPI.headers,
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`); 
  })
}

//Получение инфы о карточках с сервера
export const getInitialCards = () => {
  return fetch(`.${configAPI.baseUrl}/cards`, {
    method: 'GET',
    headers: configAPI.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`); 
  })
}

//Редактирование профиля и отправка данных на сервер
export const editProfileToServer = () => {
  return fetch(`.${configAPI.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: configAPI.headers,
    body: JSON.stringify({
    name: nameInput.value,
    about: jobInput.value
  })
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`); 
})
}

//Добавление новой карточки и отправка на сервер
export const newCardToServer = () => {
  return fetch(`.${configAPI.baseUrl}/cards`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardLinkInput.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`); 
  })
}

