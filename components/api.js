const personalKey = "vera-pershina"
const baseHost = `https://wedev-api.sky.pro/api/v1/${personalKey}/instapro`
const authHost = "https://wedev-api.sky.pro/api/user"

// Получение всех постов
export function getPosts({ token }) {
    return fetch(`${baseHost}`, {
        method: "GET",
        headers: token ? { Authorization: token } : {},
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации")
            }
            return response.json()
        })
        .then((data) => {
            return data.posts
        })
}

// Получение постов конкретного пользователя
export function getUserPosts({ token, userId }) {
    return fetch(`${baseHost}/user-posts/${userId}`, {
        method: "GET",
        headers: token ? { Authorization: token } : {},
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации")
            }
            return response.json()
        })
        .then((data) => {
            return data.posts
        })
}

// Добавление нового поста
export function addPost({ token, description, imageUrl }) {
    return fetch(`${baseHost}`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            description,
            imageUrl,
        }),
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((errorData) => {
                throw new Error(errorData.error || "Не удалось добавить пост")
            })
        }
        return response.json()
    })
}

// Поставить лайк
export function likePost({ token, postId }) {
    return fetch(`${baseHost}/${postId}/like`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Не удалось поставить лайк")
        }
        return response.json()
    })
}

// Убрать лайк
export function dislikePost({ token, postId }) {
    return fetch(`${baseHost}/${postId}/dislike`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Не удалось убрать лайк")
        }
        return response.json()
    })
}

// Регистрация пользователя
export function registerUser({ login, password, name, imageUrl }) {
    return fetch(`${authHost}`, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
            imageUrl,
        }),
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((errorData) => {
                const errorMessage =
                    errorData.error ||
                    (response.status === 400
                        ? "Пользователь с таким логином уже существует"
                        : "Ошибка регистрации")
                throw new Error(errorMessage)
            })
        }
        return response.json()
    })
}

// Авторизация пользователя
export function loginUser({ login, password }) {
    return fetch(`${authHost}/login`, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((errorData) => {
                throw new Error(errorData.error || "Неверный логин или пароль")
            })
        }

        return response.json()
    })
}

export function uploadImage({ file }) {
    const data = new FormData()
    data.append("file", file)

    console.log("Отправка файла на сервер...", file.name) // Логируем имя файла

    return fetch(`${baseHost}/upload/image`, {
        method: "POST",
        body: data,
    })
        .then((response) => {
            if (!response.ok) {
                console.error("Ошибка загрузки:", response.status) // Логируем статус ошибки
                throw new Error("Ошибка загрузки изображения")
            }
            return response.json()
        })
        .then((data) => {
            console.log("Сервер вернул URL:", data.fileUrl) // Проверяем ответ сервера
            return { fileUrl: data.fileUrl }
        })
        .catch((error) => {
            console.error("Ошибка в uploadImage:", error) // Ловим все ошибки
            throw error
        })
}
