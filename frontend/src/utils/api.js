import { getToken } from './token';

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _response = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _getHeaders() {
      const token = getToken('jwt');
      return {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      }
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getHeaders()
        })
            .then(this._response)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders()
        })
        .then(this._response)
    }

    sendUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._response)
    }

    sendUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.link
            })
        })
        .then(this._response)
    }

    sendCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
              name: data.name,
              link: data.link,
            }),
        })
        .then(this._response)
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._getHeaders()
        })
        .then(this._response)
    }

    deleteLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        })
        .then(this._response)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        })
        .then(this._response)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api