/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

  "use strict";


  module.exports = ansiHTML

  // Reference to https://github.com/sindresorhus/ansi-regex
  var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

  var _defColors = {
    reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
    black: '000',
    red: 'ff0000',
    green: '209805',
    yellow: 'e8bf03',
    blue: '0000ff',
    magenta: 'ff00ff',
    cyan: '00ffee',
    lightgrey: 'f0f0f0',
    darkgrey: '888'
  }
  var _styles = {
    30: 'black',
    31: 'red',
    32: 'green',
    33: 'yellow',
    34: 'blue',
    35: 'magenta',
    36: 'cyan',
    37: 'lightgrey'
  }
  var _openTags = {
    '1': 'font-weight:bold', // bold
    '2': 'opacity:0.5', // dim
    '3': '<i>', // italic
    '4': '<u>', // underscore
    '8': 'display:none', // hidden
    '9': '<del>' // delete
  }
  var _closeTags = {
    '23': '</i>', // reset italic
    '24': '</u>', // reset underscore
    '29': '</del>' // reset delete
  }

  ;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
    _closeTags[n] = '</span>'
  })

  /**
   * Converts text with ANSI color codes to HTML markup.
   * @param {String} text
   * @returns {*}
   */
  function ansiHTML (text) {
    // Returns the text if the string has no ANSI escape code.
    if (!_regANSI.test(text)) {
      return text
    }

    // Cache opened sequence.
    var ansiCodes = []
    // Replace with markup.
    var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
      var ot = _openTags[seq]
      if (ot) {
        // If current sequence has been opened, close it.
        if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
          ansiCodes.pop()
          return '</span>'
        }
        // Open tag.
        ansiCodes.push(seq)
        return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
      }

      var ct = _closeTags[seq]
      if (ct) {
        // Pop sequence
        ansiCodes.pop()
        return ct
      }
      return ''
    })

    // Make sure tags are closed.
    var l = ansiCodes.length
    ;(l > 0) && (ret += Array(l + 1).join('</span>'))

    return ret
  }

  /**
   * Customize colors.
   * @param {Object} colors reference to _defColors
   */
  ansiHTML.setColors = function (colors) {
    if (typeof colors !== 'object') {
      throw new Error('`colors` parameter must be an Object.')
    }

    var _finalColors = {}
    for (var key in _defColors) {
      var hex = colors.hasOwnProperty(key) ? colors[key] : null
      if (!hex) {
        _finalColors[key] = _defColors[key]
        continue
      }
      if ('reset' === key) {
        if (typeof hex === 'string') {
          hex = [hex]
        }
        if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
          return typeof h !== 'string'
        })) {
          throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
        }
        var defHexColor = _defColors[key]
        if (!hex[0]) {
          hex[0] = defHexColor[0]
        }
        if (hex.length === 1 || !hex[1]) {
          hex = [hex[0]]
          hex.push(defHexColor[1])
        }

        hex = hex.slice(0, 2)
      } else if (typeof hex !== 'string') {
        throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
      }
      _finalColors[key] = hex
    }
    _setTags(_finalColors)
  }

  /**
   * Reset colors.
   */
  ansiHTML.reset = function () {
    _setTags(_defColors)
  }

  /**
   * Expose tags, including open and close.
   * @type {Object}
   */
  ansiHTML.tags = {}

  if (Object.defineProperty) {
    Object.defineProperty(ansiHTML.tags, 'open', {
      get: function () { return _openTags }
    })
    Object.defineProperty(ansiHTML.tags, 'close', {
      get: function () { return _closeTags }
    })
  } else {
    ansiHTML.tags.open = _openTags
    ansiHTML.tags.close = _closeTags
  }

  function _setTags (colors) {
    // reset all
    _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
    // inverse
    _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
    // dark grey
    _openTags['90'] = 'color:#' + colors.darkgrey

    for (var code in _styles) {
      var color = _styles[code]
      var oriColor = colors[color] || '000'
      _openTags[code] = 'color:#' + oriColor
      code = parseInt(code)
      _openTags[(code + 10).toString()] = 'background:#' + oriColor
    }
  }

  ansiHTML.reset()


  /***/ }),

  /***/ "./src/comment-api-service.js":
  /*!************************************!*\
    !*** ./src/comment-api-service.js ***!
    \************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ CommentsApiService)
  /* harmony export */ });
  /* harmony import */ var _framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework/api-service.js */ "./src/framework/api-service.js");

  const Method = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE'
  };
  class CommentsApiService extends _framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    async getComments(filmId) {
      const response = await this._load({
        url: `comments/${filmId}`
      });
      return _framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseResponse(response);
    }
    async addComment(comment, filmId) {
      const response = await this._load({
        url: `comments/${filmId}`,
        method: Method.POST,
        body: JSON.stringify(this.#adaptToServer(comment)),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const parsedResponse = await _framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseResponse(response);
      return parsedResponse;
    }
    async deleteComment(comment) {
      const response = await this._load({
        url: `comments/${comment.id}`,
        method: Method.DELETE
      });
      return response;
    }
    #adaptToServer(comment) {
      const adaptedComment = {
        ...comment
      };
      delete adaptedComment.id;
      delete adaptedComment.author;
      delete adaptedComment.date;
      return adaptedComment;
    }
  }

  /***/ }),

  /***/ "./src/film-api-service.js":
  /*!*********************************!*\
    !*** ./src/film-api-service.js ***!
    \*********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmsApiService)
  /* harmony export */ });
  /* harmony import */ var _framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework/api-service.js */ "./src/framework/api-service.js");

  const Method = {
    GET: 'GET',
    PUT: 'PUT'
  };
  class FilmsApiService extends _framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get films() {
      return this._load({
        url: 'movies'
      }).then(_framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseResponse);
    }
    async updateFilm(film) {
      const response = await this._load({
        url: `movies/${film.id}`,
        method: Method.PUT,
        body: JSON.stringify(this.#adaptToServer(film)),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const parsedResponse = await _framework_api_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].parseResponse(response);
      return parsedResponse;
    }
    #adaptToServer(film) {
      const adaptedFilm = {
        ...film,
        'film_info': {
          ...film.filmInfo,
          'alternative_title': film.filmInfo.alternativeTitle,
          'total_rating': film.filmInfo.totalRating,
          'age_rating': film.filmInfo.ageRating,
          release: {
            date: film.filmInfo.release.date !== null ? film.filmInfo.release.date.toISOString() : null,
            'release_country': film.filmInfo.release.releaseCountry
          }
        },
        'user_details': {
          ...film.userDetails,
          'already_watched': film.userDetails.alreadyWatched,
          'watching_date': film.userDetails.watchingDate !== null ? film.userDetails.watchingDate.toISOString() : null
        }
      };

      // Ненужные ключи мы удаляем
      delete adaptedFilm.filmInfo;
      delete adaptedFilm['film_info'].alternativeTitle;
      delete adaptedFilm['film_info'].totalRating;
      delete adaptedFilm['film_info'].ageRating;
      delete adaptedFilm['film_info'].release.releaseCountry;
      delete adaptedFilm.userDetails;
      delete adaptedFilm['user_details'].alreadyWatched;
      delete adaptedFilm['user_details'].watchingDate;
      return adaptedFilm;
    }
  }

  /***/ }),

  /***/ "./src/framework/api-service.js":
  /*!**************************************!*\
    !*** ./src/framework/api-service.js ***!
    \**************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ ApiService)
  /* harmony export */ });
  /**
   * Класс для отправки запросов к серверу
   */
  class ApiService {
    /**
     * @param {string} endPoint Адрес сервера
     * @param {string} authorization Авторизационный токен
     */
    constructor(endPoint, authorization) {
      this._endPoint = endPoint;
      this._authorization = authorization;
    }

    /**
     * Метод для отправки запроса к серверу
     * @param {Object} config Объект с настройками
     * @param {string} config.url Адрес относительно сервера
     * @param {string} [config.method] Метод запроса
     * @param {string} [config.body] Тело запроса
     * @param {Headers} [config.headers] Заголовки запроса
     * @returns {Promise<Response>}
     */
    async _load(_ref) {
      let {
        url,
        method = 'GET',
        body = null,
        headers = new Headers()
      } = _ref;
      headers.append('Authorization', this._authorization);
      const response = await fetch(`${this._endPoint}/${url}`, {
        method,
        body,
        headers
      });
      try {
        ApiService.checkStatus(response);
        return response;
      } catch (err) {
        ApiService.catchError(err);
      }
    }

    /**
     * Метод для обработки ответа
     * @param {Response} response Объект ответа
     * @returns {Promise<JSON>}
     */
    static parseResponse(response) {
      return response.json();
    }

    /**
     * Метод для проверки ответа
     * @param {Response} response Объект ответа
     */
    static checkStatus(response) {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }

    /**
     * Метод для обработки ошибок
     * @param {Error} err Объект ошибки
     */
    static catchError(err) {
      throw err;
    }
  }

  /***/ }),

  /***/ "./src/framework/observable.js":
  /*!*************************************!*\
    !*** ./src/framework/observable.js ***!
    \*************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ Observable)
  /* harmony export */ });
  /**
   * Класс, реализующий паттерн Наблюдатель.
   */
  class Observable {
    /** @type {Set<observerCallback>} Множество функций типа observerCallback */
    #observers = new Set();

    /**
     * Метод, позволяющий подписаться на событие
     * @param {observerCallback} observer Функция, которая будет вызвана при наступлении события
     */
    addObserver(observer) {
      this.#observers.add(observer);
    }

    /**
     * Метод, позволяющий отписаться от события
     * @param {observerCallback} observer Функция, которую больше не нужно вызывать при наступлении события
     */
    removeObserver(observer) {
      this.#observers.delete(observer);
    }

    /**
     * Метод для оповещения подписчиков о наступлении события
     * @param {*} event Тип события
     * @param {*} payload Дополнительная информация
     */
    _notify(event, payload) {
      this.#observers.forEach(observer => observer(event, payload));
    }
  }

  /**
   * Функция, которая будет вызвана при наступлении события
   * @callback observerCallback
   * @param {*} event Тип события
   * @param {*} [payload] Дополнительная информация
   */

  /***/ }),

  /***/ "./src/framework/render.js":
  /*!*********************************!*\
    !*** ./src/framework/render.js ***!
    \*********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
  /* harmony export */   "createElement": () => (/* binding */ createElement),
  /* harmony export */   "remove": () => (/* binding */ remove),
  /* harmony export */   "render": () => (/* binding */ render),
  /* harmony export */   "replace": () => (/* binding */ replace)
  /* harmony export */ });
  /* harmony import */ var _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/abstract-view.js */ "./src/framework/view/abstract-view.js");


  /** @enum {string} Перечисление возможных позиций для отрисовки */
  const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend'
  };

  /**
   * Функция для создания элемента на основе разметки
   * @param {string} template Разметка в виде строки
   * @returns {HTMLElement} Созданный элемент
   */
  function createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  }

  /**
   * Функция для отрисовки элемента
   * @param {AbstractView} component Компонент, который должен был отрисован
   * @param {HTMLElement} container Элемент в котором будет отрисован компонент
   * @param {string} place Позиция компонента относительно контейнера. По умолчанию - `beforeend`
   */
  function render(component, container) {
    let place = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RenderPosition.BEFOREEND;
    if (!(component instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      throw new Error('Can render only components');
    }
    if (container === null) {
      throw new Error('Container element doesn\'t exist');
    }
    container.insertAdjacentElement(place, component.element);
  }

  /**
   * Функция для замены одного компонента на другой
   * @param {AbstractView} newComponent Компонент, который нужно показать
   * @param {AbstractView} oldComponent Компонент, который нужно скрыть
   */
  function replace(newComponent, oldComponent) {
    if (!(newComponent instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] && oldComponent instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      throw new Error('Can replace only components');
    }
    const newElement = newComponent.element;
    const oldElement = oldComponent.element;
    const parent = oldElement.parentElement;
    if (parent === null) {
      throw new Error('Parent element doesn\'t exist');
    }
    parent.replaceChild(newElement, oldElement);
  }

  /**
   * Функция для удаления компонента
   * @param {AbstractView} component Компонент, который нужно удалить
   */
  function remove(component) {
    if (component === null) {
      return;
    }
    if (!(component instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      throw new Error('Can remove only components');
    }
    component.element.remove();
    component.removeElement();
  }


  /***/ }),

  /***/ "./src/framework/ui-blocker/ui-blocker.js":
  /*!************************************************!*\
    !*** ./src/framework/ui-blocker/ui-blocker.js ***!
    \************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ UiBlocker)
  /* harmony export */ });
  /* harmony import */ var _ui_blocker_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui-blocker.css */ "./src/framework/ui-blocker/ui-blocker.css");


  /**
   * Класс для блокировки интерфейса
   */
  class UiBlocker {
    /** @type {number} Время до блокировки интерфейса в миллисекундах */
    #lowerLimit;

    /** @type {number} Минимальное время блокировки интерфейса в миллисекундах */
    #upperLimit;

    /** @type {HTMLElement|null} Элемент, блокирующий интерфейс */
    #element;

    /** @type {number} Время вызова метода block */
    #startTime;

    /** @type {number} Время вызова метода unblock */
    #endTime;

    /** @type {number} Идентификатор таймера */
    #timerId;

    /**
     * @param {Object} config Объект с настройками блокировщика
     * @param {number} config.lowerLimit Время до блокировки интерфейса в миллисекундах. Если вызвать метод unblock раньше, то интерфейс заблокирован не будет
     * @param {number} config.upperLimit Минимальное время блокировки в миллисекундах. Минимальная длительность блокировки
     */
    constructor(_ref) {
      let {
        lowerLimit,
        upperLimit
      } = _ref;
      this.#lowerLimit = lowerLimit;
      this.#upperLimit = upperLimit;
      this.#element = document.createElement('div');
      this.#element.classList.add('ui-blocker');
      document.body.append(this.#element);
    }

    /** Метод для блокировки интерфейса */
    block() {
      this.#startTime = Date.now();
      this.#timerId = setTimeout(() => {
        this.#addClass();
      }, this.#lowerLimit);
    }

    /** Метод для разблокировки интерфейса */
    unblock() {
      this.#endTime = Date.now();
      const duration = this.#endTime - this.#startTime;
      if (duration < this.#lowerLimit) {
        clearTimeout(this.#timerId);
        return;
      }
      if (duration >= this.#upperLimit) {
        this.#removeClass();
        return;
      }
      setTimeout(this.#removeClass, this.#upperLimit - duration);
    }

    /** Метод, добавляющий CSS-класс элементу */
    #addClass = () => {
      this.#element.classList.add('ui-blocker--on');
    };

    /** Метод, убирающий CSS-класс с элемента */
    #removeClass = () => {
      this.#element.classList.remove('ui-blocker--on');
    };
  }

  /***/ }),

  /***/ "./src/framework/view/abstract-stateful-view.js":
  /*!******************************************************!*\
    !*** ./src/framework/view/abstract-stateful-view.js ***!
    \******************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ AbstractStatefulView)
  /* harmony export */ });
  /* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/framework/view/abstract-view.js");


  /**
   * Абстрактный класс представления с состоянием
   */
  class AbstractStatefulView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /** @type {Object} Объект состояния */
    _state = {};

    /**
     * Метод для обновления состояния и перерисовки элемента
     * @param {Object} update Объект с обновлённой частью состояния
     */
    updateElement(update) {
      if (!update) {
        return;
      }
      this._setState(update);
      this.#rerenderElement();
    }

    /**
     * Метод для восстановления обработчиков после перерисовки элемента
     * @abstract
     */
    _restoreHandlers() {
      throw new Error('Abstract method not implemented: restoreHandlers');
    }

    /**
     * Метод для обновления состояния
     * @param {Object} update Объект с обновлённой частью состояния
     */
    _setState(update) {
      this._state = structuredClone({
        ...this._state,
        ...update
      });
    }

    /** Метод для перерисовки элемента */
    #rerenderElement() {
      const prevElement = this.element;
      const parent = prevElement.parentElement;
      this.removeElement();
      const newElement = this.element;
      parent.replaceChild(newElement, prevElement);
      this._restoreHandlers();
    }
  }

  /***/ }),

  /***/ "./src/framework/view/abstract-view.js":
  /*!*********************************************!*\
    !*** ./src/framework/view/abstract-view.js ***!
    \*********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ AbstractView)
  /* harmony export */ });
  /* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/framework/render.js");
  /* harmony import */ var _abstract_view_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-view.css */ "./src/framework/view/abstract-view.css");



  /** @const {string} Класс, реализующий эффект "покачивания головой" */
  const SHAKE_CLASS_NAME = 'shake';

  /** @const {number} Время анимации в миллисекундах */
  const SHAKE_ANIMATION_TIMEOUT = 600;

  /**
   * Абстрактный класс представления
   */
  class AbstractView {
    /** @type {HTMLElement|null} Элемент представления */
    #element = null;

    /** @type {Object} Объект с колбэками. Может использоваться для хранения обработчиков событий */
    _callback = {};
    constructor() {
      if (new.target === AbstractView) {
        throw new Error('Can\'t instantiate AbstractView, only concrete one.');
      }
    }

    /**
     * Геттер для получения элемента
     * @returns {HTMLElement} Элемент представления
     */
    get element() {
      if (!this.#element) {
        this.#element = (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template);
      }
      return this.#element;
    }

    /**
     * Геттер для получения разметки элемента
     * @abstract
     * @returns {string} Разметка элемента в виде строки
     */
    get template() {
      throw new Error('Abstract method not implemented: get template');
    }

    /** Метод для удаления элемента */
    removeElement() {
      this.#element = null;
    }

    /**
     * Метод, реализующий эффект "покачивания головой"
     * @param {shakeCallback} [callback] Функция, которая будет вызвана после завершения анимации
     */
    shake(callback) {
      this.element.classList.add(SHAKE_CLASS_NAME);
      setTimeout(() => {
        this.element.classList.remove(SHAKE_CLASS_NAME);
        callback?.();
      }, SHAKE_ANIMATION_TIMEOUT);
    }
  }

  /**
   * Функция, которая будет вызвана методом shake после завершения анимации
   * @callback shakeCallback
   */

  /***/ }),

  /***/ "./src/main.js":
  /*!*********************!*\
    !*** ./src/main.js ***!
    \*********************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _presenter_main_board_presenter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/main-board-presenter.js */ "./src/presenter/main-board-presenter.js");
  /* harmony import */ var _model_films_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/films-model.js */ "./src/model/films-model.js");
  /* harmony import */ var _model_comments_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/comments-model.js */ "./src/model/comments-model.js");
  /* harmony import */ var _model_filter_model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/filter-model.js */ "./src/model/filter-model.js");
  /* harmony import */ var _film_api_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./film-api-service.js */ "./src/film-api-service.js");
  /* harmony import */ var _comment_api_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./comment-api-service.js */ "./src/comment-api-service.js");






  const AUTHORIZATION = 'Basic KAHUKYJlbl';
  const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';
  const filmsModel = new _model_films_model_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    filmsApiService: new _film_api_service_js__WEBPACK_IMPORTED_MODULE_4__["default"](END_POINT, AUTHORIZATION)
  });
  const commentsModel = new _model_comments_model_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    commentsApiService: new _comment_api_service_js__WEBPACK_IMPORTED_MODULE_5__["default"](END_POINT, AUTHORIZATION)
  });
  const filterModel = new _model_filter_model_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  const mainBoardPresenter = new _presenter_main_board_presenter_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: document.querySelector('.main'),
    filmsModel,
    commentsModel,
    filterModel
  });
  mainBoardPresenter.init();
  filmsModel.init();

  /***/ }),

  /***/ "./src/model/comments-model.js":
  /*!*************************************!*\
    !*** ./src/model/comments-model.js ***!
    \*************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ CommentsModel)
  /* harmony export */ });
  /* harmony import */ var _framework_observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/observable.js */ "./src/framework/observable.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");


  class CommentsModel extends _framework_observable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #commentsApiService = null;
    #comments = [];
    #filmCard = null;
    constructor(_ref) {
      let {
        commentsApiService
      } = _ref;
      super();
      this.#commentsApiService = commentsApiService;
    }
    get comments() {
      return this.#comments;
    }
    async init(film) {
      this.#filmCard = film;
      try {
        const comments = await this.#commentsApiService.getComments(film.id);
        this.#comments = comments.map(this.#adaptToClient);
      } catch (err) {
        this.#comments = [];
      }
      this._notify(_util_const_js__WEBPACK_IMPORTED_MODULE_1__.UpdateType.INIT);
    }
    async addComment(updateType, update) {
      try {
        const response = await this.#commentsApiService.addComment(update, this.#filmCard.id);
        this.#comments = response.comments.map(comment => this.#adaptToClient(comment));
        this._notify(updateType, response.movie);
      } catch (err) {
        throw new Error('Can\'t add comment');
      }
    }
    async deleteComment(updateType, update, filmCard) {
      const index = this.#comments.findIndex(comment => comment.id === update.id);
      if (index === -1) {
        throw new Error('Can\'t delete unexisting comment');
      }
      try {
        await this.#commentsApiService.deleteComment(update);
        this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];
        this._notify(updateType, {
          ...filmCard,
          comments: filmCard.comments.filter(comment => comment !== update.id)
        });
      } catch (err) {
        throw new Error('Can\'t delete comment');
      }
    }
    #adaptToClient(comment) {
      const adaptedComment = {
        ...comment,
        date: comment.date !== null ? new Date(comment.date) : null
      };
      return adaptedComment;
    }
  }

  /***/ }),

  /***/ "./src/model/films-model.js":
  /*!**********************************!*\
    !*** ./src/model/films-model.js ***!
    \**********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmsModel)
  /* harmony export */ });
  /* harmony import */ var _framework_observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/observable.js */ "./src/framework/observable.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");


  class FilmsModel extends _framework_observable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #filmsApiService = null;
    #films = [];
    #data = null;
    constructor(_ref) {
      let {
        filmsApiService
      } = _ref;
      super();
      this.#filmsApiService = filmsApiService;
    }
    get films() {
      return this.#films;
    }
    async init() {
      let updateType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _util_const_js__WEBPACK_IMPORTED_MODULE_1__.UpdateType.INIT;
      try {
        const films = await this.#filmsApiService.films;
        this.#films = films.map(this.#adaptToClient);
      } catch (err) {
        this.#films = [];
      }
      this._notify(updateType, this.#data);
    }
    async updateFilm(updateType, update) {
      const index = this.#films.findIndex(film => film.id === update.id);
      if (index === -1) {
        throw new Error('Can\'t update unexisting film');
      }
      try {
        const response = await this.#filmsApiService.updateFilm(update);
        const updatedFilm = this.#adaptToClient(response);
        this.#films = [...this.#films.slice(0, index), updatedFilm, ...this.#films.slice(index + 1)];
        this._notify(updateType, updatedFilm);
      } catch (err) {
        throw new Error('Can\'t update film');
      }
    }
    handleCommentsModelChange = (updateType, data) => {
      if (updateType !== _util_const_js__WEBPACK_IMPORTED_MODULE_1__.UpdateType.INIT) {
        this.#data = data.filmInfo ? data : this.#adaptToClient(data);
        this.init(updateType);
      }
    };
    #adaptToClient(film) {
      const filmInfoProp = film['film_info'];
      const releaseProp = filmInfoProp['release'];
      const userDetailsProp = film['user_details'];
      const adaptedFilm = {
        ...film,
        filmInfo: {
          ...filmInfoProp,
          alternativeTitle: filmInfoProp['alternative_title'],
          totalRating: filmInfoProp['total_rating'],
          ageRating: filmInfoProp['age_rating'],
          release: {
            date: releaseProp['date'] !== null ? new Date(releaseProp['date']) : null,
            releaseCountry: releaseProp['release_country']
          }
        },
        userDetails: {
          ...userDetailsProp,
          alreadyWatched: userDetailsProp['already_watched'],
          watchingDate: userDetailsProp['watching_date'] !== null ? new Date(userDetailsProp['watching_date']) : null
        }
      };
      delete adaptedFilm['film_info'];
      delete adaptedFilm.filmInfo['alternative_title'];
      delete adaptedFilm.filmInfo['total_rating'];
      delete adaptedFilm.filmInfo['age_rating'];
      delete adaptedFilm.filmInfo.release['release_country'];
      delete adaptedFilm['user_details'];
      delete adaptedFilm.userDetails['already_watched'];
      delete adaptedFilm.userDetails['watching_date'];
      return adaptedFilm;
    }
  }

  /***/ }),

  /***/ "./src/model/filter-model.js":
  /*!***********************************!*\
    !*** ./src/model/filter-model.js ***!
    \***********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilterModel)
  /* harmony export */ });
  /* harmony import */ var _framework_observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/observable.js */ "./src/framework/observable.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");


  class FilterModel extends _framework_observable_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #filter = _util_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterType.ALL;
    get filter() {
      return this.#filter;
    }
    setFilter(updateType, filter) {
      this.#filter = filter;
      this._notify(updateType, filter);
    }
  }

  /***/ }),

  /***/ "./src/presenter/film-card-presenter.js":
  /*!**********************************************!*\
    !*** ./src/presenter/film-card-presenter.js ***!
    \**********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmCardPresenter)
  /* harmony export */ });
  /* harmony import */ var _view_film_card_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/film-card-view.js */ "./src/view/film-card-view.js");
  /* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");



  class FilmCardPresenter {
    #filmCardContainer = null;
    #handleFilmCardChange = null;
    #handleModeChange = null;
    #filmCardComponent = null;
    #filmCard = null;
    constructor(_ref) {
      let {
        onFilmCardChange,
        filmCardContainer,
        onModeChange
      } = _ref;
      this.#handleFilmCardChange = onFilmCardChange;
      this.#filmCardContainer = filmCardContainer;
      this.#handleModeChange = onModeChange;
    }
    init(_ref2) {
      let {
        filmCard
      } = _ref2;
      this.#filmCard = filmCard;
      const prevFilmCardComponent = this.#filmCardComponent;
      this.#filmCardComponent = new _view_film_card_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        filmCard: this.#filmCard,
        onFilmCardClick: this.#handleFilmCardClick,
        onWatchlistClick: this.#handleWatchlistClick,
        onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
        onFavoriteClick: this.#handleFavoriteClick
      });
      if (prevFilmCardComponent === null) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this.#filmCardComponent, this.#filmCardContainer);
        return;
      }
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.replace)(this.#filmCardComponent, prevFilmCardComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.remove)(prevFilmCardComponent);
    }
    destroy() {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.remove)(this.#filmCardComponent);
    }
    setAborting() {
      this.#filmCardComponent.shake();
    }
    #handleWatchlistClick = () => {
      this.#handleFilmCardChange(_util_const_js__WEBPACK_IMPORTED_MODULE_2__.UserAction.UPDATE_FILM_CARD, _util_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateType.MINOR, {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          watchlist: !this.#filmCard.userDetails.watchlist
        }
      }, this);
    };
    #handleAlreadyWatchedClick = () => {
      this.#handleFilmCardChange(_util_const_js__WEBPACK_IMPORTED_MODULE_2__.UserAction.UPDATE_FILM_CARD, _util_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateType.MINOR, {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          alreadyWatched: !this.#filmCard.userDetails.alreadyWatched
        }
      }, this);
    };
    #handleFavoriteClick = () => {
      this.#handleFilmCardChange(_util_const_js__WEBPACK_IMPORTED_MODULE_2__.UserAction.UPDATE_FILM_CARD, _util_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateType.MINOR, {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          favorite: !this.#filmCard.userDetails.favorite
        }
      }, this);
    };
    #handleFilmCardClick = () => {
      this.#handleModeChange(this.#filmCard);
    };
  }

  /***/ }),

  /***/ "./src/presenter/film-extra-presenter.js":
  /*!***********************************************!*\
    !*** ./src/presenter/film-extra-presenter.js ***!
    \***********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmExtraPresenter)
  /* harmony export */ });
  /* harmony import */ var _view_film_list_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/film-list-view.js */ "./src/view/film-list-view.js");
  /* harmony import */ var _view_film_list_header_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/film-list-header-view.js */ "./src/view/film-list-header-view.js");
  /* harmony import */ var _view_film_container_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/film-container-view.js */ "./src/view/film-container-view.js");
  /* harmony import */ var _film_card_presenter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./film-card-presenter.js */ "./src/presenter/film-card-presenter.js");
  /* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");






  class FilmExtraPresenter {
    #filmExtraListComponent = new _view_film_list_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    #filmExtraHeaderComponent = new _view_film_list_header_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    #filmExtraContainerComponent = new _view_film_container_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    #container = null;
    #filmExtraHeader = '';
    #filmExtraCardCount = 0;
    #filmExtraSortCB = null;
    #filmCards = [];
    #filmExtraCards = [];
    #filmCardPresenterList = null;
    #popupPresenter = null;
    #filmsModel = null;
    #commentsModel = null;
    #handleFilmCardChange = null;
    constructor(_ref) {
      let {
        container,
        filmExtraCardCount,
        filmExtraHeader,
        filmExtraSortCB,
        filmCardPresenterList,
        onFilmCardChange,
        popupPresenter,
        mode,
        filmsModel,
        commentsModel
      } = _ref;
      this.#container = container;
      this.#filmExtraCardCount = filmExtraCardCount;
      this.#filmExtraHeader = filmExtraHeader;
      this.#filmExtraSortCB = filmExtraSortCB;
      this.#filmCardPresenterList = filmCardPresenterList;
      this.#handleFilmCardChange = onFilmCardChange;
      this.#popupPresenter = popupPresenter;
      this.mode = mode;
      this.#filmsModel = filmsModel;
      this.#commentsModel = commentsModel;
      this.#filmsModel.addObserver(this.#handleModelEvent);
    }
    init(_ref2) {
      let {
        filmCards
      } = _ref2;
      this.#filmCards = filmCards;
      this.#renderFilmExtra();
    }
    #handleModelEvent = updateType => {
      if (updateType !== _util_const_js__WEBPACK_IMPORTED_MODULE_5__.UpdateType.INIT) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.remove)(this.#filmExtraListComponent);
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.remove)(this.#filmExtraContainerComponent);
        this.#filmExtraListComponent = new _view_film_list_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.#filmExtraContainerComponent = new _view_film_container_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.init({
          filmCards: this.#filmsModel.films
        });
      }
    };
    #handleModeChange = filmCard => {
      this.#popupPresenter.removePopup();
      this.#popupPresenter.init(filmCard);
      this.#commentsModel.init(filmCard);
      this.mode(_util_const_js__WEBPACK_IMPORTED_MODULE_5__.Mode.POPUP);
    };
    #renderFilmCard(filmCard) {
      const filmCardPresenter = new _film_card_presenter_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
        onFilmCardChange: this.#handleFilmCardChange,
        filmCardContainer: this.#filmExtraContainerComponent.element,
        onModeChange: this.#handleModeChange
      });
      filmCardPresenter.init({
        filmCard
      });
      if (this.#filmCardPresenterList.has(filmCard.id)) {
        const updatedSameCardPresenters = this.#filmCardPresenterList.get(filmCard.id);
        updatedSameCardPresenters.push(filmCardPresenter);
        this.#filmCardPresenterList.set(filmCard.id, updatedSameCardPresenters);
        return;
      }
      const sameCardPresenters = [];
      sameCardPresenters.push(filmCardPresenter);
      this.#filmCardPresenterList.set(filmCard.id, sameCardPresenters);
    }
    #renderFilmCards(from, to) {
      this.#filmExtraCards.slice(from, to).forEach(filmCard => this.#renderFilmCard(filmCard));
    }
    #renderFilmList() {
      this.#renderFilmCards(0, Math.min(this.#filmExtraCards.length, this.#filmExtraCardCount));
    }
    #renderFilmContainer() {
      this.#filmExtraListComponent.element.classList.add('films-list--extra');
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(this.#filmExtraListComponent, this.#container.element);
      this.#filmExtraHeaderComponent.element.innerHTML = this.#filmExtraHeader;
      this.#filmExtraHeaderComponent.element.classList.remove('visually-hidden');
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(this.#filmExtraHeaderComponent, this.#filmExtraListComponent.element);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(this.#filmExtraContainerComponent, this.#filmExtraListComponent.element);
    }
    #renderFilmExtra() {
      if (!this.#container.element.contains(this.#filmExtraListComponent.element)) {
        this.#renderFilmContainer();
      }
      if (this.#filmCards.length > 0) {
        this.#filmExtraCards = [...this.#filmCards].sort(this.#filmExtraSortCB);
        this.#renderFilmList();
      }
    }
  }

  /***/ }),

  /***/ "./src/presenter/filter-bar-presenter.js":
  /*!***********************************************!*\
    !*** ./src/presenter/filter-bar-presenter.js ***!
    \***********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilterBarPresenter)
  /* harmony export */ });
  /* harmony import */ var _view_filter_bar_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/filter-bar-view */ "./src/view/filter-bar-view.js");
  /* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");
  /* harmony import */ var _util_film_card_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/film-card-filter.js */ "./src/util/film-card-filter.js");




  class FilterBarPresenter {
    #container = null;
    #filmsModel = null;
    #filterModel = null;
    #filterBarComponent = null;
    constructor(_ref) {
      let {
        container,
        filmsModel,
        filterModel
      } = _ref;
      this.#container = container;
      this.#filmsModel = filmsModel;
      this.#filterModel = filterModel;
      this.#filterModel.addObserver(this.#handleModelEvent);
      this.#filmsModel.addObserver(this.#handleModelEvent);
    }
    get filters() {
      const films = this.#filmsModel.films;
      return [{
        type: _util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.ALL,
        name: 'All movies',
        count: _util_film_card_filter_js__WEBPACK_IMPORTED_MODULE_3__.filter[_util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.ALL](films).length
      }, {
        type: _util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.WATCHLIST,
        name: 'Watchlist',
        count: _util_film_card_filter_js__WEBPACK_IMPORTED_MODULE_3__.filter[_util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.WATCHLIST](films).length
      }, {
        type: _util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.HISTORY,
        name: 'History',
        count: _util_film_card_filter_js__WEBPACK_IMPORTED_MODULE_3__.filter[_util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.HISTORY](films).length
      }, {
        type: _util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.FAVORITES,
        name: 'Favorites',
        count: _util_film_card_filter_js__WEBPACK_IMPORTED_MODULE_3__.filter[_util_const_js__WEBPACK_IMPORTED_MODULE_2__.FilterType.FAVORITES](films).length
      }];
    }
    init() {
      const filters = this.filters;
      const prevFilterComponent = this.#filterBarComponent;
      this.#filterBarComponent = new _view_filter_bar_view__WEBPACK_IMPORTED_MODULE_0__["default"]({
        filters,
        currentFilterType: this.#filterModel.filter,
        onFilterTypeChange: this.#handleFilterTypeChange
      });
      if (prevFilterComponent === null) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this.#filterBarComponent, this.#container, _framework_render_js__WEBPACK_IMPORTED_MODULE_1__.RenderPosition.AFTERBEGIN);
        return;
      }
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.replace)(this.#filterBarComponent, prevFilterComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.remove)(prevFilterComponent);
    }
    #handleModelEvent = updateType => {
      if (updateType !== _util_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateType.INIT && updateType !== _util_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateType.PATCH) {
        this.init();
      }
    };
    #handleFilterTypeChange = filterType => {
      if (this.#filterModel.filter === filterType) {
        return;
      }
      this.#filterModel.setFilter(_util_const_js__WEBPACK_IMPORTED_MODULE_2__.UpdateType.MAJOR, filterType);
    };
  }

  /***/ }),

  /***/ "./src/presenter/footer-statistic-presenter.js":
  /*!*****************************************************!*\
    !*** ./src/presenter/footer-statistic-presenter.js ***!
    \*****************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FooterStatisticPresenter)
  /* harmony export */ });
  /* harmony import */ var _view_footer_statistic_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/footer-statistic-view.js */ "./src/view/footer-statistic-view.js");
  /* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");


  class FooterStatisticPresenter {
    #container = null;
    #filmCardsCount = 0;
    constructor(_ref) {
      let {
        container
      } = _ref;
      this.#container = container;
    }
    init(filmsModel) {
      this.#filmCardsCount = filmsModel.films.length;
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(new _view_footer_statistic_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        filmsCount: this.#filmCardsCount
      }), this.#container);
    }
  }

  /***/ }),

  /***/ "./src/presenter/header-presenter.js":
  /*!*******************************************!*\
    !*** ./src/presenter/header-presenter.js ***!
    \*******************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ HeaderPresenter)
  /* harmony export */ });
  /* harmony import */ var _view_user_profile_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/user-profile-view */ "./src/view/user-profile-view.js");
  /* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");


  class HeaderPresenter {
    #container = null;
    #films = null;
    #userProfileComponent = null;
    #alreadyWatchedCount = 0;
    constructor() {
      this.#container = document.querySelector('.header');
    }
    init(_ref) {
      let {
        filmsModel
      } = _ref;
      this.#films = filmsModel.films;
      if (this.#userProfileComponent !== null) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.remove)(this.#userProfileComponent);
      }
      this.#alreadyWatchedCount = this.#films.filter(film => film.userDetails.alreadyWatched).length;
      if (this.#alreadyWatchedCount > 0) {
        this.#userProfileComponent = new _view_user_profile_view__WEBPACK_IMPORTED_MODULE_0__["default"]({
          alreadyWatched: this.#alreadyWatchedCount
        });
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this.#userProfileComponent, this.#container);
      }
    }
  }

  /***/ }),

  /***/ "./src/presenter/main-board-presenter.js":
  /*!***********************************************!*\
    !*** ./src/presenter/main-board-presenter.js ***!
    \***********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ MainBoardPresenter)
  /* harmony export */ });
  /* harmony import */ var _view_sort_bar_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/sort-bar-view.js */ "./src/view/sort-bar-view.js");
  /* harmony import */ var _view_no_film_cards_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/no-film-cards-view.js */ "./src/view/no-film-cards-view.js");
  /* harmony import */ var _view_loading_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/loading-view.js */ "./src/view/loading-view.js");
  /* harmony import */ var _view_film_wrapper_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/film-wrapper-view.js */ "./src/view/film-wrapper-view.js");
  /* harmony import */ var _view_film_list_view_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/film-list-view.js */ "./src/view/film-list-view.js");
  /* harmony import */ var _view_film_list_header_view_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/film-list-header-view.js */ "./src/view/film-list-header-view.js");
  /* harmony import */ var _view_film_container_view_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/film-container-view.js */ "./src/view/film-container-view.js");
  /* harmony import */ var _view_show_more_button_view_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view/show-more-button-view.js */ "./src/view/show-more-button-view.js");
  /* harmony import */ var _popup_presenter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./popup-presenter.js */ "./src/presenter/popup-presenter.js");
  /* harmony import */ var _filter_bar_presenter_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./filter-bar-presenter.js */ "./src/presenter/filter-bar-presenter.js");
  /* harmony import */ var _film_card_presenter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./film-card-presenter.js */ "./src/presenter/film-card-presenter.js");
  /* harmony import */ var _film_extra_presenter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./film-extra-presenter.js */ "./src/presenter/film-extra-presenter.js");
  /* harmony import */ var _header_presenter_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./header-presenter.js */ "./src/presenter/header-presenter.js");
  /* harmony import */ var _footer_statistic_presenter_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./footer-statistic-presenter.js */ "./src/presenter/footer-statistic-presenter.js");
  /* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
  /* harmony import */ var _framework_ui_blocker_ui_blocker_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../framework/ui-blocker/ui-blocker.js */ "./src/framework/ui-blocker/ui-blocker.js");
  /* harmony import */ var _util_sort_film_cards_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../util/sort-film-cards.js */ "./src/util/sort-film-cards.js");
  /* harmony import */ var _util_film_card_filter_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../util/film-card-filter.js */ "./src/util/film-card-filter.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");



















  const FILM_CARDS_COUNT_PER_STEP = 5;
  const TimeLimit = {
    LOWER_LIMIT: 100,
    UPPER_LIMIT: 600
  };
  class MainBoardPresenter {
    #page = document.querySelector('.page');
    #filmWrapperComponent = new _view_film_wrapper_view_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    #filmListComponent = new _view_film_list_view_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
    #filmHeaderComponent = new _view_film_list_header_view_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    #filmContainerComponent = new _view_film_container_view_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
    #showMoreButtonComponent = null;
    #sortBarComponent = null;
    #noFilmCardsComponent = null;
    #loadingComponent = new _view_loading_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    #uiBlocker = new _framework_ui_blocker_ui_blocker_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      lowerLimit: TimeLimit.LOWER_LIMIT,
      upperLimit: TimeLimit.UPPER_LIMIT
    });
    #popupPresenter = null;
    #filterBarPresenter = null;
    #topRatedPresenter = null;
    #mostCommentedPresenter = null;
    #headerPresenter = null;
    #footerStatisticPresenter = null;
    #container = null;
    #filmsModel = null;
    #commentsModel = null;
    #filterModel = null;
    #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
    #filmCardPresenterList = new Map();
    #currentSortType = _util_const_js__WEBPACK_IMPORTED_MODULE_18__.SortType.DEFAULT;
    #currentFilterType = _util_const_js__WEBPACK_IMPORTED_MODULE_18__.FilterType.ALL;
    #mode = _util_const_js__WEBPACK_IMPORTED_MODULE_18__.Mode.DEFAULT;
    #isLoading = true;
    constructor(_ref) {
      let {
        container,
        filmsModel,
        commentsModel,
        filterModel
      } = _ref;
      this.#container = container;
      this.#filmsModel = filmsModel;
      this.#commentsModel = commentsModel;
      this.#filterModel = filterModel;
      this.#popupPresenter = new _popup_presenter_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        container: this.#page,
        filmsModel,
        commentsModel: this.#commentsModel,
        onViewAction: this.#handleViewAction,
        onPopupRemove: this.#resetMode,
        getMode: this.#getMode
      });
      this.#topRatedPresenter = new _film_extra_presenter_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
        container: this.#filmWrapperComponent,
        filmExtraCardCount: _util_const_js__WEBPACK_IMPORTED_MODULE_18__.FILM_EXTRA_CARD_COUNT.topRated,
        filmExtraHeader: _util_const_js__WEBPACK_IMPORTED_MODULE_18__.FILM_EXTRA_HEADER.topRated,
        filmExtraSortCB: _util_sort_film_cards_js__WEBPACK_IMPORTED_MODULE_16__.sortTopRated,
        filmCardPresenterList: this.#filmCardPresenterList,
        onFilmCardChange: this.#handleViewAction,
        popupPresenter: this.#popupPresenter,
        mode: this.#setMode,
        filmsModel: this.#filmsModel,
        commentsModel: this.#commentsModel
      });
      this.#mostCommentedPresenter = new _film_extra_presenter_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
        container: this.#filmWrapperComponent,
        filmExtraCardCount: _util_const_js__WEBPACK_IMPORTED_MODULE_18__.FILM_EXTRA_CARD_COUNT.mostCommented,
        filmExtraHeader: _util_const_js__WEBPACK_IMPORTED_MODULE_18__.FILM_EXTRA_HEADER.mostCommented,
        filmExtraSortCB: _util_sort_film_cards_js__WEBPACK_IMPORTED_MODULE_16__.sortMostCommented,
        filmCardPresenterList: this.#filmCardPresenterList,
        onFilmCardChange: this.#handleViewAction,
        popupPresenter: this.#popupPresenter,
        mode: this.#setMode,
        filmsModel: this.#filmsModel,
        commentsModel: this.#commentsModel
      });
      this.#filterBarPresenter = new _filter_bar_presenter_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
        container: this.#container,
        filmsModel: this.#filmsModel,
        filterModel: this.#filterModel
      });
      this.#footerStatisticPresenter = new _footer_statistic_presenter_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
        container: document.querySelector('.footer__statistics')
      });
      this.#headerPresenter = new _header_presenter_js__WEBPACK_IMPORTED_MODULE_12__["default"]();
      this.#filmsModel.addObserver(this.#handleModelEvent);
      this.#filterModel.addObserver(this.#handleModelEvent);
    }
    get films() {
      this.#currentFilterType = this.#filterModel.filter;
      const films = this.#filmsModel.films;
      const filteredFilmCards = _util_film_card_filter_js__WEBPACK_IMPORTED_MODULE_17__.filter[this.#currentFilterType](films);
      switch (this.#currentSortType) {
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.SortType.DATE:
          return filteredFilmCards.sort(_util_sort_film_cards_js__WEBPACK_IMPORTED_MODULE_16__.sortMainDate);
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.SortType.RATING:
          return filteredFilmCards.sort(_util_sort_film_cards_js__WEBPACK_IMPORTED_MODULE_16__.sortMainRating);
      }
      return filteredFilmCards;
    }
    init() {
      this.#renderMainBoard();
    }
    #resetMode = () => {
      this.#mode = _util_const_js__WEBPACK_IMPORTED_MODULE_18__.Mode.DEFAULT;
    };
    #getMode = () => this.#mode;
    #setMode = newMode => {
      this.#mode = newMode;
    };
    #renderSortBar() {
      const prevSortBarComponent = this.#sortBarComponent;
      this.#sortBarComponent = new _view_sort_bar_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        onSortTypeChange: this.#handleSortTypeChange,
        currentSortType: this.#currentSortType
      });
      if (prevSortBarComponent === null) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#sortBarComponent, this.#container, _framework_render_js__WEBPACK_IMPORTED_MODULE_14__.RenderPosition.AFTERBEGIN);
        return;
      }
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.replace)(this.#sortBarComponent, prevSortBarComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.remove)(prevSortBarComponent);
    }
    #renderFilmCard(filmCard) {
      const filmCardPresenter = new _film_card_presenter_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
        onFilmCardChange: this.#handleViewAction,
        filmCardContainer: this.#filmContainerComponent.element,
        onModeChange: this.#handleModeChange
      });
      filmCardPresenter.init({
        filmCard
      });
      if (this.#filmCardPresenterList.has(filmCard.id)) {
        const updatedSameCardPresenters = this.#filmCardPresenterList.get(filmCard.id);
        updatedSameCardPresenters.push(filmCardPresenter);
        this.#filmCardPresenterList.set(filmCard.id, updatedSameCardPresenters);
        return;
      }
      const sameCardPresenters = [];
      sameCardPresenters.push(filmCardPresenter);
      this.#filmCardPresenterList.set(filmCard.id, sameCardPresenters);
    }
    #renderFilmCards(filmCards) {
      filmCards.forEach(filmCard => this.#renderFilmCard(filmCard));
    }
    #renderNoFilms() {
      this.#noFilmCardsComponent = new _view_no_film_cards_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        filterType: this.#currentFilterType
      });
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#noFilmCardsComponent, this.#filmListComponent.element, _framework_render_js__WEBPACK_IMPORTED_MODULE_14__.RenderPosition.AFTERBEGIN);
    }
    #renderLoading() {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#loadingComponent, this.#filmListComponent.element, _framework_render_js__WEBPACK_IMPORTED_MODULE_14__.RenderPosition.AFTERBEGIN);
    }
    #renderShowMoreButton() {
      this.#showMoreButtonComponent = new _view_show_more_button_view_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
        onClick: this.#handleShowMoreButtonClick
      });
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#showMoreButtonComponent, this.#filmListComponent.element);
    }
    #clearMainBoard() {
      let {
        resetRenderedFilmCardsCount = false,
        resetSortType = false
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const filmCardsCount = this.films.length;
      this.#filmCardPresenterList.forEach(presentersArr => presentersArr.forEach(presenter => presenter.destroy()));
      this.#filmCardPresenterList.clear();
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.remove)(this.#showMoreButtonComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.remove)(this.#loadingComponent);
      if (this.#noFilmCardsComponent) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.remove)(this.#noFilmCardsComponent);
      }
      if (resetRenderedFilmCardsCount) {
        this.#renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
      } else {
        this.#renderedFilmCardsCount = Math.min(filmCardsCount, this.#renderedFilmCardsCount);
      }
      if (resetSortType) {
        this.#currentSortType = _util_const_js__WEBPACK_IMPORTED_MODULE_18__.SortType.DEFAULT;
      }
    }
    #renderMainBoard() {
      if (!this.#container.contains(this.#filmWrapperComponent.element)) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#filmWrapperComponent, this.#container);
      }
      if (!this.#filmWrapperComponent.element.contains(this.#filmListComponent.element)) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#filmListComponent, this.#filmWrapperComponent.element);
      }
      if (this.#isLoading) {
        this.#renderLoading();
        return;
      }
      const filmCards = this.films;
      const filmCardsCount = filmCards.length;
      this.#renderSortBar();
      this.#filterBarPresenter.init();
      this.#renderExtra();
      if (filmCardsCount === 0) {
        this.#renderNoFilms();
        return;
      }
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#filmHeaderComponent, this.#filmListComponent.element);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.render)(this.#filmContainerComponent, this.#filmListComponent.element);
      this.#renderFilmCards(filmCards.slice(0, Math.min(filmCardsCount, this.#renderedFilmCardsCount)));
      if (filmCardsCount > this.#renderedFilmCardsCount) {
        this.#renderShowMoreButton();
      }
    }
    #renderExtra() {
      this.#topRatedPresenter.init({
        filmCards: this.#filmsModel.films
      });
      this.#mostCommentedPresenter.init({
        filmCards: this.#filmsModel.films
      });
    }
    #renderHeader() {
      this.#headerPresenter.init({
        filmsModel: this.#filmsModel
      });
    }
    #handleShowMoreButtonClick = () => {
      const filmCardsCount = this.films.length;
      const newRenderedFilmCardsCount = Math.min(filmCardsCount, this.#renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP);
      const filmCards = this.films.slice(this.#renderedFilmCardsCount, newRenderedFilmCardsCount);
      this.#renderFilmCards(filmCards);
      this.#renderedFilmCardsCount = newRenderedFilmCardsCount;
      if (this.#renderedFilmCardsCount >= filmCardsCount) {
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.remove)(this.#showMoreButtonComponent);
      }
    };
    #handleModeChange = filmCard => {
      this.#popupPresenter.removePopup();
      this.#popupPresenter.init(filmCard);
      this.#commentsModel.init(filmCard);
      this.#mode = _util_const_js__WEBPACK_IMPORTED_MODULE_18__.Mode.POPUP;
    };
    #handleViewAction = async (actionType, updateType, update, rest) => {
      this.#uiBlocker.block();
      switch (actionType) {
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.UserAction.UPDATE_FILM_CARD:
          try {
            await this.#filmsModel.updateFilm(updateType, update);
          } catch (err) {
            if (this.#popupPresenter === rest) {
              this.#popupPresenter.setAborting(actionType);
            }
            this.#filmCardPresenterList.get(update.id).find(presenter => presenter === rest)?.setAborting();
          }
          break;
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.UserAction.ADD_COMMENT:
          try {
            await this.#commentsModel.addComment(updateType, update);
            this.#popupPresenter.resetForm();
          } catch (err) {
            this.#popupPresenter.setAborting(actionType);
          }
          break;
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.UserAction.DELETE_COMMENT:
          try {
            await this.#commentsModel.deleteComment(updateType, update, rest);
          } catch (err) {
            this.#popupPresenter.setAborting(actionType, update);
          }
          break;
      }
      this.#uiBlocker.unblock();
    };
    #handleModelEvent = (updateType, data) => {
      switch (updateType) {
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.UpdateType.PATCH:
          this.#filmCardPresenterList.get(data.id)?.forEach(presenter => {
            presenter.init({
              filmCard: data
            });
          });
          break;
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.UpdateType.MINOR:
          this.#renderHeader();
          if (this.#filterModel.filter !== _util_const_js__WEBPACK_IMPORTED_MODULE_18__.FilterType.ALL) {
            this.#clearMainBoard({
              resetRenderedFilmCardsCount: this.films.length < 5
            });
            this.#renderMainBoard();
            break;
          }
          this.#filmCardPresenterList.get(data.id).forEach(presenter => {
            presenter.init({
              filmCard: data
            });
          });
          break;
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.UpdateType.MAJOR:
          this.#clearMainBoard({
            resetRenderedFilmCardsCount: true
          });
          this.#renderMainBoard();
          break;
        case _util_const_js__WEBPACK_IMPORTED_MODULE_18__.UpdateType.INIT:
          if (this.#isLoading) {
            this.#isLoading = false;
            (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_14__.remove)(this.#loadingComponent);
            this.#renderHeader();
            this.#renderMainBoard();
            this.#footerStatisticPresenter.init(this.#filmsModel);
            break;
          }
      }
    };
    #handleSortTypeChange = sortType => {
      if (this.#currentSortType === sortType) {
        return;
      }
      this.#clearMainBoard({
        resetRenderedFilmCardsCount: true,
        resetSortType: true
      });
      this.#currentSortType = sortType;
      this.#renderMainBoard();
    };
  }

  /***/ }),

  /***/ "./src/presenter/popup-presenter.js":
  /*!******************************************!*\
    !*** ./src/presenter/popup-presenter.js ***!
    \******************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupPresenter)
  /* harmony export */ });
  /* harmony import */ var _view_popup_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/popup-view.js */ "./src/view/popup-view.js");
  /* harmony import */ var _view_popup_film_details_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/popup-film-details-view.js */ "./src/view/popup-film-details-view.js");
  /* harmony import */ var _view_popup_film_controls_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/popup-film-controls-view.js */ "./src/view/popup-film-controls-view.js");
  /* harmony import */ var _view_popup_comment_container_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/popup-comment-container-view.js */ "./src/view/popup-comment-container-view.js");
  /* harmony import */ var _view_popup_comment_header_view_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/popup-comment-header-view.js */ "./src/view/popup-comment-header-view.js");
  /* harmony import */ var _view_popup_comment_list_view_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/popup-comment-list-view.js */ "./src/view/popup-comment-list-view.js");
  /* harmony import */ var _view_popup_comment_new_view_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/popup-comment-new-view.js */ "./src/view/popup-comment-new-view.js");
  /* harmony import */ var _view_popup_comment_view_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../view/popup-comment-view.js */ "./src/view/popup-comment-view.js");
  /* harmony import */ var _view_popup_comment_loading_view_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../view/popup-comment-loading-view.js */ "./src/view/popup-comment-loading-view.js");
  /* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");












  class PopupPresenter {
    #popupComponent = new _view_popup_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    #popupCommentContainerComponent = new _view_popup_comment_container_view_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    #popupCommentListComponent = new _view_popup_comment_list_view_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    #container = null;
    #filmCard = null;
    #commentsModel = null;
    #handleViewAction = null;
    #handlePopupRemoval = null;
    #getMode = null;
    #filmsModel = null;
    #popupFilmDetailsComponent = null;
    #popupFilmControlsComponent = null;
    #popupCommentHeaderComponent = null;
    #popupCommentNewComponent = null;
    #popupCommentLoadingComponent = null;
    #comments = [];
    #commentViews = [];
    #isLoading = true;
    constructor(_ref) {
      let {
        filmsModel,
        commentsModel,
        container,
        onViewAction,
        onPopupRemove,
        getMode
      } = _ref;
      this.#container = container;
      this.#handleViewAction = onViewAction;
      this.#filmsModel = filmsModel;
      this.#commentsModel = commentsModel;
      this.#handlePopupRemoval = onPopupRemove;
      this.#getMode = getMode;
      this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
      this.#commentsModel.addObserver(this.#filmsModel.handleCommentsModelChange);
      this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
    }
    init(filmCard) {
      this.#filmCard = filmCard;
      this.#popupCommentHeaderComponent = new _view_popup_comment_header_view_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
        filmCard: this.#filmCard
      });
      this.#popupFilmDetailsComponent = new _view_popup_film_details_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        filmCard: this.#filmCard,
        onXClick: this.removePopup
      });
      this.#popupFilmControlsComponent = new _view_popup_film_controls_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
        filmCard: this.#filmCard,
        onWatchlistClick: this.#watchlistClickHandler,
        onAlreadyWatchedClick: this.#alreadyWatchedClickHandler,
        onFavoriteClick: this.#favoriteClickHandler
      });
      if (!this.#popupCommentNewComponent) {
        this.#popupCommentNewComponent = new _view_popup_comment_new_view_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
          onFormSubmit: this.#handleFormSubmit,
          page: this.#container
        });
      }
      this.#popupCommentNewComponent?.addGlobalHandlers();
      this.#container.classList.add('hide-overflow');
      this.#container.addEventListener('keydown', this.#escKeyDownHandler);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupComponent, this.#container);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupFilmDetailsComponent, this.#popupComponent.element.firstElementChild);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupFilmControlsComponent, this.#popupComponent.element.firstElementChild, _framework_render_js__WEBPACK_IMPORTED_MODULE_9__.RenderPosition.BEFOREEND);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupCommentContainerComponent, this.#popupComponent.element.firstElementChild);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupCommentHeaderComponent, this.#popupCommentContainerComponent.element.firstElementChild);
      if (this.#isLoading) {
        this.#renderLoading();
      } else {
        this.#comments = this.#commentsModel.comments.filter(comment => this.#filmCard.comments.includes(comment.id));
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupCommentListComponent, this.#popupCommentContainerComponent.element.firstElementChild);
        for (const comment of this.#comments) {
          const commentView = new _view_popup_comment_view_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
            comment,
            onDeleteClick: this.#handleDeleteClick
          });
          (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(commentView, this.#popupCommentListComponent.element);
          this.#commentViews.push(commentView);
        }
      }
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupCommentNewComponent, this.#popupCommentContainerComponent.element.firstElementChild);
      if (this.#getMode() === _util_const_js__WEBPACK_IMPORTED_MODULE_10__.Mode.POPUP) {
        this.#popupComponent.restoreScroll();
      }
    }
    setAborting(actionType, comment) {
      if (actionType === _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.ADD_COMMENT) {
        this.#popupCommentNewComponent.shake(this.#popupCommentNewComponent.updateElement({
          isDisabled: false
        }));
      } else if (actionType === _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.DELETE_COMMENT) {
        const shakingCommentView = this.#commentViews.find(commentView => commentView.id === comment.id);
        const resetFormState = () => {
          shakingCommentView.updateElement({
            isDeleting: false
          });
        };
        shakingCommentView.shake(resetFormState);
      } else if (actionType === _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.UPDATE_FILM_CARD) {
        this.#popupFilmControlsComponent.shake();
      }
    }
    setDisabled() {
      this.#popupCommentNewComponent.updateElement({
        isDisabled: true
      });
    }
    setDeleting(commentComponent) {
      commentComponent.updateElement({
        isDeleting: true
      });
    }
    resetForm = () => {
      this.#popupCommentNewComponent.reset();
    };
    earsePopup = () => {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupFilmDetailsComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupFilmControlsComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupCommentHeaderComponent);
      this.#commentViews.forEach(commentView => (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(commentView));
      this.#popupComponent.element.remove();
    };
    removePopup = () => {
      this.#container.classList.remove('hide-overflow');
      this.#container.removeEventListener('keydown', this.#escKeyDownHandler);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupComponent);
      this.#popupComponent.reset();
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupCommentContainerComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupCommentHeaderComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupCommentListComponent);
      this.#commentViews.forEach(commentView => (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(commentView));
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupCommentNewComponent);
      this.#popupCommentNewComponent?.reset();
      this.#popupCommentNewComponent?.removeGlobalHandlers();
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupFilmDetailsComponent);
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupFilmControlsComponent);
      this.#handlePopupRemoval();
      this.#isLoading = true;
    };
    #renderLoading() {
      this.#popupCommentLoadingComponent = new _view_popup_comment_loading_view_js__WEBPACK_IMPORTED_MODULE_8__["default"]();
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.render)(this.#popupCommentLoadingComponent, this.#popupCommentContainerComponent.element.firstElementChild);
    }
    #handleCommentsModelEvent = updateType => {
      if (updateType === _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UpdateType.INIT) {
        this.#isLoading = false;
        (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_9__.remove)(this.#popupCommentLoadingComponent);
      }
      this.earsePopup();
      this.init(this.#filmsModel.films.find(element => element.id === this.#filmCard.id));
    };
    #handleFilmsModelEvent = () => {
      if (this.#getMode() === _util_const_js__WEBPACK_IMPORTED_MODULE_10__.Mode.POPUP) {
        this.earsePopup();
        this.init(this.#filmsModel.films.find(element => element.id === this.#filmCard.id));
      }
    };
    #handleFormSubmit = comment => {
      this.setDisabled();
      this.#handleViewAction(_util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.ADD_COMMENT, _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UpdateType.PATCH, comment);
    };
    #handleDeleteClick = (comment, commentComponent) => {
      this.setDeleting(commentComponent);
      this.#handleViewAction(_util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.DELETE_COMMENT, _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UpdateType.PATCH, comment, this.#filmCard);
    };
    #escKeyDownHandler = evt => {
      if (evt.code === 'Escape') {
        evt.preventDefault();
        this.removePopup();
      }
    };
    #watchlistClickHandler = () => {
      this.#handleViewAction(_util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.UPDATE_FILM_CARD, _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UpdateType.MINOR, {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          watchlist: !this.#filmCard.userDetails.watchlist
        }
      }, this);
    };
    #alreadyWatchedClickHandler = () => {
      this.#handleViewAction(_util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.UPDATE_FILM_CARD, _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UpdateType.MINOR, {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          alreadyWatched: !this.#filmCard.userDetails.alreadyWatched
        }
      }, this);
    };
    #favoriteClickHandler = () => {
      this.#handleViewAction(_util_const_js__WEBPACK_IMPORTED_MODULE_10__.UserAction.UPDATE_FILM_CARD, _util_const_js__WEBPACK_IMPORTED_MODULE_10__.UpdateType.MINOR, {
        ...this.#filmCard,
        userDetails: {
          ...this.#filmCard.userDetails,
          favorite: !this.#filmCard.userDetails.favorite
        }
      }, this);
    };
  }

  /***/ }),

  /***/ "./src/util/const.js":
  /*!***************************!*\
    !*** ./src/util/const.js ***!
    \***************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "Emotion": () => (/* binding */ Emotion),
  /* harmony export */   "FILM_EXTRA_CARD_COUNT": () => (/* binding */ FILM_EXTRA_CARD_COUNT),
  /* harmony export */   "FILM_EXTRA_HEADER": () => (/* binding */ FILM_EXTRA_HEADER),
  /* harmony export */   "FilterType": () => (/* binding */ FilterType),
  /* harmony export */   "Mode": () => (/* binding */ Mode),
  /* harmony export */   "SortType": () => (/* binding */ SortType),
  /* harmony export */   "UpdateType": () => (/* binding */ UpdateType),
  /* harmony export */   "UserAction": () => (/* binding */ UserAction)
  /* harmony export */ });
  const Emotion = {
    SMILE: 'smile',
    SLEEPING: 'sleeping',
    PUKE: 'puke',
    ANGRY: 'angry'
  };
  const FilterType = {
    ALL: 'all',
    WATCHLIST: 'watchlist',
    HISTORY: 'alreadyWatched',
    FAVORITES: 'favorite'
  };
  const SortType = {
    DEFAULT: 'default',
    DATE: 'date',
    RATING: 'rating'
  };
  const Mode = {
    DEFAULT: 'DEFAULT',
    POPUP: 'POPUP'
  };
  const UserAction = {
    UPDATE_FILM_CARD: 'UPDATE_FILM_CARD',
    ADD_COMMENT: 'ADD_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT'
  };
  const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT'
  };
  const FILM_EXTRA_HEADER = {
    topRated: 'Top Rated',
    mostCommented: 'Most Commented'
  };
  const FILM_EXTRA_CARD_COUNT = {
    topRated: 2,
    mostCommented: 2
  };


  /***/ }),

  /***/ "./src/util/date-time.js":
  /*!*******************************!*\
    !*** ./src/util/date-time.js ***!
    \*******************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "getCommentDate": () => (/* binding */ getCommentDate),
  /* harmony export */   "getHoursMinutes": () => (/* binding */ getHoursMinutes),
  /* harmony export */   "getReleaseDate": () => (/* binding */ getReleaseDate),
  /* harmony export */   "getReleaseYear": () => (/* binding */ getReleaseYear)
  /* harmony export */ });
  /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
  /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

  const DATE_FORMAT_YEAR = 'YYYY';
  const DATE_FORMAT_FULL = 'DD MMMM YYYY';
  const MILLISECONDS = new Map([[[0, 300000], 'now'], [[300000, 3600000], 'few minutes ago'], [[3600000, 86400000], 'today'], [[86400000, 604800000], 'this week'], [[604800000, 2628002880], 'this month'], [[2628002880, 31536034560], 'this year']]);
  function getReleaseYear(releaseDate) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(releaseDate).format(DATE_FORMAT_YEAR);
  }
  function getReleaseDate(releaseDate) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(releaseDate).format(DATE_FORMAT_FULL);
  }
  function getCommentDate(commentDate) {
    const commentDateMS = Date.now() - Date.parse(commentDate);
    let humanizedCommentDate = 'long time ago ...';
    MILLISECONDS.forEach((value, key) => {
      if (commentDateMS > key[0] && commentDateMS <= key[1]) {
        humanizedCommentDate = value;
      }
    });
    return humanizedCommentDate;
  }
  function getHoursMinutes(minutes) {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }


  /***/ }),

  /***/ "./src/util/film-card-filter.js":
  /*!**************************************!*\
    !*** ./src/util/film-card-filter.js ***!
    \**************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "filter": () => (/* binding */ filter)
  /* harmony export */ });
  /* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/util/const.js");

  const filter = {
    [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.ALL]: films => films.filter(film => film),
    [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.WATCHLIST]: films => films.filter(film => film.userDetails.watchlist),
    [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.HISTORY]: films => films.filter(film => film.userDetails.alreadyWatched),
    [_const_js__WEBPACK_IMPORTED_MODULE_0__.FilterType.FAVORITES]: films => films.filter(film => film.userDetails.favorite)
  };


  /***/ }),

  /***/ "./src/util/film-description.js":
  /*!**************************************!*\
    !*** ./src/util/film-description.js ***!
    \**************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "getPreviewFilmDescription": () => (/* binding */ getPreviewFilmDescription)
  /* harmony export */ });
  const PREVIEW_FILM_DESCRIPTION_LENGTH = 140;
  function getPreviewFilmDescription(fullFilmDescription) {
    if (fullFilmDescription.length > PREVIEW_FILM_DESCRIPTION_LENGTH) {
      const previewFilmDescription = fullFilmDescription.slice(0, PREVIEW_FILM_DESCRIPTION_LENGTH);
      const lastSpaceIndex = previewFilmDescription.lastIndexOf(' ');
      return `${previewFilmDescription.slice(0, lastSpaceIndex)} ...`;
    }
    return fullFilmDescription;
  }


  /***/ }),

  /***/ "./src/util/sort-film-cards.js":
  /*!*************************************!*\
    !*** ./src/util/sort-film-cards.js ***!
    \*************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "sortMainDate": () => (/* binding */ sortMainDate),
  /* harmony export */   "sortMainRating": () => (/* binding */ sortMainRating),
  /* harmony export */   "sortMostCommented": () => (/* binding */ sortMostCommented),
  /* harmony export */   "sortTopRated": () => (/* binding */ sortTopRated)
  /* harmony export */ });
  /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
  /* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

  function sortTopRated(a, b) {
    return b.filmInfo.totalRating - a.filmInfo.totalRating;
  }
  function sortMostCommented(a, b) {
    return b.comments.length - a.comments.length;
  }
  function sortMainDate(filmCardA, filmCardB) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(filmCardA.filmInfo.release.date).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(filmCardB.filmInfo.release.date));
  }
  function sortMainRating(filmCardA, filmCardB) {
    return filmCardB.filmInfo.totalRating - filmCardA.filmInfo.totalRating;
  }


  /***/ }),

  /***/ "./src/view/film-card-view.js":
  /*!************************************!*\
    !*** ./src/view/film-card-view.js ***!
    \************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmCardView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");
  /* harmony import */ var _util_date_time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/date-time.js */ "./src/util/date-time.js");
  /* harmony import */ var _util_film_description_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/film-description.js */ "./src/util/film-description.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_3__);




  function createFilmCardTemplate(filmCard) {
    const {
      filmInfo,
      comments,
      userDetails
    } = filmCard;
    return `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${he__WEBPACK_IMPORTED_MODULE_3___default().encode(filmInfo.title)}</h3>
          <p class="film-card__rating">${filmInfo.totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${(0,_util_date_time_js__WEBPACK_IMPORTED_MODULE_1__.getReleaseYear)(filmInfo.release.date)}</span>
            <span class="film-card__duration">${(0,_util_date_time_js__WEBPACK_IMPORTED_MODULE_1__.getHoursMinutes)(filmInfo.duration)}</span>
            <span class="film-card__genre">${he__WEBPACK_IMPORTED_MODULE_3___default().encode(filmInfo.genre[0])}</span>
          </p>
          <img src=${filmInfo.poster} alt="" class="film-card__poster">
          <p class="film-card__description">${(0,_util_film_description_js__WEBPACK_IMPORTED_MODULE_2__.getPreviewFilmDescription)(he__WEBPACK_IMPORTED_MODULE_3___default().encode(filmInfo.description))}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist${userDetails.watchlist ? ' film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched${userDetails.alreadyWatched ? ' film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite${userDetails.favorite ? ' film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
        </div>
      </article>`;
  }
  class FilmCardView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #handleFilmCardClick = null;
    #handleWatchlistClick = null;
    #handleAlreadyWatchedClick = null;
    #handleFavoriteClick = null;
    #filmCard = null;
    constructor(_ref) {
      let {
        filmCard,
        onFilmCardClick,
        onWatchlistClick,
        onAlreadyWatchedClick,
        onFavoriteClick
      } = _ref;
      super();
      this.#filmCard = filmCard;
      this.#handleFilmCardClick = onFilmCardClick;
      this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
      this.#handleWatchlistClick = onWatchlistClick;
      this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
      this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
      this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
      this.#handleFavoriteClick = onFavoriteClick;
      this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
    }
    get template() {
      return createFilmCardTemplate(this.#filmCard);
    }
    #filmCardClickHandler = evt => {
      evt.preventDefault();
      this.#handleFilmCardClick();
    };
    #watchlistClickHandler = evt => {
      evt.preventDefault();
      this.#handleWatchlistClick();
    };
    #alreadyWatchedClickHandler = evt => {
      evt.preventDefault();
      this.#handleAlreadyWatchedClick();
    };
    #favoriteClickHandler = evt => {
      evt.preventDefault();
      this.#handleFavoriteClick();
    };
  }

  /***/ }),

  /***/ "./src/view/film-container-view.js":
  /*!*****************************************!*\
    !*** ./src/view/film-container-view.js ***!
    \*****************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmContainerView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createFilmContainerTemplate() {
    return '<div class="films-list__container"></div>';
  }
  class FilmContainerView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createFilmContainerTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/film-list-header-view.js":
  /*!*******************************************!*\
    !*** ./src/view/film-list-header-view.js ***!
    \*******************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmListHeaderView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createFilmListHeaderTemplate() {
    return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
  }
  class FilmListHeaderView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createFilmListHeaderTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/film-list-view.js":
  /*!************************************!*\
    !*** ./src/view/film-list-view.js ***!
    \************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmListView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createFilmListTemplate() {
    return '<section class="films-list"></section>';
  }
  class FilmListView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createFilmListTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/film-wrapper-view.js":
  /*!***************************************!*\
    !*** ./src/view/film-wrapper-view.js ***!
    \***************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilmWrapperView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createFilmWrapperTemplate() {
    return '<section class="films"></section>';
  }
  class FilmWrapperView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createFilmWrapperTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/filter-bar-view.js":
  /*!*************************************!*\
    !*** ./src/view/filter-bar-view.js ***!
    \*************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FilterBarView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view */ "./src/framework/view/abstract-view.js");
  /* harmony import */ var _util_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/const */ "./src/util/const.js");


  function createFilterBarTemplate(filterItems, currentFilterType) {
    const filterItemsTemplate = filterItems.map(filter => createFilterItemTemplate(filter, currentFilterType)).join('');
    return `<nav class="main-navigation">
        ${filterItemsTemplate}
      </nav>`;
  }
  function createFilterItemTemplate(filter, currentFilterType) {
    const {
      type,
      name,
      count
    } = filter;
    return `<a
        href="#${name.toLowerCase()}"
        class="main-navigation__item${type === currentFilterType ? ' main-navigation__item--active' : ''}"
        data-filter="${type}"
      >
        ${type === _util_const__WEBPACK_IMPORTED_MODULE_1__.FilterType.ALL ? name : `${name} <span class="main-navigation__item-count" data-filter="${type}">${count}</span>`}
      </a>`;
  }
  class FilterBarView extends _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #filters = null;
    #currentFilter = null;
    #handleFilterTypeChange = null;
    constructor(_ref) {
      let {
        filters,
        currentFilterType,
        onFilterTypeChange
      } = _ref;
      super();
      this.#filters = filters;
      this.#currentFilter = currentFilterType;
      this.#handleFilterTypeChange = onFilterTypeChange;
      this.element.addEventListener('click', this.#filterTypeChangeHandler);
    }
    get template() {
      return createFilterBarTemplate(this.#filters, this.#currentFilter);
    }
    #filterTypeChangeHandler = evt => {
      evt.preventDefault();
      this.#handleFilterTypeChange(evt.target.dataset.filter);
    };
  }

  /***/ }),

  /***/ "./src/view/footer-statistic-view.js":
  /*!*******************************************!*\
    !*** ./src/view/footer-statistic-view.js ***!
    \*******************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ FooterStatisticView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createFooterStatisticTemplate(filmsCount) {
    return `<p>${filmsCount} movies inside</p>`;
  }
  class FooterStatisticView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #filmsCount = 0;
    constructor(_ref) {
      let {
        filmsCount
      } = _ref;
      super();
      this.#filmsCount = filmsCount;
    }
    get template() {
      return createFooterStatisticTemplate(this.#filmsCount);
    }
  }

  /***/ }),

  /***/ "./src/view/loading-view.js":
  /*!**********************************!*\
    !*** ./src/view/loading-view.js ***!
    \**********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ LoadingView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createLoadingTemplate() {
    return '<h2 class="films-list__title">Loading...</h2>';
  }
  class LoadingView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createLoadingTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/no-film-cards-view.js":
  /*!****************************************!*\
    !*** ./src/view/no-film-cards-view.js ***!
    \****************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ NoFilmCardsView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");


  const NoFilmsTextType = {
    [_util_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterType.ALL]: 'There are no movies in our database',
    [_util_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterType.WATCHLIST]: 'There are no movies to watch now',
    [_util_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterType.HISTORY]: 'There are no watched movies now',
    [_util_const_js__WEBPACK_IMPORTED_MODULE_1__.FilterType.FAVORITES]: 'There are no favorite movies now'
  };
  function createNoFilmCardsTemplate(filterType) {
    return `<h2 class="films-list__title">${NoFilmsTextType[filterType]}</h2>`;
  }
  class NoFilmCardsView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #filterType = null;
    constructor(_ref) {
      let {
        filterType
      } = _ref;
      super();
      this.#filterType = filterType;
    }
    get template() {
      return createNoFilmCardsTemplate(this.#filterType);
    }
  }

  /***/ }),

  /***/ "./src/view/popup-comment-container-view.js":
  /*!**************************************************!*\
    !*** ./src/view/popup-comment-container-view.js ***!
    \**************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupCommentContainerView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createPopupCommentContainerTemplate() {
    return `<div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
        </section>
      </div>`;
  }
  class PopupCommentContainerView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createPopupCommentContainerTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/popup-comment-header-view.js":
  /*!***********************************************!*\
    !*** ./src/view/popup-comment-header-view.js ***!
    \***********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupCommentHeaderView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view */ "./src/framework/view/abstract-view.js");

  function createPopupCommentHeaderTemplate(filmCard) {
    return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCard.comments.length}</span></h3>`;
  }
  class PopupCommentHeaderView extends _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #filmCard = null;
    constructor(_ref) {
      let {
        filmCard
      } = _ref;
      super();
      this.#filmCard = filmCard;
    }
    get template() {
      return createPopupCommentHeaderTemplate(this.#filmCard);
    }
  }

  /***/ }),

  /***/ "./src/view/popup-comment-list-view.js":
  /*!*********************************************!*\
    !*** ./src/view/popup-comment-list-view.js ***!
    \*********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupCommentListView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createPopupCommentListTemplate() {
    return '<ul class="film-details__comments-list"></ul>';
  }
  class PopupCommentListView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createPopupCommentListTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/popup-comment-loading-view.js":
  /*!************************************************!*\
    !*** ./src/view/popup-comment-loading-view.js ***!
    \************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupCommentLoadingView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view */ "./src/framework/view/abstract-view.js");

  function createPopupCommentLoadingTemplate() {
    return '<h3 class="film-details__comments-title">Loading ...</h3>';
  }
  class PopupCommentLoadingView extends _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get template() {
      return createPopupCommentLoadingTemplate();
    }
  }

  /***/ }),

  /***/ "./src/view/popup-comment-new-view.js":
  /*!********************************************!*\
    !*** ./src/view/popup-comment-new-view.js ***!
    \********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupCommentNewView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_stateful_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-stateful-view.js */ "./src/framework/view/abstract-stateful-view.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_2__);



  const NEW_COMMENT = {
    id: '',
    author: '',
    comment: '',
    date: null,
    emotion: ''
  };
  function createPopupCommentNewTemplate(comment) {
    return `<form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label">
          ${comment.emotion ? `<img src="images/emoji/${comment.emotion}.png" alt="emoji-smile" width="55" height="55">` : ''}
        </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"${comment.isDisabled ? ' disabled' : ''}>${he__WEBPACK_IMPORTED_MODULE_2___default().encode(comment.comment)}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile"${comment.emotion === _util_const_js__WEBPACK_IMPORTED_MODULE_1__.Emotion.SMILE ? ' checked' : ''}${comment.isDisabled ? ' disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emoji ="smile">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping"${comment.emotion === _util_const_js__WEBPACK_IMPORTED_MODULE_1__.Emotion.SLEEPING ? ' checked' : ''}${comment.isDisabled ? ' disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emoji ="sleeping">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke"${comment.emotion === _util_const_js__WEBPACK_IMPORTED_MODULE_1__.Emotion.PUKE ? ' checked' : ''}${comment.isDisabled ? ' disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emoji ="puke">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry"${comment.emotion === _util_const_js__WEBPACK_IMPORTED_MODULE_1__.Emotion.ANGRY ? ' checked' : ''}${comment.isDisabled ? ' disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emoji ="angry">
            </label>
          </div>
      </form>`;
  }
  class PopupCommentNewView extends _framework_view_abstract_stateful_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #handleFormSubmit = null;
    #keysPressed = {};
    #page = null;
    constructor(_ref) {
      let {
        comment = NEW_COMMENT,
        onFormSubmit,
        page
      } = _ref;
      super();
      this._setState({
        ...comment
      });
      this.#handleFormSubmit = onFormSubmit;
      this.#page = page;
      this._restoreHandlers();
    }
    get template() {
      return createPopupCommentNewTemplate(this._state);
    }
    reset = () => {
      this.updateElement(PopupCommentNewView.parseCommentToState(NEW_COMMENT));
    };
    addGlobalHandlers = () => {
      this.#page.addEventListener('keydown', this.#formSubmitHandler);
      this.#page.addEventListener('keyup', this.#keyupHandler);
    };
    removeGlobalHandlers = () => {
      this.#page.removeEventListener('keydown', this.#formSubmitHandler);
      this.#page.removeEventListener('keyup', this.#keyupHandler);
    };
    _restoreHandlers() {
      this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#chooseEmojiHandler);
      this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
    }
    #commentInputHandler = evt => {
      evt.preventDefault();
      this._setState({
        comment: he__WEBPACK_IMPORTED_MODULE_2___default().encode(evt.target.value)
      });
    };
    #keyupHandler = evt => {
      delete this.#keysPressed[evt.key];
    };
    #formSubmitHandler = evt => {
      this.#keysPressed[evt.key] = true;
      if (this.#keysPressed['Meta'] || this.#keysPressed['Control'] && evt.key === 'Enter') {
        if (this._state.comment !== '' && this._state.emotion !== '') {
          this.#handleFormSubmit(PopupCommentNewView.parseStateToComment(this._state));
        }
      }
    };
    #chooseEmojiHandler = evt => {
      evt.preventDefault();
      if (!this._state.isDisabled) {
        this.updateElement({
          emotion: evt.target.dataset.emoji
        });
      }
    };
    static parseCommentToState(comment) {
      return {
        ...comment,
        isDisabled: false
      };
    }
    static parseStateToComment(state) {
      const comment = {
        ...state
      };
      delete comment.isDisabled;
      return comment;
    }
  }

  /***/ }),

  /***/ "./src/view/popup-comment-view.js":
  /*!****************************************!*\
    !*** ./src/view/popup-comment-view.js ***!
    \****************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupCommentView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_stateful_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-stateful-view.js */ "./src/framework/view/abstract-stateful-view.js");
  /* harmony import */ var _util_date_time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/date-time.js */ "./src/util/date-time.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_2__);



  function createPopupCommentTemplate(comment, state) {
    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(comment.comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(comment.author)}</span>
            <span class="film-details__comment-day">${(0,_util_date_time_js__WEBPACK_IMPORTED_MODULE_1__.getCommentDate)(comment.date)}</span>
            <button class="film-details__comment-delete"${state.isDeleting ? ' disabled' : ''}>${state.isDeleting ? 'Deleting ...' : 'Delete'}</button>
          </p>
        </div>
      </li>`;
  }
  class PopupCommentView extends _framework_view_abstract_stateful_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #comment = null;
    #handleDeleteClick = null;
    constructor(_ref) {
      let {
        comment,
        onDeleteClick
      } = _ref;
      super();
      this._setState({
        isDeleting: false
      });
      this.#comment = comment;
      this.#handleDeleteClick = onDeleteClick;
      this._restoreHandlers();
    }
    get template() {
      return createPopupCommentTemplate(this.#comment, this._state);
    }
    get id() {
      return this.#comment.id;
    }
    _restoreHandlers() {
      this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteClickHandler);
    }
    #deleteClickHandler = () => {
      this.#handleDeleteClick(this.#comment, this);
    };
  }

  /***/ }),

  /***/ "./src/view/popup-film-controls-view.js":
  /*!**********************************************!*\
    !*** ./src/view/popup-film-controls-view.js ***!
    \**********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupFilmcontrolsView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view */ "./src/framework/view/abstract-view.js");

  function createPopupFilmControlsTemplate(filmCard) {
    return `<section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist${filmCard.userDetails.watchlist ? ' film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>

        <button type="button" class="film-details__control-button film-details__control-button--watched${filmCard.userDetails.alreadyWatched ? ' film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>

        <button type="button" class="film-details__control-button film-details__control-button--favorite${filmCard.userDetails.favorite ? ' film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>`;
  }
  class PopupFilmcontrolsView extends _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #filmCard = null;
    #handleWatchlistClick = null;
    #handleAlreadyWatchedClick = null;
    #handleFavoriteClick = null;
    constructor(_ref) {
      let {
        filmCard,
        onWatchlistClick,
        onAlreadyWatchedClick,
        onFavoriteClick
      } = _ref;
      super();
      this.#filmCard = filmCard;
      this.#handleWatchlistClick = onWatchlistClick;
      this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
      this.#handleAlreadyWatchedClick = onAlreadyWatchedClick;
      this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
      this.#handleFavoriteClick = onFavoriteClick;
      this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
    }
    get template() {
      return createPopupFilmControlsTemplate(this.#filmCard);
    }
    #watchlistClickHandler = evt => {
      evt.preventDefault();
      this.#handleWatchlistClick();
    };
    #alreadyWatchedClickHandler = evt => {
      evt.preventDefault();
      this.#handleAlreadyWatchedClick();
    };
    #favoriteClickHandler = evt => {
      evt.preventDefault();
      this.#handleFavoriteClick();
    };
  }

  /***/ }),

  /***/ "./src/view/popup-film-details-view.js":
  /*!*********************************************!*\
    !*** ./src/view/popup-film-details-view.js ***!
    \*********************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupFilmDetailsView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view */ "./src/framework/view/abstract-view.js");
  /* harmony import */ var _util_date_time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/date-time.js */ "./src/util/date-time.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
  /* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_2__);



  function getGenresList(genres) {
    return genres.map(genre => `<span class="film-details__genre">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(genre)}</span>`).join('');
  }
  function createPopupFilmDetailsTemplate(filmCard) {
    return `<div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${filmCard.filmInfo.poster} alt="">

            <p class="film-details__age">${filmCard.filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(filmCard.filmInfo.title)}</h3>
                <p class="film-details__title-original">Original: ${he__WEBPACK_IMPORTED_MODULE_2___default().encode(filmCard.filmInfo.alternativeTitle)}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmCard.filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(filmCard.filmInfo.director)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(filmCard.filmInfo.writers.join(', '))}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(filmCard.filmInfo.actors.join(', '))}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${(0,_util_date_time_js__WEBPACK_IMPORTED_MODULE_1__.getReleaseDate)(filmCard.filmInfo.release.date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Duration</td>
                <td class="film-details__cell">${(0,_util_date_time_js__WEBPACK_IMPORTED_MODULE_1__.getHoursMinutes)(filmCard.filmInfo.duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(filmCard.filmInfo.release.releaseCountry)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genre${filmCard.filmInfo.genre.length > 1 ? 's' : ''}</td>
                <td class="film-details__cell">${getGenresList(filmCard.filmInfo.genre)}</td>
              </tr>
            </table>

            <p class="film-details__film-description">${he__WEBPACK_IMPORTED_MODULE_2___default().encode(filmCard.filmInfo.description)}</p>
          </div>
        </div>
      </div>`;
  }
  class PopupFilmDetailsView extends _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #handleXClick = null;
    #filmCard = null;
    constructor(_ref) {
      let {
        filmCard,
        onXClick
      } = _ref;
      super();
      this.#filmCard = filmCard;
      this.#handleXClick = onXClick;
      this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#xClickHandler);
    }
    get template() {
      return createPopupFilmDetailsTemplate(this.#filmCard);
    }
    #xClickHandler = evt => {
      evt.preventDefault();
      this.#handleXClick();
    };
  }

  /***/ }),

  /***/ "./src/view/popup-view.js":
  /*!********************************!*\
    !*** ./src/view/popup-view.js ***!
    \********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ PopupView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_stateful_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-stateful-view.js */ "./src/framework/view/abstract-stateful-view.js");

  const NULL_SCROLL = {
    scroll: 0
  };
  function createPopupViewTemplate() {
    return `<section class="film-details">
              <div class="film-details__inner">
              </div>
            </section>`;
  }
  class PopupView extends _framework_view_abstract_stateful_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
      super();
      this._setState({
        ...NULL_SCROLL
      });
      this._restoreHandlers();
    }
    get template() {
      return createPopupViewTemplate();
    }
    reset() {
      this.updateElement({
        ...NULL_SCROLL
      });
    }
    _restoreHandlers() {
      this.element.addEventListener('scroll', this.#scrollChangeHandler);
    }
    restoreScroll() {
      this.element.scrollTop = this._state.scroll;
    }
    #scrollChangeHandler = evt => {
      evt.preventDefault();
      this._setState({
        scroll: this.element.scrollTop
      });
    };
  }

  /***/ }),

  /***/ "./src/view/show-more-button-view.js":
  /*!*******************************************!*\
    !*** ./src/view/show-more-button-view.js ***!
    \*******************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ ShowMoreButtonView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

  function createShowMoreButtonTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }
  class ShowMoreButtonView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #handleClick = null;
    constructor(_ref) {
      let {
        onClick
      } = _ref;
      super();
      this.#handleClick = onClick;
      this.element.addEventListener('click', this.#clickHandler);
    }
    get template() {
      return createShowMoreButtonTemplate();
    }
    #clickHandler = evt => {
      evt.preventDefault();
      this.#handleClick();
    };
  }

  /***/ }),

  /***/ "./src/view/sort-bar-view.js":
  /*!***********************************!*\
    !*** ./src/view/sort-bar-view.js ***!
    \***********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ SortBarView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");
  /* harmony import */ var _util_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/const.js */ "./src/util/const.js");


  function createSortBarTemplate(currentSortType) {
    return `<ul class="sort">
        <li><a href="#" class="sort__button${currentSortType === _util_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DEFAULT ? ' sort__button--active' : ''}" data-sort-type="${_util_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button${currentSortType === _util_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DATE ? ' sort__button--active' : ''}" data-sort-type="${_util_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button${currentSortType === _util_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.RATING ? ' sort__button--active' : ''}" data-sort-type="${_util_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.RATING}">Sort by rating</a></li>
      </ul>`;
  }
  class SortBarView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #handleSortTypeChange = null;
    #currentSortType = null;
    constructor(_ref) {
      let {
        onSortTypeChange,
        currentSortType
      } = _ref;
      super();
      this.#handleSortTypeChange = onSortTypeChange;
      this.#currentSortType = currentSortType;
      this.element.addEventListener('click', this.#sortTypeChangeHandler);
    }
    get template() {
      return createSortBarTemplate(this.#currentSortType);
    }
    #sortTypeChangeHandler = evt => {
      if (evt.target.tagName !== 'A') {
        return;
      }
      evt.preventDefault();
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    };
  }

  /***/ }),

  /***/ "./src/view/user-profile-view.js":
  /*!***************************************!*\
    !*** ./src/view/user-profile-view.js ***!
    \***************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ UserProfileView)
  /* harmony export */ });
  /* harmony import */ var _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view */ "./src/framework/view/abstract-view.js");

  function createUserProfileTemplate(alreadyWatched) {
    const WATCHED_FILMS_TO_BE_FAN = 11;
    const WATCHED_FILMS_TO_BE_MOVIE_BUFF = 21;
    let profileRating = '';
    if (alreadyWatched < WATCHED_FILMS_TO_BE_FAN) {
      profileRating = 'Novice';
    }
    if (alreadyWatched >= WATCHED_FILMS_TO_BE_FAN) {
      profileRating = 'Fan';
    }
    if (alreadyWatched >= WATCHED_FILMS_TO_BE_MOVIE_BUFF) {
      profileRating = 'Movie Buff';
    }
    return `<section class="header__profile profile">
        <p class="profile__rating">${profileRating}</p>
        <img class="profile__avatar"
            src="images/bitmap@2x.png"
            alt="Avatar"
            width="35"
            height="35">
      </section>`;
  }
  class UserProfileView extends _framework_view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
    #alreadyWatched = null;
    constructor(_ref) {
      let {
        alreadyWatched
      } = _ref;
      super();
      this.#alreadyWatched = alreadyWatched;
    }
    get template() {
      return createUserProfileTemplate(this.#alreadyWatched);
    }
  }

  /***/ }),

  /***/ "./node_modules/css-loader/dist/cjs.js!./src/framework/ui-blocker/ui-blocker.css":
  /*!***************************************************************************************!*\
    !*** ./node_modules/css-loader/dist/cjs.js!./src/framework/ui-blocker/ui-blocker.css ***!
    \***************************************************************************************/
  /***/ ((module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
  /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
  /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
  // Imports


  var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
  // Module
  ___CSS_LOADER_EXPORT___.push([module.id, ".ui-blocker {\n  display: none;\n  place-content: center;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1000;\n  cursor: wait;\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n.ui-blocker::before {\n  content: \"\";\n  display: block;\n  border-radius: 50%;\n  border: 6px solid #4285F4;\n  box-sizing: border-box;\n  animation: sweep 1s linear alternate infinite,\n             rotate 0.8s linear infinite;\n  width: 65px;\n  height: 65px;\n}\n\n.ui-blocker--on {\n  display: grid;\n}\n\n@keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes sweep {\n  0% {\n    clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);\n  }\n  50% {\n    clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);\n  }\n  100% {\n    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/framework/ui-blocker/ui-blocker.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,aAAa;EACb,YAAY;EACZ,0CAA0C;AAC5C;;AAEA;EACE,WAAW;EACX,cAAc;EACd,kBAAkB;EAClB,yBAAyB;EACzB,sBAAsB;EACtB;wCACsC;EACtC,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE;IACE,uBAAuB;EACzB;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE;IACE,qEAAqE;EACvE;EACA;IACE,6EAA6E;EAC/E;EACA;IACE,iFAAiF;EACnF;AACF","sourcesContent":[".ui-blocker {\n  display: none;\n  place-content: center;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1000;\n  cursor: wait;\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n.ui-blocker::before {\n  content: \"\";\n  display: block;\n  border-radius: 50%;\n  border: 6px solid #4285F4;\n  box-sizing: border-box;\n  animation: sweep 1s linear alternate infinite,\n             rotate 0.8s linear infinite;\n  width: 65px;\n  height: 65px;\n}\n\n.ui-blocker--on {\n  display: grid;\n}\n\n@keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes sweep {\n  0% {\n    clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);\n  }\n  50% {\n    clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);\n  }\n  100% {\n    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);\n  }\n}\n"],"sourceRoot":""}]);
  // Exports
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


  /***/ }),

  /***/ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css":
  /*!************************************************************************************!*\
    !*** ./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css ***!
    \************************************************************************************/
  /***/ ((module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
  /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
  /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
  // Imports


  var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
  // Module
  ___CSS_LOADER_EXPORT___.push([module.id, ".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/framework/view/abstract-view.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF","sourcesContent":[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],"sourceRoot":""}]);
  // Exports
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


  /***/ }),

  /***/ "./node_modules/css-loader/dist/runtime/api.js":
  /*!*****************************************************!*\
    !*** ./node_modules/css-loader/dist/runtime/api.js ***!
    \*****************************************************/
  /***/ ((module) => {

  "use strict";


  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  module.exports = function (cssWithMappingToString) {
    var list = [];

    // return the list of modules as css string
    list.toString = function toString() {
      return this.map(function (item) {
        var content = "";
        var needLayer = typeof item[5] !== "undefined";
        if (item[4]) {
          content += "@supports (".concat(item[4], ") {");
        }
        if (item[2]) {
          content += "@media ".concat(item[2], " {");
        }
        if (needLayer) {
          content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
        }
        content += cssWithMappingToString(item);
        if (needLayer) {
          content += "}";
        }
        if (item[2]) {
          content += "}";
        }
        if (item[4]) {
          content += "}";
        }
        return content;
      }).join("");
    };

    // import a list of modules into the list
    list.i = function i(modules, media, dedupe, supports, layer) {
      if (typeof modules === "string") {
        modules = [[null, modules, undefined]];
      }
      var alreadyImportedModules = {};
      if (dedupe) {
        for (var k = 0; k < this.length; k++) {
          var id = this[k][0];
          if (id != null) {
            alreadyImportedModules[id] = true;
          }
        }
      }
      for (var _k = 0; _k < modules.length; _k++) {
        var item = [].concat(modules[_k]);
        if (dedupe && alreadyImportedModules[item[0]]) {
          continue;
        }
        if (typeof layer !== "undefined") {
          if (typeof item[5] === "undefined") {
            item[5] = layer;
          } else {
            item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
            item[5] = layer;
          }
        }
        if (media) {
          if (!item[2]) {
            item[2] = media;
          } else {
            item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
            item[2] = media;
          }
        }
        if (supports) {
          if (!item[4]) {
            item[4] = "".concat(supports);
          } else {
            item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
            item[4] = supports;
          }
        }
        list.push(item);
      }
    };
    return list;
  };

  /***/ }),

  /***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
  /*!************************************************************!*\
    !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
    \************************************************************/
  /***/ ((module) => {

  "use strict";


  module.exports = function (item) {
    var content = item[1];
    var cssMapping = item[3];
    if (!cssMapping) {
      return content;
    }
    if (typeof btoa === "function") {
      var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
      var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
      var sourceMapping = "/*# ".concat(data, " */");
      var sourceURLs = cssMapping.sources.map(function (source) {
        return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
      });
      return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
    }
    return [content].join("\n");
  };

  /***/ }),

  /***/ "./node_modules/dayjs/dayjs.min.js":
  /*!*****************************************!*\
    !*** ./node_modules/dayjs/dayjs.min.js ***!
    \*****************************************/
  /***/ (function(module) {

  !function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));

  /***/ }),

  /***/ "./node_modules/events/events.js":
  /*!***************************************!*\
    !*** ./node_modules/events/events.js ***!
    \***************************************/
  /***/ ((module) => {

  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.



  var R = typeof Reflect === 'object' ? Reflect : null
  var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    }

  var ReflectOwnKeys
  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target)
        .concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }

  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }

  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  }

  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  module.exports = EventEmitter;
  module.exports.once = once;

  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  var defaultMaxListeners = 10;

  function checkListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }

  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }
      defaultMaxListeners = arg;
    }
  });

  EventEmitter.init = function() {

    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
  };

  function _getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };

  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = (type === 'error');

    var events = this._events;
    if (events !== undefined)
      doError = (doError && events.error === undefined);
    else if (!doError)
      return false;

    // If there is no 'error' event listener then throw.
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    var handler = events[type];

    if (handler === undefined)
      return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    checkListener(listener);

    events = target._events;
    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
        // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }

      // Check for listener leak
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + String(type) + ' listeners ' +
                            'added. Use emitter.setMaxListeners() to ' +
                            'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }

  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // Emits a 'removeListener' event if and only if the listener was removed.
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        checkListener(listener);

        events = this._events;
        if (events === undefined)
          return this;

        list = events[type];
        if (list === undefined)
          return this;

        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }

          if (list.length === 1)
            events[type] = list[0];

          if (events.removeListener !== undefined)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;

        events = this._events;
        if (events === undefined)
          return this;

        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
          if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0)
              this._events = Object.create(null);
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = Object.create(null);
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners !== undefined) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }

        return this;
      };

  function _listeners(target, type, unwrap) {
    var events = target._events;

    if (events === undefined)
      return [];

    var evlistener = events[type];
    if (evlistener === undefined)
      return [];

    if (typeof evlistener === 'function')
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];

    return unwrap ?
      unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }

  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };

  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events !== undefined) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };

  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }

  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  function once(emitter, name) {
    return new Promise(function (resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }

      function resolver() {
        if (typeof emitter.removeListener === 'function') {
          emitter.removeListener('error', errorListener);
        }
        resolve([].slice.call(arguments));
      };

      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== 'error') {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }

  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
      eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
  }

  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === 'function') {
      // EventTarget does not have `error` event semantics like Node
      // EventEmitters, we do not listen for `error` events here.
      emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }


  /***/ }),

  /***/ "./node_modules/he/he.js":
  /*!*******************************!*\
    !*** ./node_modules/he/he.js ***!
    \*******************************/
  /***/ (function(module, exports, __webpack_require__) {

  /* module decorator */ module = __webpack_require__.nmd(module);
  var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
  ;(function(root) {

    // Detect free variables `exports`.
    var freeExports =  true && exports;

    // Detect free variable `module`.
    var freeModule =  true && module &&
      module.exports == freeExports && module;

    // Detect free variable `global`, from Node.js or Browserified code,
    // and use it as `root`.
    var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
      root = freeGlobal;
    }

    /*--------------------------------------------------------------------------*/

    // All astral symbols.
    var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    // All ASCII symbols (not just printable ASCII) except those listed in the
    // first column of the overrides table.
    // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
    var regexAsciiWhitelist = /[\x01-\x7F]/g;
    // All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
    // code points listed in the first column of the overrides table on
    // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
    var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

    var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
    var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

    var regexEscape = /["&'<>`]/g;
    var escapeMap = {
      '"': '&quot;',
      '&': '&amp;',
      '\'': '&#x27;',
      '<': '&lt;',
      // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
      // following is not strictly necessary unless it’s part of a tag or an
      // unquoted attribute value. We’re only escaping it to support those
      // situations, and for XML support.
      '>': '&gt;',
      // In Internet Explorer ≤ 8, the backtick character can be used
      // to break out of (un)quoted attribute values or HTML comments.
      // See http://html5sec.org/#102, http://html5sec.org/#108, and
      // http://html5sec.org/#133.
      '`': '&#x60;'
    };

    var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
    var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
    var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
    var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
    var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
    var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

    /*--------------------------------------------------------------------------*/

    var stringFromCharCode = String.fromCharCode;

    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var has = function(object, propertyName) {
      return hasOwnProperty.call(object, propertyName);
    };

    var contains = function(array, value) {
      var index = -1;
      var length = array.length;
      while (++index < length) {
        if (array[index] == value) {
          return true;
        }
      }
      return false;
    };

    var merge = function(options, defaults) {
      if (!options) {
        return defaults;
      }
      var result = {};
      var key;
      for (key in defaults) {
        // A `hasOwnProperty` check is not needed here, since only recognized
        // option names are used anyway. Any others are ignored.
        result[key] = has(options, key) ? options[key] : defaults[key];
      }
      return result;
    };

    // Modified version of `ucs2encode`; see https://mths.be/punycode.
    var codePointToSymbol = function(codePoint, strict) {
      var output = '';
      if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
        // See issue #4:
        // “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
        // greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
        // REPLACEMENT CHARACTER.”
        if (strict) {
          parseError('character reference outside the permissible Unicode range');
        }
        return '\uFFFD';
      }
      if (has(decodeMapNumeric, codePoint)) {
        if (strict) {
          parseError('disallowed character reference');
        }
        return decodeMapNumeric[codePoint];
      }
      if (strict && contains(invalidReferenceCodePoints, codePoint)) {
        parseError('disallowed character reference');
      }
      if (codePoint > 0xFFFF) {
        codePoint -= 0x10000;
        output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }
      output += stringFromCharCode(codePoint);
      return output;
    };

    var hexEscape = function(codePoint) {
      return '&#x' + codePoint.toString(16).toUpperCase() + ';';
    };

    var decEscape = function(codePoint) {
      return '&#' + codePoint + ';';
    };

    var parseError = function(message) {
      throw Error('Parse error: ' + message);
    };

    /*--------------------------------------------------------------------------*/

    var encode = function(string, options) {
      options = merge(options, encode.options);
      var strict = options.strict;
      if (strict && regexInvalidRawCodePoint.test(string)) {
        parseError('forbidden code point');
      }
      var encodeEverything = options.encodeEverything;
      var useNamedReferences = options.useNamedReferences;
      var allowUnsafeSymbols = options.allowUnsafeSymbols;
      var escapeCodePoint = options.decimal ? decEscape : hexEscape;

      var escapeBmpSymbol = function(symbol) {
        return escapeCodePoint(symbol.charCodeAt(0));
      };

      if (encodeEverything) {
        // Encode ASCII symbols.
        string = string.replace(regexAsciiWhitelist, function(symbol) {
          // Use named references if requested & possible.
          if (useNamedReferences && has(encodeMap, symbol)) {
            return '&' + encodeMap[symbol] + ';';
          }
          return escapeBmpSymbol(symbol);
        });
        // Shorten a few escapes that represent two symbols, of which at least one
        // is within the ASCII range.
        if (useNamedReferences) {
          string = string
            .replace(/&gt;\u20D2/g, '&nvgt;')
            .replace(/&lt;\u20D2/g, '&nvlt;')
            .replace(/&#x66;&#x6A;/g, '&fjlig;');
        }
        // Encode non-ASCII symbols.
        if (useNamedReferences) {
          // Encode non-ASCII symbols that can be replaced with a named reference.
          string = string.replace(regexEncodeNonAscii, function(string) {
            // Note: there is no need to check `has(encodeMap, string)` here.
            return '&' + encodeMap[string] + ';';
          });
        }
        // Note: any remaining non-ASCII symbols are handled outside of the `if`.
      } else if (useNamedReferences) {
        // Apply named character references.
        // Encode `<>"'&` using named character references.
        if (!allowUnsafeSymbols) {
          string = string.replace(regexEscape, function(string) {
            return '&' + encodeMap[string] + ';'; // no need to check `has()` here
          });
        }
        // Shorten escapes that represent two symbols, of which at least one is
        // `<>"'&`.
        string = string
          .replace(/&gt;\u20D2/g, '&nvgt;')
          .replace(/&lt;\u20D2/g, '&nvlt;');
        // Encode non-ASCII symbols that can be replaced with a named reference.
        string = string.replace(regexEncodeNonAscii, function(string) {
          // Note: there is no need to check `has(encodeMap, string)` here.
          return '&' + encodeMap[string] + ';';
        });
      } else if (!allowUnsafeSymbols) {
        // Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
        // using named character references.
        string = string.replace(regexEscape, escapeBmpSymbol);
      }
      return string
        // Encode astral symbols.
        .replace(regexAstralSymbols, function($0) {
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          var high = $0.charCodeAt(0);
          var low = $0.charCodeAt(1);
          var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
          return escapeCodePoint(codePoint);
        })
        // Encode any remaining BMP symbols that are not printable ASCII symbols
        // using a hexadecimal escape.
        .replace(regexBmpWhitelist, escapeBmpSymbol);
    };
    // Expose default options (so they can be overridden globally).
    encode.options = {
      'allowUnsafeSymbols': false,
      'encodeEverything': false,
      'strict': false,
      'useNamedReferences': false,
      'decimal' : false
    };

    var decode = function(html, options) {
      options = merge(options, decode.options);
      var strict = options.strict;
      if (strict && regexInvalidEntity.test(html)) {
        parseError('malformed character reference');
      }
      return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
        var codePoint;
        var semicolon;
        var decDigits;
        var hexDigits;
        var reference;
        var next;

        if ($1) {
          reference = $1;
          // Note: there is no need to check `has(decodeMap, reference)`.
          return decodeMap[reference];
        }

        if ($2) {
          // Decode named character references without trailing `;`, e.g. `&amp`.
          // This is only a parse error if it gets converted to `&`, or if it is
          // followed by `=` in an attribute context.
          reference = $2;
          next = $3;
          if (next && options.isAttributeValue) {
            if (strict && next == '=') {
              parseError('`&` did not start a character reference');
            }
            return $0;
          } else {
            if (strict) {
              parseError(
                'named character reference was not terminated by a semicolon'
              );
            }
            // Note: there is no need to check `has(decodeMapLegacy, reference)`.
            return decodeMapLegacy[reference] + (next || '');
          }
        }

        if ($4) {
          // Decode decimal escapes, e.g. `&#119558;`.
          decDigits = $4;
          semicolon = $5;
          if (strict && !semicolon) {
            parseError('character reference was not terminated by a semicolon');
          }
          codePoint = parseInt(decDigits, 10);
          return codePointToSymbol(codePoint, strict);
        }

        if ($6) {
          // Decode hexadecimal escapes, e.g. `&#x1D306;`.
          hexDigits = $6;
          semicolon = $7;
          if (strict && !semicolon) {
            parseError('character reference was not terminated by a semicolon');
          }
          codePoint = parseInt(hexDigits, 16);
          return codePointToSymbol(codePoint, strict);
        }

        // If we’re still here, `if ($7)` is implied; it’s an ambiguous
        // ampersand for sure. https://mths.be/notes/ambiguous-ampersands
        if (strict) {
          parseError(
            'named character reference was not terminated by a semicolon'
          );
        }
        return $0;
      });
    };
    // Expose default options (so they can be overridden globally).
    decode.options = {
      'isAttributeValue': false,
      'strict': false
    };

    var escape = function(string) {
      return string.replace(regexEscape, function($0) {
        // Note: there is no need to check `has(escapeMap, $0)` here.
        return escapeMap[$0];
      });
    };

    /*--------------------------------------------------------------------------*/

    var he = {
      'version': '1.2.0',
      'encode': encode,
      'decode': decode,
      'escape': escape,
      'unescape': decode
    };

    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (
      true
    ) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return he;
      }).call(exports, __webpack_require__, exports, module),
      __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }	else { var key; }

  }(this));


  /***/ }),

  /***/ "./node_modules/html-entities/lib/index.js":
  /*!*************************************************!*\
    !*** ./node_modules/html-entities/lib/index.js ***!
    \*************************************************/
  /***/ (function(__unused_webpack_module, exports, __webpack_require__) {

  "use strict";

  var __assign = (this && this.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", ({ value: true }));
  var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
  var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
  var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
  var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
  var encodeRegExps = {
      specialChars: /[<>'"&]/g,
      nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
      nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
      extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
  };
  var defaultEncodeOptions = {
      mode: 'specialChars',
      level: 'all',
      numeric: 'decimal'
  };
  /** Encodes all the necessary (specified by `level`) characters in the text */
  function encode(text, _a) {
      var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
      if (!text) {
          return '';
      }
      var encodeRegExp = encodeRegExps[mode];
      var references = allNamedReferences[level].characters;
      var isHex = numeric === 'hexadecimal';
      encodeRegExp.lastIndex = 0;
      var _b = encodeRegExp.exec(text);
      var _c;
      if (_b) {
          _c = '';
          var _d = 0;
          do {
              if (_d !== _b.index) {
                  _c += text.substring(_d, _b.index);
              }
              var _e = _b[0];
              var result_1 = references[_e];
              if (!result_1) {
                  var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                  result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
              }
              _c += result_1;
              _d = _b.index + _e.length;
          } while ((_b = encodeRegExp.exec(text)));
          if (_d !== text.length) {
              _c += text.substring(_d);
          }
      }
      else {
          _c =
              text;
      }
      return _c;
  }
  exports.encode = encode;
  var defaultDecodeOptions = {
      scope: 'body',
      level: 'all'
  };
  var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
  var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
  var baseDecodeRegExps = {
      xml: {
          strict: strict,
          attribute: attribute,
          body: named_references_1.bodyRegExps.xml
      },
      html4: {
          strict: strict,
          attribute: attribute,
          body: named_references_1.bodyRegExps.html4
      },
      html5: {
          strict: strict,
          attribute: attribute,
          body: named_references_1.bodyRegExps.html5
      }
  };
  var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
  var fromCharCode = String.fromCharCode;
  var outOfBoundsChar = fromCharCode(65533);
  var defaultDecodeEntityOptions = {
      level: 'all'
  };
  /** Decodes a single entity */
  function decodeEntity(entity, _a) {
      var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
      if (!entity) {
          return '';
      }
      var _b = entity;
      var decodeEntityLastChar_1 = entity[entity.length - 1];
      if (false) {}
      else if (false) {}
      else {
          var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
          if (decodeResultByReference_1) {
              _b = decodeResultByReference_1;
          }
          else if (entity[0] === '&' && entity[1] === '#') {
              var decodeSecondChar_1 = entity[2];
              var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                  ? parseInt(entity.substr(3), 16)
                  : parseInt(entity.substr(2));
              _b =
                  decodeCode_1 >= 0x10ffff
                      ? outOfBoundsChar
                      : decodeCode_1 > 65535
                          ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                          : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
          }
      }
      return _b;
  }
  exports.decodeEntity = decodeEntity;
  /** Decodes all entities in the text */
  function decode(text, _a) {
      var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
      if (!text) {
          return '';
      }
      var decodeRegExp = decodeRegExps[level][scope];
      var references = allNamedReferences[level].entities;
      var isAttribute = scope === 'attribute';
      var isStrict = scope === 'strict';
      decodeRegExp.lastIndex = 0;
      var replaceMatch_1 = decodeRegExp.exec(text);
      var replaceResult_1;
      if (replaceMatch_1) {
          replaceResult_1 = '';
          var replaceLastIndex_1 = 0;
          do {
              if (replaceLastIndex_1 !== replaceMatch_1.index) {
                  replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
              }
              var replaceInput_1 = replaceMatch_1[0];
              var decodeResult_1 = replaceInput_1;
              var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
              if (isAttribute
                  && decodeEntityLastChar_2 === '=') {
                  decodeResult_1 = replaceInput_1;
              }
              else if (isStrict
                  && decodeEntityLastChar_2 !== ';') {
                  decodeResult_1 = replaceInput_1;
              }
              else {
                  var decodeResultByReference_2 = references[replaceInput_1];
                  if (decodeResultByReference_2) {
                      decodeResult_1 = decodeResultByReference_2;
                  }
                  else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                      var decodeSecondChar_2 = replaceInput_1[2];
                      var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                          ? parseInt(replaceInput_1.substr(3), 16)
                          : parseInt(replaceInput_1.substr(2));
                      decodeResult_1 =
                          decodeCode_2 >= 0x10ffff
                              ? outOfBoundsChar
                              : decodeCode_2 > 65535
                                  ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                  : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                  }
              }
              replaceResult_1 += decodeResult_1;
              replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
          } while ((replaceMatch_1 = decodeRegExp.exec(text)));
          if (replaceLastIndex_1 !== text.length) {
              replaceResult_1 += text.substring(replaceLastIndex_1);
          }
      }
      else {
          replaceResult_1 =
              text;
      }
      return replaceResult_1;
  }
  exports.decode = decode;


  /***/ }),

  /***/ "./node_modules/html-entities/lib/named-references.js":
  /*!************************************************************!*\
    !*** ./node_modules/html-entities/lib/named-references.js ***!
    \************************************************************/
  /***/ ((__unused_webpack_module, exports) => {

  "use strict";
  Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

  /***/ }),

  /***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
  /*!***************************************************************!*\
    !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
    \***************************************************************/
  /***/ ((__unused_webpack_module, exports) => {

  "use strict";
  Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

  /***/ }),

  /***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
  /*!***********************************************************!*\
    !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
    \***********************************************************/
  /***/ ((__unused_webpack_module, exports) => {

  "use strict";
  Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

  /***/ }),

  /***/ "./src/framework/ui-blocker/ui-blocker.css":
  /*!*************************************************!*\
    !*** ./src/framework/ui-blocker/ui-blocker.css ***!
    \*************************************************/
  /***/ ((module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
  /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./ui-blocker.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/ui-blocker/ui-blocker.css");











  var options = {};

  options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
  options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

        options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");

  options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
  options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

  var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);


  if (true) {
    if (!_node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals || module.hot.invalidate) {
      var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
    if (!a && b || a && !b) {
      return false;
    }

    var p;

    for (p in a) {
      if (isNamedExport && p === "default") {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (a[p] !== b[p]) {
        return false;
      }
    }

    for (p in b) {
      if (isNamedExport && p === "default") {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (!a[p]) {
        return false;
      }
    }

    return true;
  };
      var isNamedExport = !_node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;
      var oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

      module.hot.accept(
        /*! !!../../../node_modules/css-loader/dist/cjs.js!./ui-blocker.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/ui-blocker/ui-blocker.css",
        __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./ui-blocker.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/ui-blocker/ui-blocker.css");
  (function () {
          if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals, isNamedExport)) {
                  module.hot.invalidate();

                  return;
                }

                oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

                update(_node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
        })(__WEBPACK_OUTDATED_DEPENDENCIES__); }
      )
    }

    module.hot.dispose(function() {
      update();
    });
  }



         /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ui_blocker_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


  /***/ }),

  /***/ "./src/framework/view/abstract-view.css":
  /*!**********************************************!*\
    !*** ./src/framework/view/abstract-view.css ***!
    \**********************************************/
  /***/ ((module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
  /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
  /* harmony import */ var _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./abstract-view.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css");











  var options = {};

  options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
  options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

        options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");

  options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
  options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

  var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);


  if (true) {
    if (!_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals || module.hot.invalidate) {
      var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
    if (!a && b || a && !b) {
      return false;
    }

    var p;

    for (p in a) {
      if (isNamedExport && p === "default") {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (a[p] !== b[p]) {
        return false;
      }
    }

    for (p in b) {
      if (isNamedExport && p === "default") {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (!a[p]) {
        return false;
      }
    }

    return true;
  };
      var isNamedExport = !_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;
      var oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

      module.hot.accept(
        /*! !!../../../node_modules/css-loader/dist/cjs.js!./abstract-view.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css",
        __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./abstract-view.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css");
  (function () {
          if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals, isNamedExport)) {
                  module.hot.invalidate();

                  return;
                }

                oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

                update(_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
        })(__WEBPACK_OUTDATED_DEPENDENCIES__); }
      )
    }

    module.hot.dispose(function() {
      update();
    });
  }



         /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


  /***/ }),

  /***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
    \****************************************************************************/
  /***/ ((module) => {

  "use strict";


  var stylesInDOM = [];

  function getIndexByIdentifier(identifier) {
    var result = -1;

    for (var i = 0; i < stylesInDOM.length; i++) {
      if (stylesInDOM[i].identifier === identifier) {
        result = i;
        break;
      }
    }

    return result;
  }

  function modulesToDom(list, options) {
    var idCountMap = {};
    var identifiers = [];

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var id = options.base ? item[0] + options.base : item[0];
      var count = idCountMap[id] || 0;
      var identifier = "".concat(id, " ").concat(count);
      idCountMap[id] = count + 1;
      var indexByIdentifier = getIndexByIdentifier(identifier);
      var obj = {
        css: item[1],
        media: item[2],
        sourceMap: item[3],
        supports: item[4],
        layer: item[5]
      };

      if (indexByIdentifier !== -1) {
        stylesInDOM[indexByIdentifier].references++;
        stylesInDOM[indexByIdentifier].updater(obj);
      } else {
        var updater = addElementStyle(obj, options);
        options.byIndex = i;
        stylesInDOM.splice(i, 0, {
          identifier: identifier,
          updater: updater,
          references: 1
        });
      }

      identifiers.push(identifier);
    }

    return identifiers;
  }

  function addElementStyle(obj, options) {
    var api = options.domAPI(options);
    api.update(obj);

    var updater = function updater(newObj) {
      if (newObj) {
        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
          return;
        }

        api.update(obj = newObj);
      } else {
        api.remove();
      }
    };

    return updater;
  }

  module.exports = function (list, options) {
    options = options || {};
    list = list || [];
    var lastIdentifiers = modulesToDom(list, options);
    return function update(newList) {
      newList = newList || [];

      for (var i = 0; i < lastIdentifiers.length; i++) {
        var identifier = lastIdentifiers[i];
        var index = getIndexByIdentifier(identifier);
        stylesInDOM[index].references--;
      }

      var newLastIdentifiers = modulesToDom(newList, options);

      for (var _i = 0; _i < lastIdentifiers.length; _i++) {
        var _identifier = lastIdentifiers[_i];

        var _index = getIndexByIdentifier(_identifier);

        if (stylesInDOM[_index].references === 0) {
          stylesInDOM[_index].updater();

          stylesInDOM.splice(_index, 1);
        }
      }

      lastIdentifiers = newLastIdentifiers;
    };
  };

  /***/ }),

  /***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
  /*!********************************************************************!*\
    !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
    \********************************************************************/
  /***/ ((module) => {

  "use strict";


  var memo = {};
  /* istanbul ignore next  */

  function getTarget(target) {
    if (typeof memo[target] === "undefined") {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  }
  /* istanbul ignore next  */


  function insertBySelector(insert, style) {
    var target = getTarget(insert);

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  module.exports = insertBySelector;

  /***/ }),

  /***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
  /*!**********************************************************************!*\
    !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
    \**********************************************************************/
  /***/ ((module) => {

  "use strict";


  /* istanbul ignore next  */
  function insertStyleElement(options) {
    var element = document.createElement("style");
    options.setAttributes(element, options.attributes);
    options.insert(element, options.options);
    return element;
  }

  module.exports = insertStyleElement;

  /***/ }),

  /***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
    \**********************************************************************************/
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

  "use strict";


  /* istanbul ignore next  */
  function setAttributesWithoutAttributes(styleElement) {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      styleElement.setAttribute("nonce", nonce);
    }
  }

  module.exports = setAttributesWithoutAttributes;

  /***/ }),

  /***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
  /*!***************************************************************!*\
    !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
    \***************************************************************/
  /***/ ((module) => {

  "use strict";


  /* istanbul ignore next  */
  function apply(styleElement, options, obj) {
    var css = "";

    if (obj.supports) {
      css += "@supports (".concat(obj.supports, ") {");
    }

    if (obj.media) {
      css += "@media ".concat(obj.media, " {");
    }

    var needLayer = typeof obj.layer !== "undefined";

    if (needLayer) {
      css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
    }

    css += obj.css;

    if (needLayer) {
      css += "}";
    }

    if (obj.media) {
      css += "}";
    }

    if (obj.supports) {
      css += "}";
    }

    var sourceMap = obj.sourceMap;

    if (sourceMap && typeof btoa !== "undefined") {
      css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
    } // For old IE

    /* istanbul ignore if  */


    options.styleTagTransform(css, styleElement, options.options);
  }

  function removeStyleElement(styleElement) {
    // istanbul ignore if
    if (styleElement.parentNode === null) {
      return false;
    }

    styleElement.parentNode.removeChild(styleElement);
  }
  /* istanbul ignore next  */


  function domAPI(options) {
    var styleElement = options.insertStyleElement(options);
    return {
      update: function update(obj) {
        apply(styleElement, options, obj);
      },
      remove: function remove() {
        removeStyleElement(styleElement);
      }
    };
  }

  module.exports = domAPI;

  /***/ }),

  /***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
    \*********************************************************************/
  /***/ ((module) => {

  "use strict";


  /* istanbul ignore next  */
  function styleTagTransform(css, styleElement) {
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = css;
    } else {
      while (styleElement.firstChild) {
        styleElement.removeChild(styleElement.firstChild);
      }

      styleElement.appendChild(document.createTextNode(css));
    }
  }

  module.exports = styleTagTransform;

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
  /*!***************************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
    \***************************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (/* binding */ WebSocketClient)
  /* harmony export */ });
  /* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



  var WebSocketClient = /*#__PURE__*/function () {
    /**
     * @param {string} url
     */
    function WebSocketClient(url) {
      _classCallCheck(this, WebSocketClient);

      this.client = new WebSocket(url);

      this.client.onerror = function (error) {
        _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
      };
    }
    /**
     * @param {(...args: any[]) => void} f
     */


    _createClass(WebSocketClient, [{
      key: "onOpen",
      value: function onOpen(f) {
        this.client.onopen = f;
      }
      /**
       * @param {(...args: any[]) => void} f
       */

    }, {
      key: "onClose",
      value: function onClose(f) {
        this.client.onclose = f;
      } // call f with the message string as the first argument

      /**
       * @param {(...args: any[]) => void} f
       */

    }, {
      key: "onMessage",
      value: function onMessage(f) {
        this.client.onmessage = function (e) {
          f(e.data);
        };
      }
    }]);

    return WebSocketClient;
  }();



  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
  /*!***********************************************************************************************************************************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
    \***********************************************************************************************************************************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
  /* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
  /* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
  /* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
  /* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
  /* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
  /* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
  /* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
  /* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /* global __resourceQuery, __webpack_hash__ */
  /// <reference types="webpack/module" />









  /**
   * @typedef {Object} Options
   * @property {boolean} hot
   * @property {boolean} liveReload
   * @property {boolean} progress
   * @property {boolean | { warnings?: boolean, errors?: boolean, trustedTypesPolicyName?: string }} overlay
   * @property {string} [logging]
   * @property {number} [reconnect]
   */

  /**
   * @typedef {Object} Status
   * @property {boolean} isUnloading
   * @property {string} currentHash
   * @property {string} [previousHash]
   */

  /**
   * @type {Status}
   */

  var status = {
    isUnloading: false,
    // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
    // eslint-disable-next-line camelcase
    currentHash:  true ? __webpack_require__.h() : 0
  };
  /** @type {Options} */

  var options = {
    hot: false,
    liveReload: false,
    progress: false,
    overlay: false
  };
  var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
  var enabledFeatures = {
    "Hot Module Replacement": false,
    "Live Reloading": false,
    Progress: false,
    Overlay: false
  };

  if (parsedResourceQuery.hot === "true") {
    options.hot = true;
    enabledFeatures["Hot Module Replacement"] = true;
  }

  if (parsedResourceQuery["live-reload"] === "true") {
    options.liveReload = true;
    enabledFeatures["Live Reloading"] = true;
  }

  if (parsedResourceQuery.progress === "true") {
    options.progress = true;
    enabledFeatures.Progress = true;
  }

  if (parsedResourceQuery.overlay) {
    try {
      options.overlay = JSON.parse(parsedResourceQuery.overlay);
    } catch (e) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
    } // Fill in default "true" params for partially-specified objects.


    if (typeof options.overlay === "object") {
      options.overlay = _objectSpread({
        errors: true,
        warnings: true
      }, options.overlay);
    }

    enabledFeatures.Overlay = true;
  }

  if (parsedResourceQuery.logging) {
    options.logging = parsedResourceQuery.logging;
  }

  if (typeof parsedResourceQuery.reconnect !== "undefined") {
    options.reconnect = Number(parsedResourceQuery.reconnect);
  }
  /**
   * @param {string} level
   */


  function setAllLogLevel(level) {
    // This is needed because the HMR logger operate separately from dev server logger
    webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
    (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
  }

  if (options.logging) {
    setAllLogLevel(options.logging);
  }

  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
  self.addEventListener("beforeunload", function () {
    status.isUnloading = true;
  });
  var onSocketMessage = {
    hot: function hot() {
      if (parsedResourceQuery.hot === "false") {
        return;
      }

      options.hot = true;
    },
    liveReload: function liveReload() {
      if (parsedResourceQuery["live-reload"] === "false") {
        return;
      }

      options.liveReload = true;
    },
    invalid: function invalid() {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

      if (options.overlay) {
        (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
      }

      (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
    },

    /**
     * @param {string} hash
     */
    hash: function hash(_hash) {
      status.previousHash = status.currentHash;
      status.currentHash = _hash;
    },
    logging: setAllLogLevel,

    /**
     * @param {boolean} value
     */
    overlay: function overlay(value) {
      if (typeof document === "undefined") {
        return;
      }

      options.overlay = value;
    },

    /**
     * @param {number} value
     */
    reconnect: function reconnect(value) {
      if (parsedResourceQuery.reconnect === "false") {
        return;
      }

      options.reconnect = value;
    },

    /**
     * @param {boolean} value
     */
    progress: function progress(value) {
      options.progress = value;
    },

    /**
     * @param {{ pluginName?: string, percent: number, msg: string }} data
     */
    "progress-update": function progressUpdate(data) {
      if (options.progress) {
        _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
      }

      (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
    },
    "still-ok": function stillOk() {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

      if (options.overlay) {
        (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
      }

      (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
    },
    ok: function ok() {
      (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

      if (options.overlay) {
        (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
      }

      (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
    },
    // TODO: remove in v5 in favor of 'static-changed'

    /**
     * @param {string} file
     */
    "content-changed": function contentChanged(file) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
      self.location.reload();
    },

    /**
     * @param {string} file
     */
    "static-changed": function staticChanged(file) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
      self.location.reload();
    },

    /**
     * @param {Error[]} warnings
     * @param {any} params
     */
    warnings: function warnings(_warnings, params) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

      var printableWarnings = _warnings.map(function (error) {
        var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
            header = _formatProblem.header,
            body = _formatProblem.body;

        return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
      });

      (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);

      for (var i = 0; i < printableWarnings.length; i++) {
        _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
      }

      var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

      if (needShowOverlayForWarnings) {
        var trustedTypesPolicyName = typeof options.overlay === "object" && options.overlay.trustedTypesPolicyName;
        (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("warning", _warnings, trustedTypesPolicyName || null);
      }

      if (params && params.preventReloading) {
        return;
      }

      (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
    },

    /**
     * @param {Error[]} errors
     */
    errors: function errors(_errors) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

      var printableErrors = _errors.map(function (error) {
        var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
            header = _formatProblem2.header,
            body = _formatProblem2.body;

        return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
      });

      (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);

      for (var i = 0; i < printableErrors.length; i++) {
        _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
      }

      var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

      if (needShowOverlayForErrors) {
        var trustedTypesPolicyName = typeof options.overlay === "object" && options.overlay.trustedTypesPolicyName;
        (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("error", _errors, trustedTypesPolicyName || null);
      }
    },

    /**
     * @param {Error} error
     */
    error: function error(_error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
    },
    close: function close() {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

      if (options.overlay) {
        (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
      }

      (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
    }
  };
  var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
  (0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
  /*!************************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
    \************************************************************************/
  /***/ ((__unused_webpack_module, exports) => {

  /******/ (function() { // webpackBootstrap
  /******/ 	"use strict";
  /******/ 	var __webpack_modules__ = ({

  /***/ "./client-src/modules/logger/SyncBailHookFake.js":
  /*!*******************************************************!*\
    !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
    \*******************************************************/
  /***/ (function(module) {


  /**
   * Client stub for tapable SyncBailHook
   */

  module.exports = function clientTapableSyncBailHook() {
    return {
      call: function call() {}
    };
  };

  /***/ }),

  /***/ "./node_modules/webpack/lib/logging/Logger.js":
  /*!****************************************************!*\
    !*** ./node_modules/webpack/lib/logging/Logger.js ***!
    \****************************************************/
  /***/ (function(__unused_webpack_module, exports) {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */


  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _iterableToArray(iter) {
    if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var LogType = Object.freeze({
    error:
    /** @type {"error"} */
    "error",
    // message, c style arguments
    warn:
    /** @type {"warn"} */
    "warn",
    // message, c style arguments
    info:
    /** @type {"info"} */
    "info",
    // message, c style arguments
    log:
    /** @type {"log"} */
    "log",
    // message, c style arguments
    debug:
    /** @type {"debug"} */
    "debug",
    // message, c style arguments
    trace:
    /** @type {"trace"} */
    "trace",
    // no arguments
    group:
    /** @type {"group"} */
    "group",
    // [label]
    groupCollapsed:
    /** @type {"groupCollapsed"} */
    "groupCollapsed",
    // [label]
    groupEnd:
    /** @type {"groupEnd"} */
    "groupEnd",
    // [label]
    profile:
    /** @type {"profile"} */
    "profile",
    // [profileName]
    profileEnd:
    /** @type {"profileEnd"} */
    "profileEnd",
    // [profileName]
    time:
    /** @type {"time"} */
    "time",
    // name, time as [seconds, nanoseconds]
    clear:
    /** @type {"clear"} */
    "clear",
    // no arguments
    status:
    /** @type {"status"} */
    "status" // message, arguments

  });
  exports.LogType = LogType;
  /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

  var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
  var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
  var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

  var WebpackLogger = /*#__PURE__*/function () {
    /**
     * @param {function(LogTypeEnum, any[]=): void} log log function
     * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
     */
    function WebpackLogger(log, getChildLogger) {
      _classCallCheck(this, WebpackLogger);

      this[LOG_SYMBOL] = log;
      this.getChildLogger = getChildLogger;
    }

    _createClass(WebpackLogger, [{
      key: "error",
      value: function error() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }, {
      key: "warn",
      value: function warn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        this[LOG_SYMBOL](LogType.warn, args);
      }
    }, {
      key: "info",
      value: function info() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        this[LOG_SYMBOL](LogType.info, args);
      }
    }, {
      key: "log",
      value: function log() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        this[LOG_SYMBOL](LogType.log, args);
      }
    }, {
      key: "debug",
      value: function debug() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        this[LOG_SYMBOL](LogType.debug, args);
      }
    }, {
      key: "assert",
      value: function assert(assertion) {
        if (!assertion) {
          for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            args[_key6 - 1] = arguments[_key6];
          }

          this[LOG_SYMBOL](LogType.error, args);
        }
      }
    }, {
      key: "trace",
      value: function trace() {
        this[LOG_SYMBOL](LogType.trace, ["Trace"]);
      }
    }, {
      key: "clear",
      value: function clear() {
        this[LOG_SYMBOL](LogType.clear);
      }
    }, {
      key: "status",
      value: function status() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        this[LOG_SYMBOL](LogType.status, args);
      }
    }, {
      key: "group",
      value: function group() {
        for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        this[LOG_SYMBOL](LogType.group, args);
      }
    }, {
      key: "groupCollapsed",
      value: function groupCollapsed() {
        for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }

        this[LOG_SYMBOL](LogType.groupCollapsed, args);
      }
    }, {
      key: "groupEnd",
      value: function groupEnd() {
        for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          args[_key10] = arguments[_key10];
        }

        this[LOG_SYMBOL](LogType.groupEnd, args);
      }
    }, {
      key: "profile",
      value: function profile(label) {
        this[LOG_SYMBOL](LogType.profile, [label]);
      }
    }, {
      key: "profileEnd",
      value: function profileEnd(label) {
        this[LOG_SYMBOL](LogType.profileEnd, [label]);
      }
    }, {
      key: "time",
      value: function time(label) {
        this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
        this[TIMERS_SYMBOL].set(label, process.hrtime());
      }
    }, {
      key: "timeLog",
      value: function timeLog(label) {
        var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

        if (!prev) {
          throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
        }

        var time = process.hrtime(prev);
        this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
      }
    }, {
      key: "timeEnd",
      value: function timeEnd(label) {
        var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

        if (!prev) {
          throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
        }

        var time = process.hrtime(prev);
        this[TIMERS_SYMBOL].delete(label);
        this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
      }
    }, {
      key: "timeAggregate",
      value: function timeAggregate(label) {
        var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

        if (!prev) {
          throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
        }

        var time = process.hrtime(prev);
        this[TIMERS_SYMBOL].delete(label);
        this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
        var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

        if (current !== undefined) {
          if (time[1] + current[1] > 1e9) {
            time[0] += current[0] + 1;
            time[1] = time[1] - 1e9 + current[1];
          } else {
            time[0] += current[0];
            time[1] += current[1];
          }
        }

        this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
      }
    }, {
      key: "timeAggregateEnd",
      value: function timeAggregateEnd(label) {
        if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
        var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
        if (time === undefined) return;
        this[TIMERS_AGGREGATES_SYMBOL].delete(label);
        this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
      }
    }]);

    return WebpackLogger;
  }();

  exports.Logger = WebpackLogger;

  /***/ }),

  /***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
    \*****************************************************************/
  /***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10785__) {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */


  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _iterableToArray(iter) {
    if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var _require = __nested_webpack_require_10785__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
      LogType = _require.LogType;
  /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

  /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

  /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

  /** @typedef {function(string): boolean} FilterFunction */

  /**
   * @typedef {Object} LoggerConsole
   * @property {function(): void} clear
   * @property {function(): void} trace
   * @property {(...args: any[]) => void} info
   * @property {(...args: any[]) => void} log
   * @property {(...args: any[]) => void} warn
   * @property {(...args: any[]) => void} error
   * @property {(...args: any[]) => void=} debug
   * @property {(...args: any[]) => void=} group
   * @property {(...args: any[]) => void=} groupCollapsed
   * @property {(...args: any[]) => void=} groupEnd
   * @property {(...args: any[]) => void=} status
   * @property {(...args: any[]) => void=} profile
   * @property {(...args: any[]) => void=} profileEnd
   * @property {(...args: any[]) => void=} logTime
   */

  /**
   * @typedef {Object} LoggerOptions
   * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
   * @property {FilterTypes|boolean} debug filter for debug logging
   * @property {LoggerConsole} console the console to log to
   */

  /**
   * @param {FilterItemTypes} item an input item
   * @returns {FilterFunction} filter function
   */


  var filterToFunction = function filterToFunction(item) {
    if (typeof item === "string") {
      var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
      /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
      return function (ident) {
        return regExp.test(ident);
      };
    }

    if (item && typeof item === "object" && typeof item.test === "function") {
      return function (ident) {
        return item.test(ident);
      };
    }

    if (typeof item === "function") {
      return item;
    }

    if (typeof item === "boolean") {
      return function () {
        return item;
      };
    }
  };
  /**
   * @enum {number}
   */


  var LogLevel = {
    none: 6,
    false: 6,
    error: 5,
    warn: 4,
    info: 3,
    log: 2,
    true: 2,
    verbose: 1
  };
  /**
   * @param {LoggerOptions} options options object
   * @returns {function(string, LogTypeEnum, any[]): void} logging function
   */

  module.exports = function (_ref) {
    var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "info" : _ref$level,
        _ref$debug = _ref.debug,
        debug = _ref$debug === void 0 ? false : _ref$debug,
        console = _ref.console;
    var debugFilters = typeof debug === "boolean" ? [function () {
      return debug;
    }] :
    /** @type {FilterItemTypes[]} */
    [].concat(debug).map(filterToFunction);
    /** @type {number} */

    var loglevel = LogLevel["".concat(level)] || 0;
    /**
     * @param {string} name name of the logger
     * @param {LogTypeEnum} type type of the log entry
     * @param {any[]} args arguments of the log entry
     * @returns {void}
     */

    var logger = function logger(name, type, args) {
      var labeledArgs = function labeledArgs() {
        if (Array.isArray(args)) {
          if (args.length > 0 && typeof args[0] === "string") {
            return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
          } else {
            return ["[".concat(name, "]")].concat(_toConsumableArray(args));
          }
        } else {
          return [];
        }
      };

      var debug = debugFilters.some(function (f) {
        return f(name);
      });

      switch (type) {
        case LogType.debug:
          if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

          if (typeof console.debug === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.debug.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;

        case LogType.log:
          if (!debug && loglevel > LogLevel.log) return;
          console.log.apply(console, _toConsumableArray(labeledArgs()));
          break;

        case LogType.info:
          if (!debug && loglevel > LogLevel.info) return;
          console.info.apply(console, _toConsumableArray(labeledArgs()));
          break;

        case LogType.warn:
          if (!debug && loglevel > LogLevel.warn) return;
          console.warn.apply(console, _toConsumableArray(labeledArgs()));
          break;

        case LogType.error:
          if (!debug && loglevel > LogLevel.error) return;
          console.error.apply(console, _toConsumableArray(labeledArgs()));
          break;

        case LogType.trace:
          if (!debug) return;
          console.trace();
          break;

        case LogType.groupCollapsed:
          if (!debug && loglevel > LogLevel.log) return;

          if (!debug && loglevel > LogLevel.verbose) {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            if (typeof console.groupCollapsed === "function") {
              // eslint-disable-next-line node/no-unsupported-features/node-builtins
              console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
            } else {
              console.log.apply(console, _toConsumableArray(labeledArgs()));
            }

            break;
          }

        // falls through

        case LogType.group:
          if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

          if (typeof console.group === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.group.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;

        case LogType.groupEnd:
          if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

          if (typeof console.groupEnd === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupEnd();
          }

          break;

        case LogType.time:
          {
            if (!debug && loglevel > LogLevel.log) return;
            var ms = args[1] * 1000 + args[2] / 1000000;
            var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

            if (typeof console.logTime === "function") {
              console.logTime(msg);
            } else {
              console.log(msg);
            }

            break;
          }

        case LogType.profile:
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.profile === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.profile.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;

        case LogType.profileEnd:
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.profileEnd === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;

        case LogType.clear:
          if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

          if (typeof console.clear === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.clear();
          }

          break;

        case LogType.status:
          if (!debug && loglevel > LogLevel.info) return;

          if (typeof console.status === "function") {
            if (args.length === 0) {
              console.status();
            } else {
              console.status.apply(console, _toConsumableArray(labeledArgs()));
            }
          } else {
            if (args.length !== 0) {
              console.info.apply(console, _toConsumableArray(labeledArgs()));
            }
          }

          break;

        default:
          throw new Error("Unexpected LogType ".concat(type));
      }
    };

    return logger;
  };

  /***/ }),

  /***/ "./node_modules/webpack/lib/logging/runtime.js":
  /*!*****************************************************!*\
    !*** ./node_modules/webpack/lib/logging/runtime.js ***!
    \*****************************************************/
  /***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20872__) {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */


  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };
    return _extends.apply(this, arguments);
  }

  var SyncBailHook = __nested_webpack_require_20872__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

  var _require = __nested_webpack_require_20872__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
      Logger = _require.Logger;

  var createConsoleLogger = __nested_webpack_require_20872__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
  /** @type {createConsoleLogger.LoggerOptions} */


  var currentDefaultLoggerOptions = {
    level: "info",
    debug: false,
    console: console
  };
  var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
  /**
   * @param {string} name name of the logger
   * @returns {Logger} a logger
   */

  exports.getLogger = function (name) {
    return new Logger(function (type, args) {
      if (exports.hooks.log.call(name, type, args) === undefined) {
        currentDefaultLogger(name, type, args);
      }
    }, function (childName) {
      return exports.getLogger("".concat(name, "/").concat(childName));
    });
  };
  /**
   * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
   * @returns {void}
   */


  exports.configureDefaultLogger = function (options) {
    _extends(currentDefaultLoggerOptions, options);

    currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
  };

  exports.hooks = {
    log: new SyncBailHook(["origin", "type", "args"])
  };

  /***/ })

  /******/ 	});
  /************************************************************************/
  /******/ 	// The module cache
  /******/ 	var __webpack_module_cache__ = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __nested_webpack_require_23009__(moduleId) {
  /******/ 		// Check if module is in cache
  /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
  /******/ 		if (cachedModule !== undefined) {
  /******/ 			return cachedModule.exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = __webpack_module_cache__[moduleId] = {
  /******/ 			// no module.id needed
  /******/ 			// no module.loaded needed
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23009__);
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /************************************************************************/
  /******/ 	/* webpack/runtime/define property getters */
  /******/ 	!function() {
  /******/ 		// define getter functions for harmony exports
  /******/ 		__nested_webpack_require_23009__.d = function(exports, definition) {
  /******/ 			for(var key in definition) {
  /******/ 				if(__nested_webpack_require_23009__.o(definition, key) && !__nested_webpack_require_23009__.o(exports, key)) {
  /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
  /******/ 				}
  /******/ 			}
  /******/ 		};
  /******/ 	}();
  /******/
  /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
  /******/ 	!function() {
  /******/ 		__nested_webpack_require_23009__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
  /******/ 	}();
  /******/
  /******/ 	/* webpack/runtime/make namespace object */
  /******/ 	!function() {
  /******/ 		// define __esModule on exports
  /******/ 		__nested_webpack_require_23009__.r = function(exports) {
  /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 			}
  /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 		};
  /******/ 	}();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  !function() {
  /*!********************************************!*\
    !*** ./client-src/modules/logger/index.js ***!
    \********************************************/
  __nested_webpack_require_23009__.r(__webpack_exports__);
  /* harmony export */ __nested_webpack_require_23009__.d(__webpack_exports__, {
  /* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
  /* harmony export */ });
  /* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23009__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

  }();
  var __webpack_export_target__ = exports;
  for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
  /******/ })()
  ;

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/overlay.js":
  /*!***********************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
    \***********************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "formatProblem": () => (/* binding */ formatProblem),
  /* harmony export */   "hide": () => (/* binding */ hide),
  /* harmony export */   "show": () => (/* binding */ show)
  /* harmony export */ });
  /* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
  /* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
  /* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
  // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
  // They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


  var colors = {
    reset: ["transparent", "transparent"],
    black: "181818",
    red: "E36049",
    green: "B3CB74",
    yellow: "FFD080",
    blue: "7CAFC2",
    magenta: "7FACCA",
    cyan: "C3C2EF",
    lightgrey: "EBE7E3",
    darkgrey: "6D7891"
  };
  /** @type {HTMLIFrameElement | null | undefined} */

  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */

  var containerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */

  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */

  var overlayTrustedTypesPolicy;
  ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);
  /**
   * @param {string | null} trustedTypesPolicyName
   */

  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }

    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    iframeContainerElement.style.position = "fixed";
    iframeContainerElement.style.left = 0;
    iframeContainerElement.style.top = 0;
    iframeContainerElement.style.right = 0;
    iframeContainerElement.style.bottom = 0;
    iframeContainerElement.style.width = "100vw";
    iframeContainerElement.style.height = "100vh";
    iframeContainerElement.style.border = "none";
    iframeContainerElement.style.zIndex = 9999999999;

    iframeContainerElement.onload = function () {
      containerElement =
      /** @type {Document} */

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      containerElement.id = "webpack-dev-server-client-overlay-div";
      containerElement.style.position = "fixed";
      containerElement.style.boxSizing = "border-box";
      containerElement.style.left = 0;
      containerElement.style.top = 0;
      containerElement.style.right = 0;
      containerElement.style.bottom = 0;
      containerElement.style.width = "100vw";
      containerElement.style.height = "100vh";
      containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
      containerElement.style.color = "#E8E8E8";
      containerElement.style.fontFamily = "Menlo, Consolas, monospace";
      containerElement.style.fontSize = "large";
      containerElement.style.padding = "2rem";
      containerElement.style.lineHeight = "1.2";
      containerElement.style.whiteSpace = "pre-wrap";
      containerElement.style.overflow = "auto";
      var headerElement = document.createElement("span");
      headerElement.innerText = "Compiled with problems:";
      var closeButtonElement = document.createElement("button");
      closeButtonElement.innerText = "X";
      closeButtonElement.style.background = "transparent";
      closeButtonElement.style.border = "none";
      closeButtonElement.style.fontSize = "20px";
      closeButtonElement.style.fontWeight = "bold";
      closeButtonElement.style.color = "white";
      closeButtonElement.style.cursor = "pointer";
      closeButtonElement.style.cssFloat = "right"; // @ts-ignore

      closeButtonElement.style.styleFloat = "right";
      closeButtonElement.addEventListener("click", function () {
        hide();
      });
      containerElement.appendChild(headerElement);
      containerElement.appendChild(closeButtonElement);
      containerElement.appendChild(document.createElement("br"));
      containerElement.appendChild(document.createElement("br"));
      /** @type {Document} */

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.body.appendChild(containerElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad(
        /** @type {HTMLDivElement} */
        containerElement);
      });
      onLoadQueue = [];
      /** @type {HTMLIFrameElement} */

      iframeContainerElement.onload = null;
    };

    document.body.appendChild(iframeContainerElement);
  }
  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */


  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }

    onLoadQueue.push(callback);

    if (iframeContainerElement) {
      return;
    }

    createContainer(trustedTypesPolicyName);
  } // Successful compilation.


  function hide() {
    if (!iframeContainerElement) {
      return;
    } // Clean up and reset internal state.


    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }
  /**
   * @param {string} type
   * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string }} item
   * @returns {{ header: string, body: string }}
   */


  function formatProblem(type, item) {
    var header = type === "warning" ? "WARNING" : "ERROR";
    var body = "";

    if (typeof item === "string") {
      body += item;
    } else {
      var file = item.file || ""; // eslint-disable-next-line no-nested-ternary

      var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
      var loc = item.loc;
      header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
      body += item.message || "";
    }

    return {
      header: header,
      body: body
    };
  } // Compilation with errors (e.g. syntax error or missing modules).

  /**
   * @param {string} type
   * @param {Array<string  | { file?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   */


  function show(type, messages, trustedTypesPolicyName) {
    ensureOverlayExists(function () {
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var typeElement = document.createElement("span");

        var _formatProblem = formatProblem(type, message),
            header = _formatProblem.header,
            body = _formatProblem.body;

        typeElement.innerText = header;
        typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));
        var messageTextNode = document.createElement("div");
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(document.createElement("br"));
        entryElement.appendChild(document.createElement("br"));
        entryElement.appendChild(messageTextNode);
        entryElement.appendChild(document.createElement("br"));
        entryElement.appendChild(document.createElement("br"));
        /** @type {HTMLDivElement} */

        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }



  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/socket.js":
  /*!**********************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/socket.js ***!
    \**********************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "client": () => (/* binding */ client),
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
  /* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
  /* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
  /* global __webpack_dev_server_client__ */

   // this WebsocketClient is here as a default fallback, in case the client is not injected

  /* eslint-disable camelcase */

  var Client = // eslint-disable-next-line no-nested-ternary
  typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  /* eslint-enable camelcase */

  var retries = 0;
  var maxRetries = 10; // Initialized client is exported so external consumers can utilize the same instance
  // It is mutable to enforce singleton
  // eslint-disable-next-line import/no-mutable-exports

  var client = null;
  /**
   * @param {string} url
   * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
   * @param {number} [reconnect]
   */

  var socket = function initSocket(url, handlers, reconnect) {
    client = new Client(url);
    client.onOpen(function () {
      retries = 0;

      if (typeof reconnect !== "undefined") {
        maxRetries = reconnect;
      }
    });
    client.onClose(function () {
      if (retries === 0) {
        handlers.close();
      } // Try to reconnect.


      client = null; // After 10 retries stop trying, to prevent logspam.

      if (retries < maxRetries) {
        // Exponentially increase timeout to reconnect.
        // Respectfully copied from the package `got`.
        // eslint-disable-next-line no-restricted-properties
        var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
        retries += 1;
        _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
        setTimeout(function () {
          socket(url, handlers, reconnect);
        }, retryInMs);
      }
    });
    client.onMessage(
    /**
     * @param {any} data
     */
    function (data) {
      var message = JSON.parse(data);

      if (handlers[message.type]) {
        handlers[message.type](message.data, message.params);
      }
    });
  };

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
  /*!*************************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
    \*************************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /**
   * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
   * @returns {string}
   */
  function format(objURL) {
    var protocol = objURL.protocol || "";

    if (protocol && protocol.substr(-1) !== ":") {
      protocol += ":";
    }

    var auth = objURL.auth || "";

    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ":");
      auth += "@";
    }

    var host = "";

    if (objURL.hostname) {
      host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));

      if (objURL.port) {
        host += ":".concat(objURL.port);
      }
    }

    var pathname = objURL.pathname || "";

    if (objURL.slashes) {
      host = "//".concat(host || "");

      if (pathname && pathname.charAt(0) !== "/") {
        pathname = "/".concat(pathname);
      }
    } else if (!host) {
      host = "";
    }

    var search = objURL.search || "";

    if (search && search.charAt(0) !== "?") {
      search = "?".concat(search);
    }

    var hash = objURL.hash || "";

    if (hash && hash.charAt(0) !== "#") {
      hash = "#".concat(hash);
    }

    pathname = pathname.replace(/[?#]/g,
    /**
     * @param {string} match
     * @returns {string}
     */
    function (match) {
      return encodeURIComponent(match);
    });
    search = search.replace("#", "%23");
    return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
  }
  /**
   * @param {URL & { fromCurrentScript?: boolean }} parsedURL
   * @returns {string}
   */


  function createSocketURL(parsedURL) {
    var hostname = parsedURL.hostname; // Node.js module parses it as `::`
    // `new URL(urlString, [baseURLString])` parses it as '[::]'

    var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
    // hostname n/a for file protocol (example, when using electron, ionic)
    // see: https://github.com/webpack/webpack-dev-server/pull/384

    if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
      hostname = self.location.hostname;
    }

    var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

    if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
      socketURLProtocol = self.location.protocol;
    }

    socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
    var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
    // Parse authentication credentials in case we need them

    if (parsedURL.username) {
      socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
      // we only include password if the username is not empty.

      if (parsedURL.password) {
        // Result: <username>:<password>
        socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
      }
    } // In case the host is a raw IPv6 address, it can be enclosed in
    // the brackets as the brackets are needed in the final URL string.
    // Need to remove those as url.format blindly adds its own set of brackets
    // if the host string contains colons. That would lead to non-working
    // double brackets (e.g. [[::]]) host
    //
    // All of these web socket url params are optionally passed in through resourceQuery,
    // so we need to fall back to the default if they are not provided


    var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
    var socketURLPort = parsedURL.port;

    if (!socketURLPort || socketURLPort === "0") {
      socketURLPort = self.location.port;
    } // If path is provided it'll be passed in via the resourceQuery as a
    // query param so it has to be parsed out of the querystring in order for the
    // client to open the socket to the correct location.


    var socketURLPathname = "/ws";

    if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
      socketURLPathname = parsedURL.pathname;
    }

    return format({
      protocol: socketURLProtocol,
      auth: socketURLAuth,
      hostname: socketURLHostname,
      port: socketURLPort,
      pathname: socketURLPathname,
      slashes: true
    });
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
  /*!********************************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
    \********************************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /**
   * @returns {string}
   */
  function getCurrentScriptSource() {
    // `document.currentScript` is the most accurate way to find the current script,
    // but is not supported in all browsers.
    if (document.currentScript) {
      return document.currentScript.getAttribute("src");
    } // Fallback to getting all scripts running in the document.


    var scriptElements = document.scripts || [];
    var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
      return element.getAttribute("src");
    });

    if (scriptElementsWithSrc.length > 0) {
      var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
      return currentScript.getAttribute("src");
    } // Fail as there was no script to use.


    throw new Error("[webpack-dev-server] Failed to get current script source.");
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/log.js":
  /*!*************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
    \*************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "log": () => (/* binding */ log),
  /* harmony export */   "logEnabledFeatures": () => (/* binding */ logEnabledFeatures),
  /* harmony export */   "setLogLevel": () => (/* binding */ setLogLevel)
  /* harmony export */ });
  /* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
  /* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

  var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
  // to be set by the CLI or API

  var defaultLevel = "info"; // options new options, merge with old options

  /**
   * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
   * @returns {void}
   */

  function setLogLevel(level) {
    _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
      level: level
    });
  }

  setLogLevel(defaultLevel);
  var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);

  var logEnabledFeatures = function logEnabledFeatures(features) {
    var enabledFeatures = Object.keys(features);

    if (!features || enabledFeatures.length === 0) {
      return;
    }

    var logString = "Server started:"; // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.

    for (var i = 0; i < enabledFeatures.length; i++) {
      var key = enabledFeatures[i];
      logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
    } // replace last comma with a period


    logString = logString.slice(0, -1).concat(".");
    log.info(logString);
  };



  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
  /*!******************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
    \******************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

  /**
   * @param {string} resourceQuery
   * @returns {{ [key: string]: string | boolean }}
   */

  function parseURL(resourceQuery) {
    /** @type {{ [key: string]: string }} */
    var options = {};

    if (typeof resourceQuery === "string" && resourceQuery !== "") {
      var searchParams = resourceQuery.slice(1).split("&");

      for (var i = 0; i < searchParams.length; i++) {
        var pair = searchParams[i].split("=");
        options[pair[0]] = decodeURIComponent(pair[1]);
      }
    } else {
      // Else, get the url from the <script> this file was called with.
      var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
      var scriptSourceURL;

      try {
        // The placeholder `baseURL` with `window.location.href`,
        // is to allow parsing of path-relative or protocol-relative URLs,
        // and will have no effect if `scriptSource` is a fully valid URL.
        scriptSourceURL = new URL(scriptSource, self.location.href);
      } catch (error) {// URL parsing failed, do nothing.
        // We will still proceed to see if we can recover using `resourceQuery`
      }

      if (scriptSourceURL) {
        options = scriptSourceURL;
        options.fromCurrentScript = true;
      }
    }

    return options;
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
    \*******************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
  /* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");


  /** @typedef {import("../index").Options} Options
  /** @typedef {import("../index").Status} Status

  /**
   * @param {Options} options
   * @param {Status} status
   */

  function reloadApp(_ref, status) {
    var hot = _ref.hot,
        liveReload = _ref.liveReload;

    if (status.isUnloading) {
      return;
    }

    var currentHash = status.currentHash,
        previousHash = status.previousHash;
    var isInitial = currentHash.indexOf(
    /** @type {string} */
    previousHash) >= 0;

    if (isInitial) {
      return;
    }
    /**
     * @param {Window} rootWindow
     * @param {number} intervalId
     */


    function applyReload(rootWindow, intervalId) {
      clearInterval(intervalId);
      _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
      rootWindow.location.reload();
    }

    var search = self.location.search.toLowerCase();
    var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
    var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

    if (hot && allowToHot) {
      _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
      webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

      if (typeof self !== "undefined" && self.window) {
        // broadcast update to window
        self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
      }
    } // allow refreshing the page only if liveReload isn't disabled
    else if (liveReload && allowToLiveReload) {
      var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

      var intervalId = self.setInterval(function () {
        if (rootWindow.location.protocol !== "about:") {
          // reload immediately if protocol is valid
          applyReload(rootWindow, intervalId);
        } else {
          rootWindow = rootWindow.parent;

          if (rootWindow.parent === rootWindow) {
            // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
            applyReload(rootWindow, intervalId);
          }
        }
      });
    }
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
  /*!*********************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
    \*********************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* global __resourceQuery WorkerGlobalScope */
  // Send messages to the outside, so plugins can consume it.

  /**
   * @param {string} type
   * @param {any} [data]
   */
  function sendMsg(type, data) {
    if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
      self.postMessage({
        type: "webpack".concat(type),
        data: data
      }, "*");
    }
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

  /***/ }),

  /***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
    \*******************************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");
  /**
   *
   * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
   * Adapted from code originally released by Sindre Sorhus
   * Licensed the MIT License
   *
   * @param {string} string
   * @return {string}
   */

  function stripAnsi(string) {
    if (typeof string !== "string") {
      throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
    }

    return string.replace(ansiRegex, "");
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

  /***/ }),

  /***/ "./node_modules/webpack/hot/dev-server.js":
  /*!************************************************!*\
    !*** ./node_modules/webpack/hot/dev-server.js ***!
    \************************************************/
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  /* globals __webpack_hash__ */
  if (true) {
    var lastHash;
    var upToDate = function upToDate() {
      return lastHash.indexOf(__webpack_require__.h()) >= 0;
    };
    var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
    var check = function check() {
      module.hot
        .check(true)
        .then(function (updatedModules) {
          if (!updatedModules) {
            log(
              "warning",
              "[HMR] Cannot find update. " +
                (typeof window !== "undefined"
                  ? "Need to do a full reload!"
                  : "Please reload manually!")
            );
            log(
              "warning",
              "[HMR] (Probably because of restarting the webpack-dev-server)"
            );
            if (typeof window !== "undefined") {
              window.location.reload();
            }
            return;
          }

          if (!upToDate()) {
            check();
          }

          __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

          if (upToDate()) {
            log("info", "[HMR] App is up to date.");
          }
        })
        .catch(function (err) {
          var status = module.hot.status();
          if (["abort", "fail"].indexOf(status) >= 0) {
            log(
              "warning",
              "[HMR] Cannot apply update. " +
                (typeof window !== "undefined"
                  ? "Need to do a full reload!"
                  : "Please reload manually!")
            );
            log("warning", "[HMR] " + log.formatError(err));
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          } else {
            log("warning", "[HMR] Update failed: " + log.formatError(err));
          }
        });
    };
    var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
    hotEmitter.on("webpackHotUpdate", function (currentHash) {
      lastHash = currentHash;
      if (!upToDate() && module.hot.status() === "idle") {
        log("info", "[HMR] Checking for updates on the server...");
        check();
      }
    });
    log("info", "[HMR] Waiting for update signal from WDS...");
  } else {}


  /***/ }),

  /***/ "./node_modules/webpack/hot/emitter.js":
  /*!*********************************************!*\
    !*** ./node_modules/webpack/hot/emitter.js ***!
    \*********************************************/
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

  var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
  module.exports = new EventEmitter();


  /***/ }),

  /***/ "./node_modules/webpack/hot/log-apply-result.js":
  /*!******************************************************!*\
    !*** ./node_modules/webpack/hot/log-apply-result.js ***!
    \******************************************************/
  /***/ ((module, __unused_webpack_exports, __webpack_require__) => {

  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  module.exports = function (updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function (moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });
    var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

    if (unacceptedModules.length > 0) {
      log(
        "warning",
        "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
      );
      unacceptedModules.forEach(function (moduleId) {
        log("warning", "[HMR]  - " + moduleId);
      });
    }

    if (!renewedModules || renewedModules.length === 0) {
      log("info", "[HMR] Nothing hot updated.");
    } else {
      log("info", "[HMR] Updated modules:");
      renewedModules.forEach(function (moduleId) {
        if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
          var parts = moduleId.split("!");
          log.groupCollapsed("info", "[HMR]  - " + parts.pop());
          log("info", "[HMR]  - " + moduleId);
          log.groupEnd("info");
        } else {
          log("info", "[HMR]  - " + moduleId);
        }
      });
      var numberIds = renewedModules.every(function (moduleId) {
        return typeof moduleId === "number";
      });
      if (numberIds)
        log(
          "info",
          '[HMR] Consider using the optimization.moduleIds: "named" for module names.'
        );
    }
  };


  /***/ }),

  /***/ "./node_modules/webpack/hot/log.js":
  /*!*****************************************!*\
    !*** ./node_modules/webpack/hot/log.js ***!
    \*****************************************/
  /***/ ((module) => {

  var logLevel = "info";

  function dummy() {}

  function shouldLog(level) {
    var shouldLog =
      (logLevel === "info" && level === "info") ||
      (["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
      (["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
    return shouldLog;
  }

  function logGroup(logFn) {
    return function (level, msg) {
      if (shouldLog(level)) {
        logFn(msg);
      }
    };
  }

  module.exports = function (level, msg) {
    if (shouldLog(level)) {
      if (level === "info") {
        console.log(msg);
      } else if (level === "warning") {
        console.warn(msg);
      } else if (level === "error") {
        console.error(msg);
      }
    }
  };

  /* eslint-disable node/no-unsupported-features/node-builtins */
  var group = console.group || dummy;
  var groupCollapsed = console.groupCollapsed || dummy;
  var groupEnd = console.groupEnd || dummy;
  /* eslint-enable node/no-unsupported-features/node-builtins */

  module.exports.group = logGroup(group);

  module.exports.groupCollapsed = logGroup(groupCollapsed);

  module.exports.groupEnd = logGroup(groupEnd);

  module.exports.setLogLevel = function (level) {
    logLevel = level;
  };

  module.exports.formatError = function (err) {
    var message = err.message;
    var stack = err.stack;
    if (!stack) {
      return message;
    } else if (stack.indexOf(message) < 0) {
      return message + "\n" + stack;
    } else {
      return stack;
    }
  };


  /***/ })

  /******/ 	});
  /************************************************************************/
  /******/ 	// The module cache
  /******/ 	var __webpack_module_cache__ = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/ 		// Check if module is in cache
  /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
  /******/ 		if (cachedModule !== undefined) {
  /******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
  /******/ 			return cachedModule.exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = __webpack_module_cache__[moduleId] = {
  /******/ 			id: moduleId,
  /******/ 			loaded: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		try {
  /******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
  /******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
  /******/ 			module = execOptions.module;
  /******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
  /******/ 		} catch(e) {
  /******/ 			module.error = e;
  /******/ 			throw e;
  /******/ 		}
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.loaded = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = __webpack_modules__;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = __webpack_module_cache__;
  /******/
  /******/ 	// expose the module execution interceptor
  /******/ 	__webpack_require__.i = [];
  /******/
  /************************************************************************/
  /******/ 	/* webpack/runtime/compat get default export */
  /******/ 	(() => {
  /******/ 		// getDefaultExport function for compatibility with non-harmony modules
  /******/ 		__webpack_require__.n = (module) => {
  /******/ 			var getter = module && module.__esModule ?
  /******/ 				() => (module['default']) :
  /******/ 				() => (module);
  /******/ 			__webpack_require__.d(getter, { a: getter });
  /******/ 			return getter;
  /******/ 		};
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/define property getters */
  /******/ 	(() => {
  /******/ 		// define getter functions for harmony exports
  /******/ 		__webpack_require__.d = (exports, definition) => {
  /******/ 			for(var key in definition) {
  /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
  /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
  /******/ 				}
  /******/ 			}
  /******/ 		};
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/get javascript update chunk filename */
  /******/ 	(() => {
  /******/ 		// This function allow to reference all chunks
  /******/ 		__webpack_require__.hu = (chunkId) => {
  /******/ 			// return url for filenames based on template
  /******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
  /******/ 		};
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/get update manifest filename */
  /******/ 	(() => {
  /******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/getFullHash */
  /******/ 	(() => {
  /******/ 		__webpack_require__.h = () => ("5680e7b3f3adc86e9510")
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/global */
  /******/ 	(() => {
  /******/ 		__webpack_require__.g = (function() {
  /******/ 			if (typeof globalThis === 'object') return globalThis;
  /******/ 			try {
  /******/ 				return this || new Function('return this')();
  /******/ 			} catch (e) {
  /******/ 				if (typeof window === 'object') return window;
  /******/ 			}
  /******/ 		})();
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
  /******/ 	(() => {
  /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/load script */
  /******/ 	(() => {
  /******/ 		var inProgress = {};
  /******/ 		var dataWebpackPrefix = "cinemaddict:";
  /******/ 		// loadScript function to load a script via script tag
  /******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
  /******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
  /******/ 			var script, needAttach;
  /******/ 			if(key !== undefined) {
  /******/ 				var scripts = document.getElementsByTagName("script");
  /******/ 				for(var i = 0; i < scripts.length; i++) {
  /******/ 					var s = scripts[i];
  /******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
  /******/ 				}
  /******/ 			}
  /******/ 			if(!script) {
  /******/ 				needAttach = true;
  /******/ 				script = document.createElement('script');
  /******/
  /******/ 				script.charset = 'utf-8';
  /******/ 				script.timeout = 120;
  /******/ 				if (__webpack_require__.nc) {
  /******/ 					script.setAttribute("nonce", __webpack_require__.nc);
  /******/ 				}
  /******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
  /******/ 				script.src = url;
  /******/ 			}
  /******/ 			inProgress[url] = [done];
  /******/ 			var onScriptComplete = (prev, event) => {
  /******/ 				// avoid mem leaks in IE.
  /******/ 				script.onerror = script.onload = null;
  /******/ 				clearTimeout(timeout);
  /******/ 				var doneFns = inProgress[url];
  /******/ 				delete inProgress[url];
  /******/ 				script.parentNode && script.parentNode.removeChild(script);
  /******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
  /******/ 				if(prev) return prev(event);
  /******/ 			};
  /******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
  /******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
  /******/ 			script.onload = onScriptComplete.bind(null, script.onload);
  /******/ 			needAttach && document.head.appendChild(script);
  /******/ 		};
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/make namespace object */
  /******/ 	(() => {
  /******/ 		// define __esModule on exports
  /******/ 		__webpack_require__.r = (exports) => {
  /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 			}
  /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 		};
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/node module decorator */
  /******/ 	(() => {
  /******/ 		__webpack_require__.nmd = (module) => {
  /******/ 			module.paths = [];
  /******/ 			if (!module.children) module.children = [];
  /******/ 			return module;
  /******/ 		};
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/hot module replacement */
  /******/ 	(() => {
  /******/ 		var currentModuleData = {};
  /******/ 		var installedModules = __webpack_require__.c;
  /******/
  /******/ 		// module and require creation
  /******/ 		var currentChildModule;
  /******/ 		var currentParents = [];
  /******/
  /******/ 		// status
  /******/ 		var registeredStatusHandlers = [];
  /******/ 		var currentStatus = "idle";
  /******/
  /******/ 		// while downloading
  /******/ 		var blockingPromises = 0;
  /******/ 		var blockingPromisesWaiting = [];
  /******/
  /******/ 		// The update info
  /******/ 		var currentUpdateApplyHandlers;
  /******/ 		var queuedInvalidatedModules;
  /******/
  /******/ 		// eslint-disable-next-line no-unused-vars
  /******/ 		__webpack_require__.hmrD = currentModuleData;
  /******/
  /******/ 		__webpack_require__.i.push(function (options) {
  /******/ 			var module = options.module;
  /******/ 			var require = createRequire(options.require, options.id);
  /******/ 			module.hot = createModuleHotObject(options.id, module);
  /******/ 			module.parents = currentParents;
  /******/ 			module.children = [];
  /******/ 			currentParents = [];
  /******/ 			options.require = require;
  /******/ 		});
  /******/
  /******/ 		__webpack_require__.hmrC = {};
  /******/ 		__webpack_require__.hmrI = {};
  /******/
  /******/ 		function createRequire(require, moduleId) {
  /******/ 			var me = installedModules[moduleId];
  /******/ 			if (!me) return require;
  /******/ 			var fn = function (request) {
  /******/ 				if (me.hot.active) {
  /******/ 					if (installedModules[request]) {
  /******/ 						var parents = installedModules[request].parents;
  /******/ 						if (parents.indexOf(moduleId) === -1) {
  /******/ 							parents.push(moduleId);
  /******/ 						}
  /******/ 					} else {
  /******/ 						currentParents = [moduleId];
  /******/ 						currentChildModule = request;
  /******/ 					}
  /******/ 					if (me.children.indexOf(request) === -1) {
  /******/ 						me.children.push(request);
  /******/ 					}
  /******/ 				} else {
  /******/ 					console.warn(
  /******/ 						"[HMR] unexpected require(" +
  /******/ 							request +
  /******/ 							") from disposed module " +
  /******/ 							moduleId
  /******/ 					);
  /******/ 					currentParents = [];
  /******/ 				}
  /******/ 				return require(request);
  /******/ 			};
  /******/ 			var createPropertyDescriptor = function (name) {
  /******/ 				return {
  /******/ 					configurable: true,
  /******/ 					enumerable: true,
  /******/ 					get: function () {
  /******/ 						return require[name];
  /******/ 					},
  /******/ 					set: function (value) {
  /******/ 						require[name] = value;
  /******/ 					}
  /******/ 				};
  /******/ 			};
  /******/ 			for (var name in require) {
  /******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
  /******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
  /******/ 				}
  /******/ 			}
  /******/ 			fn.e = function (chunkId) {
  /******/ 				return trackBlockingPromise(require.e(chunkId));
  /******/ 			};
  /******/ 			return fn;
  /******/ 		}
  /******/
  /******/ 		function createModuleHotObject(moduleId, me) {
  /******/ 			var _main = currentChildModule !== moduleId;
  /******/ 			var hot = {
  /******/ 				// private stuff
  /******/ 				_acceptedDependencies: {},
  /******/ 				_acceptedErrorHandlers: {},
  /******/ 				_declinedDependencies: {},
  /******/ 				_selfAccepted: false,
  /******/ 				_selfDeclined: false,
  /******/ 				_selfInvalidated: false,
  /******/ 				_disposeHandlers: [],
  /******/ 				_main: _main,
  /******/ 				_requireSelf: function () {
  /******/ 					currentParents = me.parents.slice();
  /******/ 					currentChildModule = _main ? undefined : moduleId;
  /******/ 					__webpack_require__(moduleId);
  /******/ 				},
  /******/
  /******/ 				// Module API
  /******/ 				active: true,
  /******/ 				accept: function (dep, callback, errorHandler) {
  /******/ 					if (dep === undefined) hot._selfAccepted = true;
  /******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
  /******/ 					else if (typeof dep === "object" && dep !== null) {
  /******/ 						for (var i = 0; i < dep.length; i++) {
  /******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
  /******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
  /******/ 						}
  /******/ 					} else {
  /******/ 						hot._acceptedDependencies[dep] = callback || function () {};
  /******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
  /******/ 					}
  /******/ 				},
  /******/ 				decline: function (dep) {
  /******/ 					if (dep === undefined) hot._selfDeclined = true;
  /******/ 					else if (typeof dep === "object" && dep !== null)
  /******/ 						for (var i = 0; i < dep.length; i++)
  /******/ 							hot._declinedDependencies[dep[i]] = true;
  /******/ 					else hot._declinedDependencies[dep] = true;
  /******/ 				},
  /******/ 				dispose: function (callback) {
  /******/ 					hot._disposeHandlers.push(callback);
  /******/ 				},
  /******/ 				addDisposeHandler: function (callback) {
  /******/ 					hot._disposeHandlers.push(callback);
  /******/ 				},
  /******/ 				removeDisposeHandler: function (callback) {
  /******/ 					var idx = hot._disposeHandlers.indexOf(callback);
  /******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
  /******/ 				},
  /******/ 				invalidate: function () {
  /******/ 					this._selfInvalidated = true;
  /******/ 					switch (currentStatus) {
  /******/ 						case "idle":
  /******/ 							currentUpdateApplyHandlers = [];
  /******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
  /******/ 								__webpack_require__.hmrI[key](
  /******/ 									moduleId,
  /******/ 									currentUpdateApplyHandlers
  /******/ 								);
  /******/ 							});
  /******/ 							setStatus("ready");
  /******/ 							break;
  /******/ 						case "ready":
  /******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
  /******/ 								__webpack_require__.hmrI[key](
  /******/ 									moduleId,
  /******/ 									currentUpdateApplyHandlers
  /******/ 								);
  /******/ 							});
  /******/ 							break;
  /******/ 						case "prepare":
  /******/ 						case "check":
  /******/ 						case "dispose":
  /******/ 						case "apply":
  /******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
  /******/ 								moduleId
  /******/ 							);
  /******/ 							break;
  /******/ 						default:
  /******/ 							// ignore requests in error states
  /******/ 							break;
  /******/ 					}
  /******/ 				},
  /******/
  /******/ 				// Management API
  /******/ 				check: hotCheck,
  /******/ 				apply: hotApply,
  /******/ 				status: function (l) {
  /******/ 					if (!l) return currentStatus;
  /******/ 					registeredStatusHandlers.push(l);
  /******/ 				},
  /******/ 				addStatusHandler: function (l) {
  /******/ 					registeredStatusHandlers.push(l);
  /******/ 				},
  /******/ 				removeStatusHandler: function (l) {
  /******/ 					var idx = registeredStatusHandlers.indexOf(l);
  /******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
  /******/ 				},
  /******/
  /******/ 				//inherit from previous dispose call
  /******/ 				data: currentModuleData[moduleId]
  /******/ 			};
  /******/ 			currentChildModule = undefined;
  /******/ 			return hot;
  /******/ 		}
  /******/
  /******/ 		function setStatus(newStatus) {
  /******/ 			currentStatus = newStatus;
  /******/ 			var results = [];
  /******/
  /******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
  /******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
  /******/
  /******/ 			return Promise.all(results);
  /******/ 		}
  /******/
  /******/ 		function unblock() {
  /******/ 			if (--blockingPromises === 0) {
  /******/ 				setStatus("ready").then(function () {
  /******/ 					if (blockingPromises === 0) {
  /******/ 						var list = blockingPromisesWaiting;
  /******/ 						blockingPromisesWaiting = [];
  /******/ 						for (var i = 0; i < list.length; i++) {
  /******/ 							list[i]();
  /******/ 						}
  /******/ 					}
  /******/ 				});
  /******/ 			}
  /******/ 		}
  /******/
  /******/ 		function trackBlockingPromise(promise) {
  /******/ 			switch (currentStatus) {
  /******/ 				case "ready":
  /******/ 					setStatus("prepare");
  /******/ 				/* fallthrough */
  /******/ 				case "prepare":
  /******/ 					blockingPromises++;
  /******/ 					promise.then(unblock, unblock);
  /******/ 					return promise;
  /******/ 				default:
  /******/ 					return promise;
  /******/ 			}
  /******/ 		}
  /******/
  /******/ 		function waitForBlockingPromises(fn) {
  /******/ 			if (blockingPromises === 0) return fn();
  /******/ 			return new Promise(function (resolve) {
  /******/ 				blockingPromisesWaiting.push(function () {
  /******/ 					resolve(fn());
  /******/ 				});
  /******/ 			});
  /******/ 		}
  /******/
  /******/ 		function hotCheck(applyOnUpdate) {
  /******/ 			if (currentStatus !== "idle") {
  /******/ 				throw new Error("check() is only allowed in idle status");
  /******/ 			}
  /******/ 			return setStatus("check")
  /******/ 				.then(__webpack_require__.hmrM)
  /******/ 				.then(function (update) {
  /******/ 					if (!update) {
  /******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
  /******/ 							function () {
  /******/ 								return null;
  /******/ 							}
  /******/ 						);
  /******/ 					}
  /******/
  /******/ 					return setStatus("prepare").then(function () {
  /******/ 						var updatedModules = [];
  /******/ 						currentUpdateApplyHandlers = [];
  /******/
  /******/ 						return Promise.all(
  /******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
  /******/ 								promises,
  /******/ 								key
  /******/ 							) {
  /******/ 								__webpack_require__.hmrC[key](
  /******/ 									update.c,
  /******/ 									update.r,
  /******/ 									update.m,
  /******/ 									promises,
  /******/ 									currentUpdateApplyHandlers,
  /******/ 									updatedModules
  /******/ 								);
  /******/ 								return promises;
  /******/ 							},
  /******/ 							[])
  /******/ 						).then(function () {
  /******/ 							return waitForBlockingPromises(function () {
  /******/ 								if (applyOnUpdate) {
  /******/ 									return internalApply(applyOnUpdate);
  /******/ 								} else {
  /******/ 									return setStatus("ready").then(function () {
  /******/ 										return updatedModules;
  /******/ 									});
  /******/ 								}
  /******/ 							});
  /******/ 						});
  /******/ 					});
  /******/ 				});
  /******/ 		}
  /******/
  /******/ 		function hotApply(options) {
  /******/ 			if (currentStatus !== "ready") {
  /******/ 				return Promise.resolve().then(function () {
  /******/ 					throw new Error(
  /******/ 						"apply() is only allowed in ready status (state: " +
  /******/ 							currentStatus +
  /******/ 							")"
  /******/ 					);
  /******/ 				});
  /******/ 			}
  /******/ 			return internalApply(options);
  /******/ 		}
  /******/
  /******/ 		function internalApply(options) {
  /******/ 			options = options || {};
  /******/
  /******/ 			applyInvalidatedModules();
  /******/
  /******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
  /******/ 				return handler(options);
  /******/ 			});
  /******/ 			currentUpdateApplyHandlers = undefined;
  /******/
  /******/ 			var errors = results
  /******/ 				.map(function (r) {
  /******/ 					return r.error;
  /******/ 				})
  /******/ 				.filter(Boolean);
  /******/
  /******/ 			if (errors.length > 0) {
  /******/ 				return setStatus("abort").then(function () {
  /******/ 					throw errors[0];
  /******/ 				});
  /******/ 			}
  /******/
  /******/ 			// Now in "dispose" phase
  /******/ 			var disposePromise = setStatus("dispose");
  /******/
  /******/ 			results.forEach(function (result) {
  /******/ 				if (result.dispose) result.dispose();
  /******/ 			});
  /******/
  /******/ 			// Now in "apply" phase
  /******/ 			var applyPromise = setStatus("apply");
  /******/
  /******/ 			var error;
  /******/ 			var reportError = function (err) {
  /******/ 				if (!error) error = err;
  /******/ 			};
  /******/
  /******/ 			var outdatedModules = [];
  /******/ 			results.forEach(function (result) {
  /******/ 				if (result.apply) {
  /******/ 					var modules = result.apply(reportError);
  /******/ 					if (modules) {
  /******/ 						for (var i = 0; i < modules.length; i++) {
  /******/ 							outdatedModules.push(modules[i]);
  /******/ 						}
  /******/ 					}
  /******/ 				}
  /******/ 			});
  /******/
  /******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
  /******/ 				// handle errors in accept handlers and self accepted module load
  /******/ 				if (error) {
  /******/ 					return setStatus("fail").then(function () {
  /******/ 						throw error;
  /******/ 					});
  /******/ 				}
  /******/
  /******/ 				if (queuedInvalidatedModules) {
  /******/ 					return internalApply(options).then(function (list) {
  /******/ 						outdatedModules.forEach(function (moduleId) {
  /******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
  /******/ 						});
  /******/ 						return list;
  /******/ 					});
  /******/ 				}
  /******/
  /******/ 				return setStatus("idle").then(function () {
  /******/ 					return outdatedModules;
  /******/ 				});
  /******/ 			});
  /******/ 		}
  /******/
  /******/ 		function applyInvalidatedModules() {
  /******/ 			if (queuedInvalidatedModules) {
  /******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
  /******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
  /******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
  /******/ 						__webpack_require__.hmrI[key](
  /******/ 							moduleId,
  /******/ 							currentUpdateApplyHandlers
  /******/ 						);
  /******/ 					});
  /******/ 				});
  /******/ 				queuedInvalidatedModules = undefined;
  /******/ 				return true;
  /******/ 			}
  /******/ 		}
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/publicPath */
  /******/ 	(() => {
  /******/ 		var scriptUrl;
  /******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
  /******/ 		var document = __webpack_require__.g.document;
  /******/ 		if (!scriptUrl && document) {
  /******/ 			if (document.currentScript)
  /******/ 				scriptUrl = document.currentScript.src
  /******/ 			if (!scriptUrl) {
  /******/ 				var scripts = document.getElementsByTagName("script");
  /******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
  /******/ 			}
  /******/ 		}
  /******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
  /******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
  /******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
  /******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
  /******/ 		__webpack_require__.p = scriptUrl;
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/jsonp chunk loading */
  /******/ 	(() => {
  /******/ 		// no baseURI
  /******/
  /******/ 		// object to store loaded and loading chunks
  /******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
  /******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
  /******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
  /******/ 			"main": 0
  /******/ 		};
  /******/
  /******/ 		// no chunk on demand loading
  /******/
  /******/ 		// no prefetching
  /******/
  /******/ 		// no preloaded
  /******/
  /******/ 		var currentUpdatedModulesList;
  /******/ 		var waitingUpdateResolves = {};
  /******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
  /******/ 			currentUpdatedModulesList = updatedModulesList;
  /******/ 			return new Promise((resolve, reject) => {
  /******/ 				waitingUpdateResolves[chunkId] = resolve;
  /******/ 				// start update chunk loading
  /******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
  /******/ 				// create error before stack unwound to get useful stacktrace later
  /******/ 				var error = new Error();
  /******/ 				var loadingEnded = (event) => {
  /******/ 					if(waitingUpdateResolves[chunkId]) {
  /******/ 						waitingUpdateResolves[chunkId] = undefined
  /******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
  /******/ 						var realSrc = event && event.target && event.target.src;
  /******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
  /******/ 						error.name = 'ChunkLoadError';
  /******/ 						error.type = errorType;
  /******/ 						error.request = realSrc;
  /******/ 						reject(error);
  /******/ 					}
  /******/ 				};
  /******/ 				__webpack_require__.l(url, loadingEnded);
  /******/ 			});
  /******/ 		}
  /******/
  /******/ 		self["webpackHotUpdatecinemaddict"] = (chunkId, moreModules, runtime) => {
  /******/ 			for(var moduleId in moreModules) {
  /******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
  /******/ 					currentUpdate[moduleId] = moreModules[moduleId];
  /******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
  /******/ 				}
  /******/ 			}
  /******/ 			if(runtime) currentUpdateRuntime.push(runtime);
  /******/ 			if(waitingUpdateResolves[chunkId]) {
  /******/ 				waitingUpdateResolves[chunkId]();
  /******/ 				waitingUpdateResolves[chunkId] = undefined;
  /******/ 			}
  /******/ 		};
  /******/
  /******/ 		var currentUpdateChunks;
  /******/ 		var currentUpdate;
  /******/ 		var currentUpdateRemovedChunks;
  /******/ 		var currentUpdateRuntime;
  /******/ 		function applyHandler(options) {
  /******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
  /******/ 			currentUpdateChunks = undefined;
  /******/ 			function getAffectedModuleEffects(updateModuleId) {
  /******/ 				var outdatedModules = [updateModuleId];
  /******/ 				var outdatedDependencies = {};
  /******/
  /******/ 				var queue = outdatedModules.map(function (id) {
  /******/ 					return {
  /******/ 						chain: [id],
  /******/ 						id: id
  /******/ 					};
  /******/ 				});
  /******/ 				while (queue.length > 0) {
  /******/ 					var queueItem = queue.pop();
  /******/ 					var moduleId = queueItem.id;
  /******/ 					var chain = queueItem.chain;
  /******/ 					var module = __webpack_require__.c[moduleId];
  /******/ 					if (
  /******/ 						!module ||
  /******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
  /******/ 					)
  /******/ 						continue;
  /******/ 					if (module.hot._selfDeclined) {
  /******/ 						return {
  /******/ 							type: "self-declined",
  /******/ 							chain: chain,
  /******/ 							moduleId: moduleId
  /******/ 						};
  /******/ 					}
  /******/ 					if (module.hot._main) {
  /******/ 						return {
  /******/ 							type: "unaccepted",
  /******/ 							chain: chain,
  /******/ 							moduleId: moduleId
  /******/ 						};
  /******/ 					}
  /******/ 					for (var i = 0; i < module.parents.length; i++) {
  /******/ 						var parentId = module.parents[i];
  /******/ 						var parent = __webpack_require__.c[parentId];
  /******/ 						if (!parent) continue;
  /******/ 						if (parent.hot._declinedDependencies[moduleId]) {
  /******/ 							return {
  /******/ 								type: "declined",
  /******/ 								chain: chain.concat([parentId]),
  /******/ 								moduleId: moduleId,
  /******/ 								parentId: parentId
  /******/ 							};
  /******/ 						}
  /******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
  /******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
  /******/ 							if (!outdatedDependencies[parentId])
  /******/ 								outdatedDependencies[parentId] = [];
  /******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
  /******/ 							continue;
  /******/ 						}
  /******/ 						delete outdatedDependencies[parentId];
  /******/ 						outdatedModules.push(parentId);
  /******/ 						queue.push({
  /******/ 							chain: chain.concat([parentId]),
  /******/ 							id: parentId
  /******/ 						});
  /******/ 					}
  /******/ 				}
  /******/
  /******/ 				return {
  /******/ 					type: "accepted",
  /******/ 					moduleId: updateModuleId,
  /******/ 					outdatedModules: outdatedModules,
  /******/ 					outdatedDependencies: outdatedDependencies
  /******/ 				};
  /******/ 			}
  /******/
  /******/ 			function addAllToSet(a, b) {
  /******/ 				for (var i = 0; i < b.length; i++) {
  /******/ 					var item = b[i];
  /******/ 					if (a.indexOf(item) === -1) a.push(item);
  /******/ 				}
  /******/ 			}
  /******/
  /******/ 			// at begin all updates modules are outdated
  /******/ 			// the "outdated" status can propagate to parents if they don't accept the children
  /******/ 			var outdatedDependencies = {};
  /******/ 			var outdatedModules = [];
  /******/ 			var appliedUpdate = {};
  /******/
  /******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
  /******/ 				console.warn(
  /******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
  /******/ 				);
  /******/ 			};
  /******/
  /******/ 			for (var moduleId in currentUpdate) {
  /******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
  /******/ 					var newModuleFactory = currentUpdate[moduleId];
  /******/ 					/** @type {TODO} */
  /******/ 					var result;
  /******/ 					if (newModuleFactory) {
  /******/ 						result = getAffectedModuleEffects(moduleId);
  /******/ 					} else {
  /******/ 						result = {
  /******/ 							type: "disposed",
  /******/ 							moduleId: moduleId
  /******/ 						};
  /******/ 					}
  /******/ 					/** @type {Error|false} */
  /******/ 					var abortError = false;
  /******/ 					var doApply = false;
  /******/ 					var doDispose = false;
  /******/ 					var chainInfo = "";
  /******/ 					if (result.chain) {
  /******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
  /******/ 					}
  /******/ 					switch (result.type) {
  /******/ 						case "self-declined":
  /******/ 							if (options.onDeclined) options.onDeclined(result);
  /******/ 							if (!options.ignoreDeclined)
  /******/ 								abortError = new Error(
  /******/ 									"Aborted because of self decline: " +
  /******/ 										result.moduleId +
  /******/ 										chainInfo
  /******/ 								);
  /******/ 							break;
  /******/ 						case "declined":
  /******/ 							if (options.onDeclined) options.onDeclined(result);
  /******/ 							if (!options.ignoreDeclined)
  /******/ 								abortError = new Error(
  /******/ 									"Aborted because of declined dependency: " +
  /******/ 										result.moduleId +
  /******/ 										" in " +
  /******/ 										result.parentId +
  /******/ 										chainInfo
  /******/ 								);
  /******/ 							break;
  /******/ 						case "unaccepted":
  /******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
  /******/ 							if (!options.ignoreUnaccepted)
  /******/ 								abortError = new Error(
  /******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
  /******/ 								);
  /******/ 							break;
  /******/ 						case "accepted":
  /******/ 							if (options.onAccepted) options.onAccepted(result);
  /******/ 							doApply = true;
  /******/ 							break;
  /******/ 						case "disposed":
  /******/ 							if (options.onDisposed) options.onDisposed(result);
  /******/ 							doDispose = true;
  /******/ 							break;
  /******/ 						default:
  /******/ 							throw new Error("Unexception type " + result.type);
  /******/ 					}
  /******/ 					if (abortError) {
  /******/ 						return {
  /******/ 							error: abortError
  /******/ 						};
  /******/ 					}
  /******/ 					if (doApply) {
  /******/ 						appliedUpdate[moduleId] = newModuleFactory;
  /******/ 						addAllToSet(outdatedModules, result.outdatedModules);
  /******/ 						for (moduleId in result.outdatedDependencies) {
  /******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
  /******/ 								if (!outdatedDependencies[moduleId])
  /******/ 									outdatedDependencies[moduleId] = [];
  /******/ 								addAllToSet(
  /******/ 									outdatedDependencies[moduleId],
  /******/ 									result.outdatedDependencies[moduleId]
  /******/ 								);
  /******/ 							}
  /******/ 						}
  /******/ 					}
  /******/ 					if (doDispose) {
  /******/ 						addAllToSet(outdatedModules, [result.moduleId]);
  /******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
  /******/ 					}
  /******/ 				}
  /******/ 			}
  /******/ 			currentUpdate = undefined;
  /******/
  /******/ 			// Store self accepted outdated modules to require them later by the module system
  /******/ 			var outdatedSelfAcceptedModules = [];
  /******/ 			for (var j = 0; j < outdatedModules.length; j++) {
  /******/ 				var outdatedModuleId = outdatedModules[j];
  /******/ 				var module = __webpack_require__.c[outdatedModuleId];
  /******/ 				if (
  /******/ 					module &&
  /******/ 					(module.hot._selfAccepted || module.hot._main) &&
  /******/ 					// removed self-accepted modules should not be required
  /******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
  /******/ 					// when called invalidate self-accepting is not possible
  /******/ 					!module.hot._selfInvalidated
  /******/ 				) {
  /******/ 					outdatedSelfAcceptedModules.push({
  /******/ 						module: outdatedModuleId,
  /******/ 						require: module.hot._requireSelf,
  /******/ 						errorHandler: module.hot._selfAccepted
  /******/ 					});
  /******/ 				}
  /******/ 			}
  /******/
  /******/ 			var moduleOutdatedDependencies;
  /******/
  /******/ 			return {
  /******/ 				dispose: function () {
  /******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
  /******/ 						delete installedChunks[chunkId];
  /******/ 					});
  /******/ 					currentUpdateRemovedChunks = undefined;
  /******/
  /******/ 					var idx;
  /******/ 					var queue = outdatedModules.slice();
  /******/ 					while (queue.length > 0) {
  /******/ 						var moduleId = queue.pop();
  /******/ 						var module = __webpack_require__.c[moduleId];
  /******/ 						if (!module) continue;
  /******/
  /******/ 						var data = {};
  /******/
  /******/ 						// Call dispose handlers
  /******/ 						var disposeHandlers = module.hot._disposeHandlers;
  /******/ 						for (j = 0; j < disposeHandlers.length; j++) {
  /******/ 							disposeHandlers[j].call(null, data);
  /******/ 						}
  /******/ 						__webpack_require__.hmrD[moduleId] = data;
  /******/
  /******/ 						// disable module (this disables requires from this module)
  /******/ 						module.hot.active = false;
  /******/
  /******/ 						// remove module from cache
  /******/ 						delete __webpack_require__.c[moduleId];
  /******/
  /******/ 						// when disposing there is no need to call dispose handler
  /******/ 						delete outdatedDependencies[moduleId];
  /******/
  /******/ 						// remove "parents" references from all children
  /******/ 						for (j = 0; j < module.children.length; j++) {
  /******/ 							var child = __webpack_require__.c[module.children[j]];
  /******/ 							if (!child) continue;
  /******/ 							idx = child.parents.indexOf(moduleId);
  /******/ 							if (idx >= 0) {
  /******/ 								child.parents.splice(idx, 1);
  /******/ 							}
  /******/ 						}
  /******/ 					}
  /******/
  /******/ 					// remove outdated dependency from module children
  /******/ 					var dependency;
  /******/ 					for (var outdatedModuleId in outdatedDependencies) {
  /******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
  /******/ 							module = __webpack_require__.c[outdatedModuleId];
  /******/ 							if (module) {
  /******/ 								moduleOutdatedDependencies =
  /******/ 									outdatedDependencies[outdatedModuleId];
  /******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
  /******/ 									dependency = moduleOutdatedDependencies[j];
  /******/ 									idx = module.children.indexOf(dependency);
  /******/ 									if (idx >= 0) module.children.splice(idx, 1);
  /******/ 								}
  /******/ 							}
  /******/ 						}
  /******/ 					}
  /******/ 				},
  /******/ 				apply: function (reportError) {
  /******/ 					// insert new code
  /******/ 					for (var updateModuleId in appliedUpdate) {
  /******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
  /******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
  /******/ 						}
  /******/ 					}
  /******/
  /******/ 					// run new runtime modules
  /******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
  /******/ 						currentUpdateRuntime[i](__webpack_require__);
  /******/ 					}
  /******/
  /******/ 					// call accept handlers
  /******/ 					for (var outdatedModuleId in outdatedDependencies) {
  /******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
  /******/ 							var module = __webpack_require__.c[outdatedModuleId];
  /******/ 							if (module) {
  /******/ 								moduleOutdatedDependencies =
  /******/ 									outdatedDependencies[outdatedModuleId];
  /******/ 								var callbacks = [];
  /******/ 								var errorHandlers = [];
  /******/ 								var dependenciesForCallbacks = [];
  /******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
  /******/ 									var dependency = moduleOutdatedDependencies[j];
  /******/ 									var acceptCallback =
  /******/ 										module.hot._acceptedDependencies[dependency];
  /******/ 									var errorHandler =
  /******/ 										module.hot._acceptedErrorHandlers[dependency];
  /******/ 									if (acceptCallback) {
  /******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
  /******/ 										callbacks.push(acceptCallback);
  /******/ 										errorHandlers.push(errorHandler);
  /******/ 										dependenciesForCallbacks.push(dependency);
  /******/ 									}
  /******/ 								}
  /******/ 								for (var k = 0; k < callbacks.length; k++) {
  /******/ 									try {
  /******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
  /******/ 									} catch (err) {
  /******/ 										if (typeof errorHandlers[k] === "function") {
  /******/ 											try {
  /******/ 												errorHandlers[k](err, {
  /******/ 													moduleId: outdatedModuleId,
  /******/ 													dependencyId: dependenciesForCallbacks[k]
  /******/ 												});
  /******/ 											} catch (err2) {
  /******/ 												if (options.onErrored) {
  /******/ 													options.onErrored({
  /******/ 														type: "accept-error-handler-errored",
  /******/ 														moduleId: outdatedModuleId,
  /******/ 														dependencyId: dependenciesForCallbacks[k],
  /******/ 														error: err2,
  /******/ 														originalError: err
  /******/ 													});
  /******/ 												}
  /******/ 												if (!options.ignoreErrored) {
  /******/ 													reportError(err2);
  /******/ 													reportError(err);
  /******/ 												}
  /******/ 											}
  /******/ 										} else {
  /******/ 											if (options.onErrored) {
  /******/ 												options.onErrored({
  /******/ 													type: "accept-errored",
  /******/ 													moduleId: outdatedModuleId,
  /******/ 													dependencyId: dependenciesForCallbacks[k],
  /******/ 													error: err
  /******/ 												});
  /******/ 											}
  /******/ 											if (!options.ignoreErrored) {
  /******/ 												reportError(err);
  /******/ 											}
  /******/ 										}
  /******/ 									}
  /******/ 								}
  /******/ 							}
  /******/ 						}
  /******/ 					}
  /******/
  /******/ 					// Load self accepted modules
  /******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
  /******/ 						var item = outdatedSelfAcceptedModules[o];
  /******/ 						var moduleId = item.module;
  /******/ 						try {
  /******/ 							item.require(moduleId);
  /******/ 						} catch (err) {
  /******/ 							if (typeof item.errorHandler === "function") {
  /******/ 								try {
  /******/ 									item.errorHandler(err, {
  /******/ 										moduleId: moduleId,
  /******/ 										module: __webpack_require__.c[moduleId]
  /******/ 									});
  /******/ 								} catch (err2) {
  /******/ 									if (options.onErrored) {
  /******/ 										options.onErrored({
  /******/ 											type: "self-accept-error-handler-errored",
  /******/ 											moduleId: moduleId,
  /******/ 											error: err2,
  /******/ 											originalError: err
  /******/ 										});
  /******/ 									}
  /******/ 									if (!options.ignoreErrored) {
  /******/ 										reportError(err2);
  /******/ 										reportError(err);
  /******/ 									}
  /******/ 								}
  /******/ 							} else {
  /******/ 								if (options.onErrored) {
  /******/ 									options.onErrored({
  /******/ 										type: "self-accept-errored",
  /******/ 										moduleId: moduleId,
  /******/ 										error: err
  /******/ 									});
  /******/ 								}
  /******/ 								if (!options.ignoreErrored) {
  /******/ 									reportError(err);
  /******/ 								}
  /******/ 							}
  /******/ 						}
  /******/ 					}
  /******/
  /******/ 					return outdatedModules;
  /******/ 				}
  /******/ 			};
  /******/ 		}
  /******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
  /******/ 			if (!currentUpdate) {
  /******/ 				currentUpdate = {};
  /******/ 				currentUpdateRuntime = [];
  /******/ 				currentUpdateRemovedChunks = [];
  /******/ 				applyHandlers.push(applyHandler);
  /******/ 			}
  /******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
  /******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
  /******/ 			}
  /******/ 		};
  /******/ 		__webpack_require__.hmrC.jsonp = function (
  /******/ 			chunkIds,
  /******/ 			removedChunks,
  /******/ 			removedModules,
  /******/ 			promises,
  /******/ 			applyHandlers,
  /******/ 			updatedModulesList
  /******/ 		) {
  /******/ 			applyHandlers.push(applyHandler);
  /******/ 			currentUpdateChunks = {};
  /******/ 			currentUpdateRemovedChunks = removedChunks;
  /******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
  /******/ 				obj[key] = false;
  /******/ 				return obj;
  /******/ 			}, {});
  /******/ 			currentUpdateRuntime = [];
  /******/ 			chunkIds.forEach(function (chunkId) {
  /******/ 				if (
  /******/ 					__webpack_require__.o(installedChunks, chunkId) &&
  /******/ 					installedChunks[chunkId] !== undefined
  /******/ 				) {
  /******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
  /******/ 					currentUpdateChunks[chunkId] = true;
  /******/ 				} else {
  /******/ 					currentUpdateChunks[chunkId] = false;
  /******/ 				}
  /******/ 			});
  /******/ 			if (__webpack_require__.f) {
  /******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
  /******/ 					if (
  /******/ 						currentUpdateChunks &&
  /******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
  /******/ 						!currentUpdateChunks[chunkId]
  /******/ 					) {
  /******/ 						promises.push(loadUpdateChunk(chunkId));
  /******/ 						currentUpdateChunks[chunkId] = true;
  /******/ 					}
  /******/ 				};
  /******/ 			}
  /******/ 		};
  /******/
  /******/ 		__webpack_require__.hmrM = () => {
  /******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
  /******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
  /******/ 				if(response.status === 404) return; // no update available
  /******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
  /******/ 				return response.json();
  /******/ 			});
  /******/ 		};
  /******/
  /******/ 		// no on chunks loaded
  /******/
  /******/ 		// no jsonp function
  /******/ 	})();
  /******/
  /******/ 	/* webpack/runtime/nonce */
  /******/ 	(() => {
  /******/ 		__webpack_require__.nc = undefined;
  /******/ 	})();
  /******/
  /************************************************************************/
  /******/
  /******/ 	// module cache are used so entry inlining is disabled
  /******/ 	// startup
  /******/ 	// Load entry module and return exports
  /******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
  /******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
  /******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
  /******/
  /******/ })()
  ;
  //# sourceMappingURL=bundle.js.map
