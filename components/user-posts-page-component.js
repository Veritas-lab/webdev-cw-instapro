import { USER_POSTS_PAGE } from "./routes.js"
import { renderHeaderComponent } from "./header-component.js"
import { posts, goToPage } from "./index.js"

export function renderUserPostsPageComponent({ appEl }) {
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

    const postsHtml = posts
        .map(
            (post) => `
            <li class="post">
                <div class="post-header" data-user-id="${post.user.id}">
                    <img src="${post.user.imageUrl}" class="post-header__user-image">
                    <p class="post-header__user-name">${post.user.name}</p>
                </div>
                <div class="post-image-container">
                    <img class="post-image" src="${post.imageUrl}" alt="Пост пользователя ${post.user.name}">
                </div>
                <div class="post-footer">
                    <p class="post-text">${post.description}</p>
                    <p class="post-date">${new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </li>
        `,
        )
        .join("")

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

    document.querySelectorAll(".post-header").forEach((header) => {
        header.addEventListener("click", () => {
            goToPage(USER_POSTS_PAGE, { userId: header.dataset.userId })
        })
    })
}
