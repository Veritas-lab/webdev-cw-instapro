import { renderAddPostPageComponent } from "./components/add-post-page-component.js"
import { renderUserPostsPageComponent } from "./components/user-posts-page-component.js"
import { renderAuthPageComponent } from "./components/auth-page-component.js"
import {
    ADD_POSTS_PAGE,
    AUTH_PAGE,
    LOADING_PAGE,
    POSTS_PAGE,
    USER_POSTS_PAGE,
} from "./components/routes.js"
import { renderPostsPageComponent } from "./components/posts-page-component.js"
import { renderLoadingPageComponent } from "./components/loading-page-component.js"
import {
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
    saveUserToLocalStorage,
} from "./helpers.js"
import { getPosts, getUserPosts, addPost } from "./components/api.js"

// Глобальное состояние приложения
export let user = getUserFromLocalStorage()
export let page = null
export let posts = []

// Получение токена авторизации
export const getToken = () => (user ? `Bearer ${user.token}` : undefined)

// Выход из системы
export const logout = () => {
    user = null
    removeUserFromLocalStorage()
    goToPage(POSTS_PAGE)
}

/**
 * Переключение между страницами приложения
 * @param {string} newPage - Новая страница
 * @param {object} data - Дополнительные данные
 */
export const goToPage = (newPage, data) => {
    const validPages = [
        POSTS_PAGE,
        AUTH_PAGE,
        ADD_POSTS_PAGE,
        USER_POSTS_PAGE,
        LOADING_PAGE,
    ]

    if (!validPages.includes(newPage)) {
        throw new Error("Страницы не существует")
    }

    switch (newPage) {
        case ADD_POSTS_PAGE:
            page = user ? ADD_POSTS_PAGE : AUTH_PAGE
            break

        case USER_POSTS_PAGE:
            handleUserPostsPage(data)
            return

        case POSTS_PAGE:
            page = LOADING_PAGE
            renderApp()
            loadPosts()
            return

        default:
            page = newPage
    }

    renderApp()
}

// Загрузка списка постов
const loadPosts = () => {
    getPosts({ token: getToken() })
        .then((newPosts) => {
            posts = newPosts
            page = POSTS_PAGE
            renderApp()
        })
        .catch((error) => {
            console.error("Ошибка при загрузке постов:", error)
            page = POSTS_PAGE
            renderApp()
        })
}

// Обработка страницы постов пользователя
const handleUserPostsPage = (data) => {
    page = LOADING_PAGE
    renderApp()

    getUserPosts({ token: getToken(), userId: data.userId })
        .then((newPosts) => {
            page = USER_POSTS_PAGE
            posts = newPosts
            renderApp()
        })
        .catch((error) => {
            console.error("Ошибка при загрузке постов пользователя:", error)
            goToPage(POSTS_PAGE)
        })
}

// Рендеринг текущей страницы
const renderApp = () => {
    const appEl = document.getElementById("app")
    if (!appEl) return

    const pageHandlers = {
        [LOADING_PAGE]: () =>
            renderLoadingPageComponent({ appEl, user, goToPage }),
        [AUTH_PAGE]: () =>
            renderAuthPageComponent({
                appEl,
                setUser: (newUser) => {
                    user = newUser
                    saveUserToLocalStorage(user)
                    goToPage(POSTS_PAGE)
                },
                user,
            }),
        [ADD_POSTS_PAGE]: () =>
            renderAddPostPageComponent({
                appEl,
                onAddPostClick: ({ description, imageUrl }) => {
                    goToPage(LOADING_PAGE)
                    addPost({
                        token: getToken(),
                        description,
                        imageUrl,
                    })
                        .then(() => {
                            goToPage(POSTS_PAGE)
                        })
                        .catch((error) => {
                            console.error("Ошибка при добавлении поста:", error)
                            goToPage(ADD_POSTS_PAGE)
                            alert(error.message)
                        })
                },
            }),
        [POSTS_PAGE]: () => renderPostsPageComponent({ appEl }),
        [USER_POSTS_PAGE]: () => renderUserPostsPageComponent({ appEl }),
    }

    const renderPage = pageHandlers[page]
    if (renderPage) renderPage()
}

// Инициализация приложения
goToPage(user ? POSTS_PAGE : AUTH_PAGE)
