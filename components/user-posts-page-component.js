import { USER_POSTS_PAGE } from "./routes.js"
import { renderHeaderComponent } from "./header-component.js"
import { posts, goToPage } from "../index.js"

export function renderUserPostsPageComponent({ appEl }) {
    // Проверка на загрузку данных
    if (!posts) {
        appEl.innerHTML = `
            <div class="page-container">
                <div class="header-container"></div>
                <div class="posts-loading">Загрузка данных...</div>
            </div>
        `
        renderHeaderComponent({
            element: document.querySelector(".header-container"),
        })
        return
    }

    // Если постов нет
    if (posts.length === 0) {
        appEl.innerHTML = `
            <div class="page-container">
                <div class="header-container"></div>
                <div class="posts-loading">У пользователя пока нет постов</div>
            </div>
        `
        renderHeaderComponent({
            element: document.querySelector(".header-container"),
        })
        return
    }

    // Получаем данные пользователя
    const user = posts[0]?.user
    if (!user) {
        appEl.innerHTML = `
            <div class="page-container">
                <div class="header-container"></div>
                <div class="posts-loading">Ошибка загрузки данных пользователя</div>
            </div>
        `
        renderHeaderComponent({
            element: document.querySelector(".header-container"),
        })
        return
    }

    // Рендеринг постов
    const postsHtml = posts
        .map(
            () => `
        <li class="post">
            <!-- Пост -->
        </li>
    `,
        )
        .join("")

    // Общий HTML
    const appHtml = `
        <div class="page-container">
            <div class="header-container"></div>
            <div class="user-posts-header">
                <img src="${user.imageUrl}" class="user-posts-header__user-image">
                <h2 class="user-posts-header__user-name">${user.name}</h2>
            </div>
            <ul class="posts">${postsHtml}</ul>
        </div>
    `

    appEl.innerHTML = appHtml
    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    })

    // Обработчики событий
    document.querySelector(".post-header")?.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, { userId: user.id })
    })
}
