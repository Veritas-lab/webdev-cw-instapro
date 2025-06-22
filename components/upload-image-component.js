/**
 * Компонент для загрузки изображений
 * @param {Object} params - Параметры компонента
 * @param {HTMLElement} params.element - Элемент для рендеринга компонента
 * @param {Function} params.onImageUrlChange - Колбэк при успешной загрузке изображения
 * @param {Function} [params.onUploadError] - Колбэк при ошибке загрузки
 */
export function renderUploadImageComponent({
    element,
    onImageUrlChange,
    onUploadError,
}) {
    element.innerHTML = `
        <div class="upload-image">
            <label class="upload-label">
                <input type="file" class="file-input" accept="image/*" style="display: none;">
                <span class="upload-text">Выберите фото</span>
            </label>
            <div class="image-preview"></div>
        </div>
    `

    const fileInput = element.querySelector(".file-input")
    const uploadText = element.querySelector(".upload-text")
    const imagePreview = element.querySelector(".image-preview")

    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0]
        if (!file) return

        try {
            uploadText.textContent = "Загрузка..."

            // Создаем временный URL для предпросмотра
            const imageUrl = URL.createObjectURL(file)

            // Показываем превью
            imagePreview.innerHTML = `<img src="${imageUrl}" class="preview-image">`
            uploadText.textContent = file.name

            // Вызываем колбэк с URL изображения
            if (onImageUrlChange) {
                onImageUrlChange(imageUrl)
            }
        } catch (error) {
            uploadText.textContent = "Ошибка загрузки"
            imagePreview.innerHTML = ""

            if (onUploadError) {
                onUploadError(error.message)
            }
        }
    })
}
