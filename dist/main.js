/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ ;(() => {
    // webpackBootstrap
    /******/ "use strict"
    /******/ var __webpack_modules__ = {
        /***/ "./components/add-post-page-component.js":
            /*!***********************************************!*\
  !*** ./components/add-post-page-component.js ***!
  \***********************************************/
            /***/
            /* eslint-disable-next-line no-unused-vars */
            (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderAddPostPageComponent: () => (/* binding */ renderAddPostPageComponent)\n/* harmony export */ });\nfunction renderAddPostPageComponent({ appEl, onAddPostClick }) {\n    const render = () => {\n        const appHtml = `\n    <div class="page-container">\n      <div class="header-container"></div>\n      <div class="form">\n        <h2>Добавить пост</h2>\n        <div class="form-inputs">\n          <textarea id="post-description" class="textarea" placeholder="Описание поста..." rows="4"></textarea>\n           <div class="upload-area" id="upload-area">\n            <label for="file-input" class="file-upload-label">\n              <span id="upload-text">Перетащите изображение сюда или кликните для выбора</span>\n              <input type="file" id="file-input" accept="image/*" style="display: none;">\n            </label>\n            <div id="image-preview" class="image-preview"></div>\n          </div>\n        </div>\n        <button class="button" id="add-button">Добавить</button>\n      </div>\n    </div>\n    `\n\n        appEl.innerHTML = appHtml\n\n        const fileInput = document.getElementById("file-input")\n        const uploadArea = document.getElementById("upload-area")\n        const imagePreview = document.getElementById("image-preview")\n        const uploadText = document.getElementById("upload-text")\n        const descriptionInput = document.getElementById("post-description")\n\n        fileInput.addEventListener("change", (e) => {\n            const file = e.target.files[0]\n            if (file) {\n                const reader = new FileReader()\n                reader.onload = (event) => {\n                    imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview" class="preview-image">`\n                    uploadText.textContent = "Файл выбран: " + file.name\n                }\n                reader.readAsDataURL(file)\n            }\n        })\n\n        uploadArea.addEventListener("dragover", (e) => {\n            e.preventDefault()\n            uploadArea.classList.add("dragover")\n        })\n\n        uploadArea.addEventListener("dragleave", () => {\n            uploadArea.classList.remove("dragover")\n        })\n\n        uploadArea.addEventListener("drop", (e) => {\n            e.preventDefault()\n            uploadArea.classList.remove("dragover")\n            const file = e.dataTransfer.files[0]\n            if (file && file.type.match("image.*")) {\n                fileInput.files = e.dataTransfer.files\n                const reader = new FileReader()\n                reader.onload = (event) => {\n                    imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview" class="preview-image">`\n                    uploadText.textContent = "Файл выбран: " + file.name\n                }\n                reader.readAsDataURL(file)\n            }\n        })\n\n        document.getElementById("add-button").addEventListener("click", () => {\n            const description = descriptionInput.value.trim()\n\n            if (!fileInput.files[0]) {\n                alert("Пожалуйста, выберите изображение")\n                return\n            }\n\n            if (!description) {\n                alert("Пожалуйста, введите описание поста")\n                return\n            }\n\n            const imageUrl = fileInput.files[0]\n                ? URL.createObjectURL(fileInput.files[0])\n                : ""\n\n            onAddPostClick({\n                description: description,\n                imageUrl: imageUrl,\n            })\n        })\n    }\n\n    render()\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./components/add-post-page-component.js?',
                )

                /***/
            },

        /***/ "./components/api.js":
            /*!***************************!*\
  !*** ./components/api.js ***!
  \***************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addPost: () => (/* binding */ addPost),\n/* harmony export */   dislikePost: () => (/* binding */ dislikePost),\n/* harmony export */   getPosts: () => (/* binding */ getPosts),\n/* harmony export */   getUserPosts: () => (/* binding */ getUserPosts),\n/* harmony export */   likePost: () => (/* binding */ likePost),\n/* harmony export */   loginUser: () => (/* binding */ loginUser),\n/* harmony export */   registerUser: () => (/* binding */ registerUser),\n/* harmony export */   uploadImage: () => (/* binding */ uploadImage)\n/* harmony export */ });\nconst personalKey = "vera-pershina"\nconst baseHost = `https://wedev-api.sky.pro/api/v1/${personalKey}/instapro`\nconst authHost = "https://wedev-api.sky.pro/api/user"\n\n// Получение всех постов\nfunction getPosts({ token }) {\n    return fetch(`${baseHost}`, {\n        method: "GET",\n        headers: token ? { Authorization: token } : {},\n    })\n        .then((response) => {\n            if (response.status === 401) {\n                throw new Error("Нет авторизации")\n            }\n            return response.json()\n        })\n        .then((data) => {\n            return data.posts\n        })\n}\n\n// Получение постов конкретного пользователя\nfunction getUserPosts({ token, userId }) {\n    return fetch(`${baseHost}/user-posts/${userId}`, {\n        method: "GET",\n        headers: token ? { Authorization: token } : {},\n    })\n        .then((response) => {\n            if (response.status === 401) {\n                throw new Error("Нет авторизации")\n            }\n            return response.json()\n        })\n        .then((data) => {\n            return data.posts\n        })\n}\n\n// Добавление нового поста\nfunction addPost({ token, description, imageUrl }) {\n    return fetch(`${baseHost}`, {\n        method: "POST",\n        headers: {\n            Authorization: token,\n        },\n        body: JSON.stringify({\n            description,\n            imageUrl,\n        }),\n    }).then((response) => {\n        if (!response.ok) {\n            return response.json().then((errorData) => {\n                throw new Error(errorData.error || "Не удалось добавить пост")\n            })\n        }\n        return response.json()\n    })\n}\n\n// Поставить лайк\nfunction likePost({ token, postId }) {\n    return fetch(`${baseHost}/${postId}/like`, {\n        method: "POST",\n        headers: {\n            Authorization: token,\n        },\n    }).then((response) => {\n        if (!response.ok) {\n            throw new Error("Не удалось поставить лайк")\n        }\n        return response.json()\n    })\n}\n\n// Убрать лайк\nfunction dislikePost({ token, postId }) {\n    return fetch(`${baseHost}/${postId}/dislike`, {\n        method: "POST",\n        headers: {\n            Authorization: token,\n        },\n    }).then((response) => {\n        if (!response.ok) {\n            throw new Error("Не удалось убрать лайк")\n        }\n        return response.json()\n    })\n}\n\n// Регистрация пользователя\nfunction registerUser({ login, password, name, imageUrl }) {\n    return fetch(`${authHost}`, {\n        method: "POST",\n        body: JSON.stringify({\n            login,\n            password,\n            name,\n            imageUrl,\n        }),\n    }).then((response) => {\n        if (!response.ok) {\n            return response.json().then((errorData) => {\n                const errorMessage =\n                    errorData.error ||\n                    (response.status === 400\n                        ? "Пользователь с таким логином уже существует"\n                        : "Ошибка регистрации")\n                throw new Error(errorMessage)\n            })\n        }\n        return response.json()\n    })\n}\n\n// Авторизация пользователя\nfunction loginUser({ login, password }) {\n    return fetch(`${authHost}/login`, {\n        method: "POST",\n        body: JSON.stringify({\n            login,\n            password,\n        }),\n    }).then((response) => {\n        if (!response.ok) {\n            return response.json().then((errorData) => {\n                throw new Error(errorData.error || "Неверный логин или пароль")\n            })\n        }\n\n        return response.json()\n    })\n}\n\nfunction uploadImage({ file }) {\n    const data = new FormData()\n    data.append("file", file)\n\n    return fetch(`${baseHost}/upload/image`, {\n        method: "POST",\n        body: data,\n    })\n        .then((response) => {\n            if (!response.ok) {\n                throw new Error("Ошибка загрузки изображения")\n            }\n            return response.json()\n        })\n        .then((data) => {\n            return { fileUrl: data.fileUrl }\n        })\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./components/api.js?',
                )

                /***/
            },

        /***/ "./components/auth-page-component.js":
            /*!*******************************************!*\
  !*** ./components/auth-page-component.js ***!
  \*******************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderAuthPageComponent: () => (/* binding */ renderAuthPageComponent)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./components/api.js");\n/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");\n/* harmony import */ var _upload_image_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-image-component.js */ "./components/upload-image-component.js");\n\n\n\n\n/**\n * Компонент страницы авторизации.\n * Этот компонент предоставляет пользователю интерфейс для входа в систему или регистрации.\n * Форма переключается между режимами "Вход" и "Регистрация".\n *\n * @param {HTMLElement} params.appEl - Корневой элемент приложения, в который будет рендериться страница.\n * @param {Function} params.setUser - Функция, вызываемая при успешной авторизации или регистрации.\n *                                    Принимает объект пользователя в качестве аргумента.\n */\nfunction renderAuthPageComponent({ appEl, setUser }) {\n    let isLoginMode = true\n    let imageUrl = ""\n\n    const renderForm = () => {\n        const appHtml = `\n      <div class="page-container">\n          <div class="header-container"></div>\n          <div class="form">\n              <h3 class="form-title">\n                ${isLoginMode ? "Вход в&nbsp;Instapro" : "Регистрация в&nbsp;Instapro"}\n              </h3>\n              <div class="form-inputs">\n                  ${\n                      !isLoginMode\n                          ? `\n                      <div class="upload-image-container"></div>\n                      <input type="text" id="name-input" class="input" placeholder="Имя" />\n                      `\n                          : ""\n                  }\n                  <input type="text" id="login-input" class="input" placeholder="Логин" />\n                  <input type="password" id="password-input" class="input" placeholder="Пароль" />\n                  <div class="form-error"></div>\n                  <button class="button" id="login-button">${\n                      isLoginMode ? "Войти" : "Зарегистрироваться"\n                  }</button>\n              </div>\n              <div class="form-footer">\n                <p class="form-footer-title">\n                  ${isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}\n                  <button class="link-button" id="toggle-button">\n                    ${isLoginMode ? "Зарегистрироваться." : "Войти."}\n                  </button>\n                </p>\n              </div>\n          </div>\n      </div>    \n    `\n\n        appEl.innerHTML = appHtml\n\n        const setError = (message) => {\n            appEl.querySelector(".form-error").textContent = message\n        }\n\n        ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({\n            element: document.querySelector(".header-container"),\n        })\n\n        const uploadImageContainer = appEl.querySelector(\n            ".upload-image-container",\n        )\n        if (uploadImageContainer) {\n            (0,_upload_image_component_js__WEBPACK_IMPORTED_MODULE_2__.renderUploadImageComponent)({\n                element: uploadImageContainer,\n                onImageUrlChange(newImageUrl) {\n                    imageUrl = newImageUrl\n                },\n            })\n        }\n\n        document\n            .getElementById("login-button")\n            .addEventListener("click", () => {\n                setError("")\n\n                if (isLoginMode) {\n                    const login = document.getElementById("login-input").value\n                    const password =\n                        document.getElementById("password-input").value\n\n                    if (!login) {\n                        alert("Введите логин")\n                        return\n                    }\n\n                    if (!password) {\n                        alert("Введите пароль")\n                        return\n                    }\n\n                    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.loginUser)({ login, password })\n                        .then((user) => {\n                            setUser(user.user)\n                        })\n                        .catch((error) => {\n                            console.warn(error)\n                            setError(error.message)\n                        })\n                } else {\n                    const login = document.getElementById("login-input").value\n                    const name = document.getElementById("name-input").value\n                    const password =\n                        document.getElementById("password-input").value\n\n                    if (!name) {\n                        alert("Введите имя")\n                        return\n                    }\n\n                    if (!login) {\n                        alert("Введите логин")\n                        return\n                    }\n\n                    if (!password) {\n                        alert("Введите пароль")\n                        return\n                    }\n\n                    if (!imageUrl) {\n                        alert("Не выбрана фотография")\n                        return\n                    }\n\n                    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registerUser)({ login, password, name, imageUrl })\n                        .then((user) => {\n                            setUser(user.user)\n                        })\n                        .catch((error) => {\n                            console.error("Registration error:", error)\n                            setError(\n                                error.message ||\n                                    "Произошла ошибка при регистрации",\n                            )\n                        })\n                }\n            })\n\n        document\n            .getElementById("toggle-button")\n            .addEventListener("click", () => {\n                isLoginMode = !isLoginMode\n                renderForm()\n            })\n    }\n\n    renderForm()\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./components/auth-page-component.js?',
                )

                /***/
            },

        /***/ "./components/header-component.js":
            /*!****************************************!*\
  !*** ./components/header-component.js ***!
  \****************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderHeaderComponent: () => (/* binding */ renderHeaderComponent)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./index.js");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes.js */ "./components/routes.js");\n\n\n\n/**\n * Компонент заголовка страницы.\n * Этот компонент отображает шапку страницы с логотипом, кнопкой добавления постов/входа и кнопкой выхода (если пользователь авторизован).\n *\n * @param {HTMLElement} params.element - HTML-элемент, в который будет рендериться заголовок.\n * @returns {HTMLElement} Возвращает элемент заголовка после рендеринга.\n */\nfunction renderHeaderComponent({ element }) {\n    /**\n     * Рендерит содержимое заголовка.\n     */\n    element.innerHTML = `\n  <div class="page-header">\n      <h1 class="logo">instapro</h1>\n      <button class="header-button add-or-login-button">\n      ${\n          _index_js__WEBPACK_IMPORTED_MODULE_0__.user\n              ? `<div title="Добавить пост" class="add-post-sign"></div>`\n              : "Войти"\n      }\n      </button>\n      ${\n          _index_js__WEBPACK_IMPORTED_MODULE_0__.user\n              ? `<button title="${_index_js__WEBPACK_IMPORTED_MODULE_0__.user.name}" class="header-button logout-button">Выйти</button>`\n              : ""\n      }  \n  </div>\n  `\n\n    /**\n     * Обработчик клика по кнопке "Добавить пост"/"Войти".\n     * Если пользователь авторизован, перенаправляет на страницу добавления постов.\n     * Если пользователь не авторизован, перенаправляет на страницу авторизации.\n     */\n    element\n        .querySelector(".add-or-login-button")\n        .addEventListener("click", () => {\n            if (_index_js__WEBPACK_IMPORTED_MODULE_0__.user) {\n                (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.ADD_POSTS_PAGE)\n            } else {\n                (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.AUTH_PAGE)\n            }\n        })\n\n    /**\n     * Обработчик клика по логотипу.\n     * Перенаправляет на страницу с постами.\n     */\n    element.querySelector(".logo").addEventListener("click", () => {\n        ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.POSTS_PAGE)\n    })\n\n    /**\n     * Обработчик клика по кнопке "Выйти".\n     * Если кнопка существует (т.е. пользователь авторизован), вызывает функцию `logout`.\n     */\n    element.querySelector(".logout-button")?.addEventListener("click", _index_js__WEBPACK_IMPORTED_MODULE_0__.logout)\n\n    return element\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./components/header-component.js?',
                )

                /***/
            },

        /***/ "./components/loading-page-component.js":
            /*!**********************************************!*\
  !*** ./components/loading-page-component.js ***!
  \**********************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLoadingPageComponent: () => (/* binding */ renderLoadingPageComponent)\n/* harmony export */ });\n/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");\n\n\n/**\n * Компонент страницы загрузки.\n * Этот компонент отображает страницу с индикатором загрузки и заголовком.\n * Используется для отображения промежуточного состояния, пока выполняется загрузка данных или другой процесс.\n *\n * @param {HTMLElement} params.appEl - Корневой элемент приложения, в который будет рендериться страница загрузки.\n * @param {Object} params.user - Объект пользователя, содержащий данные о текущем авторизованном пользователе (если он есть).\n * @param {Function} params.goToPage - Функция для навигации по страницам.\n */\nfunction renderLoadingPageComponent({ appEl, user, goToPage }) {\n    /**\n     * HTML-разметка страницы загрузки.\n     * Содержит контейнер заголовка и индикатор загрузки.\n     */\n    const appHtml = `\n              <div class="page-container">\n                <div class="header-container"></div>\n                <div class="loading-page">\n                  <div class="loader"><div></div><div></div><div></div></div>\n                </div>\n              </div>`\n\n    // Устанавливаем разметку в корневой элемент приложения\n    appEl.innerHTML = appHtml\n\n    /**\n     * Рендеринг заголовка с использованием компонента `renderHeaderComponent`.\n     * Передаются данные пользователя и функция навигации.\n     */\n    ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_0__.renderHeaderComponent)({\n        user,\n        element: document.querySelector(".header-container"),\n        goToPage,\n    })\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./components/loading-page-component.js?',
                )

                /***/
            },

        /***/ "./components/posts-page-component.js":
            /*!********************************************!*\
  !*** ./components/posts-page-component.js ***!
  \********************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderPostsPageComponent: () => (/* binding */ renderPostsPageComponent)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error("Cannot find module \'../routes.js\'"); e.code = \'MODULE_NOT_FOUND\'; throw e; }());\n/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index.js */ "./index.js");\n\n\n\n\nfunction renderPostsPageComponent({ appEl }) {\n    console.log("Актуальный список постов:", _index_js__WEBPACK_IMPORTED_MODULE_2__.posts)\n\n    // Генерируем HTML для каждого поста\n    const postsHtml = _index_js__WEBPACK_IMPORTED_MODULE_2__.posts\n        .map(\n            (post) => `\n    <li class="post">\n      <!-- Шапка поста с информацией о пользователе -->\n      <div class="post-header" data-user-id="${post.user.id}">\n        <img src="${post.user.imageUrl}" class="post-header__user-image">\n        <p class="post-header__user-name">${post.user.name}</p>\n      </div>\n      \n      <!-- Изображение поста -->\n      <div class="post-image-container">\n        <img class="post-image" src="${post.imageUrl}">\n      </div>\n      \n      <!-- Блок с лайками -->\n      <div class="post-likes">\n        <button data-post-id="${post.id}" class="like-button">\n          <!-- Меняем иконку лайка в зависимости от того, лайкнул ли пользователь -->\n          <img src="./assets/images/like-${post.isLiked ? "active" : "not-active"}.svg">\n        </button>\n        <p class="post-likes-text">\n          Нравится: <strong>${post.likes.length}</strong>\n        </p>\n      </div>\n      \n      <!-- Текст поста -->\n      <p class="post-text">\n        <span class="user-name">${post.user.name}</span>\n        ${post.description}\n      </p>\n  `,\n        )\n        .join("") // Объединяем все посты в одну строку\n\n    // Основной HTML контейнер\n    const appHtml = `\n    <div class="page-container">\n      <div class="header-container"></div>\n      <ul class="posts">\n        ${postsHtml}\n      </ul>\n    </div>`\n\n    // Вставляем сгенерированный HTML в приложение\n    appEl.innerHTML = appHtml\n\n    // Рендерим компонент шапки\n    ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({\n        element: document.querySelector(".header-container"),\n    })\n\n    // Добавляем обработчики клика на аватары пользователей\n    for (let userEl of document.querySelectorAll(".post-header")) {\n        userEl.addEventListener("click", () => {\n            ;(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.goToPage)(Object(function webpackMissingModule() { var e = new Error("Cannot find module \'../routes.js\'"); e.code = \'MODULE_NOT_FOUND\'; throw e; }()), {\n                userId: userEl.dataset.userId,\n            })\n        })\n    }\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./components/posts-page-component.js?',
                )

                /***/
            },

        /***/ "./components/upload-image-component.js":
            /*!**********************************************!*\
  !*** ./components/upload-image-component.js ***!
  \**********************************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderUploadImageComponent: () => (/* binding */ renderUploadImageComponent),\n/* harmony export */   renderUserPostsPageComponent: () => (/* binding */ renderUserPostsPageComponent)\n/* harmony export */ });\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes.js */ "./components/routes.js");\n/* harmony import */ var _header_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-component.js */ "./components/header-component.js");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index.js */ "./index.js");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.js */ "./components/api.js");\n\n\n\n\n\nfunction renderUserPostsPageComponent({ appEl }) {\n    if (!_index_js__WEBPACK_IMPORTED_MODULE_2__.posts) {\n        appEl.innerHTML = `\n      <div class="page-container">\n        <div class="header-container"></div>\n        <div class="posts-loading">Загрузка данных...</div>\n      </div>\n    `\n        ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({\n            element: document.querySelector(".header-container"),\n        })\n        return\n    }\n\n    if (_index_js__WEBPACK_IMPORTED_MODULE_2__.posts.length === 0) {\n        appEl.innerHTML = `\n      <div class="page-container">\n        <div class="header-container"></div>\n        <div class="posts-loading">У пользователя пока нет постов</div>\n      </div>\n    `\n        ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({\n            element: document.querySelector(".header-container"),\n        })\n        return\n    }\n\n    if (_index_js__WEBPACK_IMPORTED_MODULE_2__.posts.length === 0) {\n        appEl.innerHTML = `\n      <div class="page-container">\n        <div class="header-container"></div>\n        <div class="posts-loading">У пользователя пока нет постов</div>\n      </div>\n    `\n        ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({\n            element: document.querySelector(".header-container"),\n        })\n        return\n    }\n\n    const user = _index_js__WEBPACK_IMPORTED_MODULE_2__.posts[0]?.user\n    if (!user) {\n        appEl.innerHTML = `\n      <div class="page-container">\n        <div class="header-container"></div>\n        <div class="posts-loading">Ошибка загрузки данных пользователя</div>\n      </div>\n    `\n        ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({\n            element: document.querySelector(".header-container"),\n        })\n        return\n    }\n    const postsHtml = _index_js__WEBPACK_IMPORTED_MODULE_2__.posts\n        .map((post) => {\n            const userImageUrl = post.user.imageUrl || "/default-avatar.png"\n            const postImageUrl = post.imageUrl || "/default-post.png"\n\n            return `\n        <li class="post">\n          <div class="post-header" data-user-id="${post.user.id}">\n            <img src="${userImageUrl}" \n                 class="post-header__user-image"\n                 onerror="this.src=\'/default-avatar.png\'">\n            <p class="post-header__user-name">${post.user.name}</p>\n          </div>\n          <div class="post-image-container">\n            <img class="post-image" \n                 src="${postImageUrl}" \n                 alt="Пост пользователя ${post.user.name}"\n                 onerror="this.src=\'/default-post.png\'">\n          </div>\n          <div class="post-footer">\n            <p class="post-text">${post.description}</p>\n            <p class="post-date">${new Date(post.createdAt).toLocaleString()}</p>\n          </div>\n        </li>\n      `\n        })\n        .join("")\n\n    const appHtml = `\n        <div class="page-container">\n          <div class="header-container"></div>\n          <div class="user-posts-header">\n            <img src="${user.imageUrl || "/default-avatar.png"}" \n                 class="user-posts-header__user-image"\n                 onerror="this.src=\'/default-avatar.png\'">\n            <h2 class="user-posts-header__user-name">${user.name}</h2>\n          </div>\n          <ul class="posts">${postsHtml}</ul>\n        </div>\n      `\n\n    appEl.innerHTML = appHtml\n    ;(0,_header_component_js__WEBPACK_IMPORTED_MODULE_1__.renderHeaderComponent)({\n        element: document.querySelector(".header-container"),\n    })\n\n    document.querySelectorAll(".post-header").forEach((header) => {\n        header.addEventListener("click", () => {\n            ;(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_0__.USER_POSTS_PAGE, { userId: header.dataset.userId })\n        })\n    })\n}\n\nfunction renderUploadImageComponent({\n    element,\n    onImageUrlChange,\n    onUploadError,\n}) {\n    let imageUrl = ""\n\n    const render = () => {\n        element.innerHTML = `\n          <div class="upload-image">\n            <label class="upload-label">\n              <input type="file" class="file-input" accept="image/*" style="display: none;">\n              <span class="upload-text">${imageUrl ? "Фото выбрано" : "Выберите фото"}</span>\n            </label>\n            <div class="image-preview">\n            ${imageUrl ? `<img src="${imageUrl}" class="preview-image">` : ""}\n            </div>\n            ${imageUrl ? `<button class="file-upload-remove-button">Удалить</button>` : ""}\n          </div>\n        `\n\n        const fileInput = element.querySelector(".file-input")\n        const removeButton = element.querySelector(".file-upload-remove-button")\n\n        fileInput?.addEventListener("change", async (event) => {\n            const file = event.target.files[0]\n            if (!file) return\n\n            try {\n                element.querySelector(".upload-text").textContent =\n                    "Загрузка..."\n                const tempUrl = URL.createObjectURL(file)\n                element.querySelector(".image-preview").innerHTML =\n                    `<img src="${tempUrl}" class="preview-image">`\n\n                const { fileUrl } = await (0,_api_js__WEBPACK_IMPORTED_MODULE_3__.uploadImage)({ file })\n                imageUrl = fileUrl\n\n                if (onImageUrlChange) {\n                    onImageUrlChange(imageUrl)\n                }\n                URL.revokeObjectURL(tempUrl)\n                render()\n            } catch (error) {\n                console.error("Ошибка загрузки изображения:", error)\n                if (onUploadError) {\n                    onUploadError(error.message)\n                }\n                render()\n            }\n        })\n\n        removeButton?.addEventListener("click", () => {\n            imageUrl = ""\n            if (onImageUrlChange) {\n                onImageUrlChange(imageUrl)\n            }\n            render()\n        })\n    }\n\n    render()\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./components/upload-image-component.js?',
                )

                /***/
            },

        /***/ "./helpers.js":
            /*!********************!*\
  !*** ./helpers.js ***!
  \********************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserFromLocalStorage: () => (/* binding */ getUserFromLocalStorage),\n/* harmony export */   removeUserFromLocalStorage: () => (/* binding */ removeUserFromLocalStorage),\n/* harmony export */   saveUserToLocalStorage: () => (/* binding */ saveUserToLocalStorage)\n/* harmony export */ });\nfunction saveUserToLocalStorage(user) {\n    window.localStorage.setItem("user", JSON.stringify(user))\n}\n\n// eslint-disable-next-line no-unused-vars\nfunction getUserFromLocalStorage(user) {\n    try {\n        return JSON.parse(window.localStorage.getItem("user"))\n        // eslint-disable-next-line no-unused-vars\n    } catch (error) {\n        return null\n    }\n}\n\nfunction removeUserFromLocalStorage() {\n    window.localStorage.removeItem("user")\n}\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./helpers.js?',
                )

                /***/
            },

        /***/ "./index.js":
            /*!******************!*\
  !*** ./index.js ***!
  \******************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   goToPage: () => (/* binding */ goToPage),\n/* harmony export */   logout: () => (/* binding */ logout),\n/* harmony export */   page: () => (/* binding */ page),\n/* harmony export */   posts: () => (/* binding */ posts),\n/* harmony export */   user: () => (/* binding */ user)\n/* harmony export */ });\n/* harmony import */ var _components_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/api.js */ "./components/api.js");\n/* harmony import */ var _components_add_post_page_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/add-post-page-component.js */ "./components/add-post-page-component.js");\n/* harmony import */ var _components_auth_page_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/auth-page-component.js */ "./components/auth-page-component.js");\n/* harmony import */ var _components_routes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/routes.js */ "./components/routes.js");\n/* harmony import */ var _components_posts_page_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/posts-page-component.js */ "./components/posts-page-component.js");\n/* harmony import */ var _components_loading_page_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/loading-page-component.js */ "./components/loading-page-component.js");\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers.js */ "./helpers.js");\n\n\n\n\n\n\n\n\nlet user = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_6__.getUserFromLocalStorage)()\nlet page = null\nlet posts = []\n\nconst getToken = () => {\n    const token = user ? `Bearer ${user.token}` : undefined\n    return token\n}\n\nconst logout = () => {\n    user = null\n    ;(0,_helpers_js__WEBPACK_IMPORTED_MODULE_6__.removeUserFromLocalStorage)()\n    goToPage(_components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE)\n}\n\n/**\n * Включает страницу приложения\n */\nconst goToPage = (newPage, data) => {\n    if (\n        [\n            _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE,\n            _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.AUTH_PAGE,\n            _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.ADD_POSTS_PAGE,\n            _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.USER_POSTS_PAGE,\n            _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.LOADING_PAGE,\n        ].includes(newPage)\n    ) {\n        if (newPage === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.ADD_POSTS_PAGE) {\n            /* Если пользователь не авторизован, то отправляем его на страницу авторизации перед добавлением поста */\n            page = user ? _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.ADD_POSTS_PAGE : _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.AUTH_PAGE\n            return renderApp()\n        }\n\n        if (newPage === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE) {\n            page = _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.LOADING_PAGE\n            renderApp()\n\n            return (0,_components_api_js__WEBPACK_IMPORTED_MODULE_0__.getPosts)({ token: getToken() })\n                .then((newPosts) => {\n                    page = _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE\n                    posts = newPosts\n                    renderApp()\n                })\n                .catch((error) => {\n                    console.error(error)\n                    goToPage(_components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE)\n                })\n        }\n\n        if (newPage === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.USER_POSTS_PAGE) {\n            // @@TODO: реализовать получение постов юзера из API\n            console.log("Открываю страницу пользователя: ", data.userId)\n            page = _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.USER_POSTS_PAGE\n            posts = []\n            return renderApp()\n        }\n\n        page = newPage\n        renderApp()\n\n        return\n    }\n\n    throw new Error("страницы не существует")\n}\n\nconst renderApp = () => {\n    const appEl = document.getElementById("app")\n    if (page === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.LOADING_PAGE) {\n        return (0,_components_loading_page_component_js__WEBPACK_IMPORTED_MODULE_5__.renderLoadingPageComponent)({\n            appEl,\n            user,\n            goToPage,\n        })\n    }\n\n    if (page === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.AUTH_PAGE) {\n        return (0,_components_auth_page_component_js__WEBPACK_IMPORTED_MODULE_2__.renderAuthPageComponent)({\n            appEl,\n            setUser: (newUser) => {\n                user = newUser\n                ;(0,_helpers_js__WEBPACK_IMPORTED_MODULE_6__.saveUserToLocalStorage)(user)\n                goToPage(_components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE)\n            },\n            user,\n            goToPage,\n        })\n    }\n\n    if (page === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.ADD_POSTS_PAGE) {\n        return (0,_components_add_post_page_component_js__WEBPACK_IMPORTED_MODULE_1__.renderAddPostPageComponent)({\n            appEl,\n            onAddPostClick({ description, imageUrl }) {\n                // @TODO: реализовать добавление поста в API\n                console.log("Добавляю пост...", { description, imageUrl })\n                goToPage(_components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE)\n            },\n        })\n    }\n\n    if (page === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE) {\n        return (0,_components_posts_page_component_js__WEBPACK_IMPORTED_MODULE_4__.renderPostsPageComponent)({\n            appEl,\n        })\n    }\n\n    if (page === _components_routes_js__WEBPACK_IMPORTED_MODULE_3__.USER_POSTS_PAGE) {\n        // @TODO: реализовать страницу с фотографиями отдельного пользвателя\n        appEl.innerHTML = "Здесь будет страница фотографий пользователя"\n        return\n    }\n}\n\ngoToPage(_components_routes_js__WEBPACK_IMPORTED_MODULE_3__.POSTS_PAGE)\n\n\n//# sourceURL=webpack://webdev-cw-instapro/./index.js?',
                )

                /***/
            },

        /******/
    }
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {}
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId]
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {},
            /******/
        })
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](
            module,
            module.exports,
            __webpack_require__,
        )
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports
        /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ ;(() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
            /******/ for (var key in definition) {
                /******/ if (
                    __webpack_require__.o(definition, key) &&
                    !__webpack_require__.o(exports, key)
                ) {
                    /******/ Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key],
                    })
                    /******/
                }
                /******/
            }
            /******/
        }
        /******/
    })()
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/
    ;(() => {
        /******/ __webpack_require__.o = (obj, prop) =>
            Object.prototype.hasOwnProperty.call(obj, prop)
        /******/
    })()
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/
    ;(() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = (exports) => {
            /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module",
                })
                /******/
            }
            /******/ Object.defineProperty(exports, "__esModule", {
                value: true,
            })
            /******/
        }
        /******/
    })()
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/ var __webpack_exports__ = __webpack_require__("./index.js")
    /******/
    /******/
})()
