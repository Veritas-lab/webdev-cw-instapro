import { USER_POSTS_PAGE } from "./routes.js"
import { renderHeaderComponent } from "./header-component.js"
import { posts, goToPage } from "../index.js"
import { likePost, dislikePost } from "./api.js"
import { getToken } from "../index.js"

export function renderPostsPageComponent({ appEl }) {
    console.log("Актуальный список постов:", posts)

    const postsHtml = posts
        .map(
            (post) => `
    <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
        <img src="${post.user.imageUrl}" class="post-header__user-image">
        <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <img src="${
              post.isLiked
                  ? "./assets/images/like-active.svg"
                  : "./assets/images/like-not-active.svg"
          }">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${new Date(post.createdAt).toLocaleString()}
      </p>
    </li>
  `,
        )
        .join("")

    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>
  `

    appEl.innerHTML = appHtml

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    })

    // Обработка клика на пользователя
    for (let userEl of document.querySelectorAll(".post-header")) {
        userEl.addEventListener("click", () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            })
        })
    }

    // Обработка лайков
    document.querySelector(".posts").addEventListener("click", (event) => {
        const likeButton = event.target.closest(".like-button")
        if (!likeButton) return

        const postId = likeButton.dataset.postId
        const post = posts.find((post) => post.id === postId)

        if (!post) return

        const likeImg = likeButton.querySelector("img")
        const likesCountEl =
            likeButton.nextElementSibling.querySelector("strong")

        const promise = post.isLiked
            ? dislikePost({ token: getToken(), postId })
            : likePost({ token: getToken(), postId })

        promise
            .then((updatedPost) => {
                const postIndex = posts.findIndex((p) => p.id === postId)
                if (postIndex !== -1) {
                    posts[postIndex] = updatedPost
                }
                likeImg.src = updatedPost.isLiked
                    ? "./assets/images/like-active.svg"
                    : "./assets/images/like-not-active.svg"
                likesCountEl.textContent = updatedPost.likes.length
            })
            .catch((error) => {
                console.error(error)
                likeImg.src = post.isLiked
                    ? "./assets/images/like-active.svg"
                    : "./assets/images/like-not-active.svg"
                likesCountEl.textContent = post.likes.length
            })
    })
}
