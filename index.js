import { getPosts } from "./api.js"
import { renderAddPostPageComponent } from "./components/add-post-page-component.js"
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

export let user = getUserFromLocalStorage()
export let page = null
export let posts = []

const getToken = () => {
    const token = user ? `Bearer ${user.token}` : undefined
    return token
}

export const logout = () => {
    user = null
    removeUserFromLocalStorage()
    goToPage(POSTS_PAGE)
}

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
    if (
        ![
            POSTS_PAGE,
            AUTH_PAGE,
            ADD_POSTS_PAGE,
            USER_POSTS_PAGE,
            LOADING_PAGE,
        ].includes(newPage)
    ) {
        throw new Error("страницы не существует")
    }

    if (newPage === ADD_POSTS_PAGE) {
        page = user ? ADD_POSTS_PAGE : AUTH_PAGE
        renderApp()
        return
    }

    if (newPage === POSTS_PAGE) {
        page = LOADING_PAGE
        renderApp()

        return getPosts({ token: getToken() })
            .then((newPosts) => {
                page = POSTS_PAGE
                posts = newPosts
                renderApp()
            })
            .catch((error) => {
                console.error("Ошибка загрузки постов:", error)
                goToPage(POSTS_PAGE)
            })
    }

    if (newPage === USER_POSTS_PAGE) {
        if (!data?.userId) {
            console.error("Не указан userId для страницы пользователя")
            return goToPage(POSTS_PAGE)
        }

        page = LOADING_PAGE
        renderApp()

        return getPosts({
            token: getToken(),
            userId: data.userId,
        })
            .then((newPosts) => {
                if (!Array.isArray(newPosts)) {
                    throw new Error("Некорректный формат полученных постов")
                }
                page = USER_POSTS_PAGE
                posts = newPosts
                renderApp()
            })
            .catch((error) => {
                console.error("Ошибка загрузки постов пользователя:", error)
                goToPage(POSTS_PAGE)
            })
    }

    // Для всех остальных страниц (AUTH_PAGE, LOADING_PAGE)
    page = newPage
    renderApp()
}

const renderApp = () => {
    const appEl = document.getElementById("app")
    if (page === LOADING_PAGE) {
        return renderLoadingPageComponent({
            appEl,
            user,
            goToPage,
        })
    }

    if (page === AUTH_PAGE) {
        return renderAuthPageComponent({
            appEl,
            setUser: (newUser) => {
                user = newUser
                saveUserToLocalStorage(user)
                goToPage(POSTS_PAGE)
            },
            user,
            goToPage,
        })
    }

    if (page === ADD_POSTS_PAGE) {
        return renderAddPostPageComponent({
            appEl,
            onAddPostClick({ description, imageUrl }) {
                // @TODO: реализовать добавление поста в API
                console.log("Добавляю пост...", { description, imageUrl })
                goToPage(POSTS_PAGE)
            },
        })
    }

    if (page === POSTS_PAGE) {
        return renderPostsPageComponent({
            appEl,
        })
    }

    if (page === USER_POSTS_PAGE) {
        // @TODO: реализовать страницу с фотографиями отдельного пользвателя
        appEl.innerHTML = "Здесь будет страница фотографий пользователя"
        return
    }
}

goToPage(POSTS_PAGE)
