import { USER_POSTS_PAGE } from "./routes.js"
import { renderHeaderComponent } from "./header-component.js"
import { posts, goToPage } from "../index.js"
import { uploadImage } from "./api.js"

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
        .map((post) => {
            const userImageUrl = post.user.imageUrl || "/default-avatar.png"
            const postImageUrl = post.imageUrl || "/default-post.png"

            return `
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
            <img src="${userImageUrl}" 
                 class="post-header__user-image"
                 onerror="this.src='/default-avatar.png'">
            <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" 
                 src="${postImageUrl}" 
                 alt="Пост пользователя ${post.user.name}"
                 onerror="this.src='/default-post.png'">
          </div>
          <div class="post-footer">
            <p class="post-text">${post.description}</p>
            <p class="post-date">${new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </li>
      `
        })
        .join("")

    const appHtml = `
        <div class="page-container">
          <div class="header-container"></div>
          <div class="user-posts-header">
            <img src="${user.imageUrl || "/default-avatar.png"}" 
                 class="user-posts-header__user-image"
                 onerror="this.src='/default-avatar.png'">
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

export function renderUploadImageComponent({
    element,
    onImageUrlChange,
    onUploadError,
}) {
    let imageUrl = ""

    const render = () => {
        element.innerHTML = `
          <div class="upload-image">
            <label class="upload-label">
              <input type="file" class="file-input" accept="image/*" style="display: none;">
              <span class="upload-text">${imageUrl ? "Фото выбрано" : "Выберите фото"}</span>
            </label>
            <div class="image-preview">
            ${imageUrl ? `<img src="${imageUrl}" class="preview-image">` : ""}
            </div>
            ${imageUrl ? `<button class="file-upload-remove-button">Удалить</button>` : ""}
          </div>
        `

        const fileInput = element.querySelector(".file-input")
        const removeButton = element.querySelector(".file-upload-remove-button")

        fileInput?.addEventListener("change", async (event) => {
            const file = event.target.files[0]
            if (!file) return

            try {
                element.querySelector(".upload-text").textContent =
                    "Загрузка..."
                const tempUrl = URL.createObjectURL(file)
                element.querySelector(".image-preview").innerHTML =
                    `<img src="${tempUrl}" class="preview-image">`

                const { fileUrl } = await uploadImage({ file })
                imageUrl = fileUrl

                if (onImageUrlChange) {
                    onImageUrlChange(imageUrl)
                }
                URL.revokeObjectURL(tempUrl)
                render()
            } catch (error) {
                console.error("Ошибка загрузки изображения:", error)
                if (onUploadError) {
                    onUploadError(error.message)
                }
                render()
            }
        })

        removeButton?.addEventListener("click", () => {
            imageUrl = ""
            if (onImageUrlChange) {
                onImageUrlChange(imageUrl)
            }
            render()
        })
    }

    render()
}
