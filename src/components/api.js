const configAPI = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "d6861576-603e-40be-9c84-d05dd645bb31",
    "Content-Type": "application/json",
  },
}

const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Что-то пошло не так: ${response.status}`); 
}

//Получение информации о пользователе с сервера
export const getEditProfile = () => {
  return fetch(`.${configAPI.baseUrl}/users/me`, {
    method: "GET",
    headers: configAPI.headers,
  }) 
  .then(handleResponse);
}

//Получение инфы о карточках с сервера
export const getInitialCard = () => {
  return fetch(`.${configAPI.baseUrl}/cards`, {
    method: "GET",
    headers: configAPI.headers,
  })
  .then(handleResponse)
}

//Редактирование профиля и отправка данных на сервер
export const editProfileToServer = (nameInput, jobInput) => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: "PATCH",
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

