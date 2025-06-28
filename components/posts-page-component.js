import { USER_POSTS_PAGE } from "../routes.js"
import { renderHeaderComponent } from "./header-component.js"
import { posts, goToPage } from "../index.js"

export function renderPostsPageComponent({ appEl }) {
    console.log("Актуальный список постов:", posts)

    // Генерируем HTML для каждого поста
    const postsHtml = posts
        .map(
            (post) => `
    <li class="post">
      <!-- Шапка поста с информацией о пользователе -->
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name" onerror="this.src='/default-avatar.png'">${post.user.name}</p>
      </div>
      
      <!-- Изображение поста -->
      <div class="post-image-container">
        <img class="post-image" onerror="this.src='/default-avatar.png'" src="${post.imageUrl}">
      </div>
      
      <!-- Блок с лайками -->
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <!-- Меняем иконку лайка в зависимости от того, лайкнул ли пользователь -->
          <img src="./assets/images/like-${post.isLiked ? "active" : "not-active"}.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
        </p>
      </div>
      
      <!-- Текст поста -->
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
  `,
        )
        .join("") // Объединяем все посты в одну строку

    // Основной HTML контейнер
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`

    // Вставляем сгенерированный HTML в приложение
    appEl.innerHTML = appHtml

    // Рендерим компонент шапки
    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    })

    // Добавляем обработчики клика на аватары пользователей
    for (let userEl of document.querySelectorAll(".post-header")) {
        userEl.addEventListener("click", () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            })
        })
    }
}
