import { uploadImage } from "../api.js"

export function renderUploadImageComponent({ element, onImageUrlChange }) {
    /**
     * URL текущего изображения.
     * Изначально пуст, пока пользователь не загрузит изображение.
     * @type {string}
     */
    let imageUrl = ""

    /**
     * Функция рендеринга компонента.
     * Отображает интерфейс компонента в зависимости от состояния:
     * либо форма выбора файла, либо превью загруженного изображения с кнопкой замены.
     */
    const render = () => {
        element.innerHTML = `
      <div class="upload-image">
        ${
            imageUrl
                ? `
            <div class="file-upload-image-container">
              <img class="file-upload-image" src="${imageUrl}" alt="Загруженное изображение">
              <button class="file-upload-remove-button button">Заменить фото</button>
            </div>
            `
                : `
            <label class="file-upload-label secondary-button">
              <input
                type="file"
                class="file-upload-input"
                style="display:none"
              />
              Выберите фото
            </label>
          `
        }
      </div>
    `

        // Обработчик выбора файла
        const fileInputElement = element.querySelector(".file-upload-input")
        fileInputElement?.addEventListener("change", () => {
            const file = fileInputElement.files[0]
            if (file) {
                const labelEl = document.querySelector(".file-upload-label")
                labelEl.setAttribute("disabled", true)
                labelEl.textContent = "Загружаю файл..."

                // Загружаем изображение с помощью API
                uploadImage({ file }).then(({ fileUrl }) => {
                    imageUrl = fileUrl // Сохраняем URL загруженного изображения
                    onImageUrlChange(imageUrl) // Уведомляем о изменении URL изображения
                    render() // Перерисовываем компонент с новым состоянием
                })
            }
        })

        // Обработчик удаления изображения
        element
            .querySelector(".file-upload-remove-button")
            ?.addEventListener("click", () => {
                imageUrl = "" // Сбрасываем URL изображения
                onImageUrlChange(imageUrl) // Уведомляем об изменении URL изображения
                render() // Перерисовываем компонент
            })
    }

    // Инициализация компонента
    render()
}
