import { getPosts, getUserPosts, personalKey } from "./api.js"
import { renderAddPostPageComponent } from "./components/add-post-page-component.js"
import { renderAuthPageComponent } from "./components/auth-page-component.js"
import {
    ADD_POSTS_PAGE,
    AUTH_PAGE,
    LOADING_PAGE,
    POSTS_PAGE,
    USER_POSTS_PAGE,
} from "./routes.js"
import { renderPostsPageComponent } from "./components/posts-page-component.js"
import { renderLoadingPageComponent } from "./components/loading-page-component.js"
import {
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
    saveUserToLocalStorage,
} from "./helpers.js"
// import { error } from "console";

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

export function updatePosts(newPosts) {
    posts = newPosts
}

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
    if (
        [
            POSTS_PAGE,
            AUTH_PAGE,
            ADD_POSTS_PAGE,
            USER_POSTS_PAGE,
            LOADING_PAGE,
        ].includes(newPage)
    ) {
        if (newPage === ADD_POSTS_PAGE) {
            /* Если пользователь не авторизован, то отправляем его на страницу авторизации перед добавлением поста */
            page = user ? ADD_POSTS_PAGE : AUTH_PAGE
            return renderApp()
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
                    console.error(error)
                    goToPage(POSTS_PAGE)
                })
        }

        if (newPage === USER_POSTS_PAGE) {
            // @@TODO: реализовать получение постов юзера из API(Готово)
            page = LOADING_PAGE
            renderApp()

            return getUserPosts({ userId: data.userId, token: getToken() })
                .then((userPosts) => {
                    posts = userPosts
                    page = USER_POSTS_PAGE
                    renderApp()
                })
                .catch((error) => {
                    console.error(error)
                    alert("Ошибка загрузки постов пользователя")
                    goToPage(POSTS_PAGE)
                })
        }
    }

    if (newPage === AUTH_PAGE) {
        page = AUTH_PAGE
        return renderApp()
    }

    throw new Error("страницы не существует")
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
            user,
            onAddPostClick({ description, imageUrl }) {
                // @TODO: реализовать добавление поста в API (Готово)
                if (!description || !imageUrl) {
                    alert("Описание и изображение обязательны")
                    return
                }

                fetch(
                    `https://wedev-api.sky.pro/api/v1/${personalKey}/instapro`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                        body: JSON.stringify({
                            description,
                            imageUrl,
                        }),
                    },
                )
                    .then((response) => {
                        if (response.status === 400) {
                            throw new Error("Неверные данные для поста")
                        }
                        return response.json()
                    })
                    .then(() => {
                        console.log("Добавляю пост...", {
                            description,
                            imageUrl,
                        })
                        goToPage(POSTS_PAGE)
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            },
        })
    }

    if (page === POSTS_PAGE) {
        return renderPostsPageComponent({
            appEl,
            user,
            posts,
            goToPage,
            updatePosts,
        })
    }

    if (page === USER_POSTS_PAGE) {
        // @TODO: реализовать страницу с фотографиями отдельного пользвателя(Готово)
        return renderPostsPageComponent({
            appEl,
            user,
            posts,
            goToPage,
        })
    }
}

goToPage(POSTS_PAGE)
