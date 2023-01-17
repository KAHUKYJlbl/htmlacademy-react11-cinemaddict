import SortBarView from '../view/sort-bar-view.js';
import NoFilmCardsView from '../view/no-film-cards-view.js';
import FilmWrapperView from '../view/film-wrapper-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListHeaderView from '../view/film-list-header-view.js';
import FilmContainerView from '../view/film-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import FilterBarPresenter from './filters-presenter.js';
import FilmCardPresenter from './film-card-presenter.js';

import { remove, render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../util/common.js';

const FILM_CARDS_COUNT_PER_STEP = 5;

export default class MainBoardPresenter {
  #page = document.querySelector('.page');

  #filmWrapperComponent = new FilmWrapperView();

  #filmListComponent = new FilmListView();
  #filmHeaderComponent = new FilmListHeaderView();
  #filmContainerComponent = new FilmContainerView();
  #showMoreButtonComponent = null;
  #sortBarComponent = new SortBarView();
  #noFilmCardsComponent = new NoFilmCardsView();

  #filterBarPresenter = null;

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmCards = [];
  #renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
  #filmCardPresenterList = null;

  constructor({container, filmsModel, commentsModel, filmCardPresenterList}) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmCardPresenterList = filmCardPresenterList;
  }

  get filmWrapperComponent() {
    return this.#filmWrapperComponent;
  }

  init() {
    this.#filmCards = [...this.#filmsModel.films];

    this.#renderMainBoard();
  }

  #handleShowMoreButtonClick = () => {
    this.#filmCards = [...this.#filmsModel.films];
    this.#renderFilmCards(this.#renderedFilmCardsCount, this.#renderedFilmCardsCount + FILM_CARDS_COUNT_PER_STEP);

    this.#renderedFilmCardsCount += FILM_CARDS_COUNT_PER_STEP;

    if (this.#renderedFilmCardsCount >= this.#filmCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleFilmCardChange = (updatedFilmCard) => {
    updateItem(this.#filmCards, updatedFilmCard);
    this.#filmCardPresenterList.get(updatedFilmCard.newId).forEach(
      (presenter) => presenter.init({
        popupContainer: this.#page,
        filmCard: updatedFilmCard,
        commentsModel: this.#commentsModel
      })
    );
    this.#renderFilterBar();
  };

  #handleModeChange = () => {
    this.#filmCardPresenterList.forEach(
      (presentersArr) => presentersArr.forEach(
        (presenter) => presenter.resetView()
      )
    );
  };

  #renderSortBar() {
    render(this.#sortBarComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderFilterBar() {
    const prevFilterBarPresenter = this.#filterBarPresenter;

    this.#filterBarPresenter = new FilterBarPresenter({container: this.#container});

    if (prevFilterBarPresenter !== null) {
      prevFilterBarPresenter.removeFilterBar();
    }

    this.#filterBarPresenter.init({filmsModel: this.#filmsModel});
  }

  #renderFilmCard(filmCard, commentsModel) {
    const filmCardPresenter = new FilmCardPresenter({
      onFilmCardChange: this.#handleFilmCardChange,
      filmCardContainer: this.#filmContainerComponent.element,
      onModeChange: this.#handleModeChange,
    });

    filmCardPresenter.init({
      popupContainer: this.#page,
      filmCard,
      commentsModel,
    });

    if ( this.#filmCardPresenterList.has(filmCard.newId) ) {
      const updatedSameCardPresenters = this.#filmCardPresenterList.get(filmCard.newId);
      updatedSameCardPresenters.push(filmCardPresenter);
      this.#filmCardPresenterList.set(
        filmCard.newId,
        updatedSameCardPresenters,
      );
      return;
    }

    const sameCardPresenters = [];
    sameCardPresenters.push(filmCardPresenter);
    this.#filmCardPresenterList.set(filmCard.newId, sameCardPresenters);
  }

  #renderFilmCards(from, to) {
    this.#filmCards
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard, this.#commentsModel));
  }

  #renderNoFilms() {
    render(this.#noFilmCardsComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({onClick: this.#handleShowMoreButtonClick});
    render(this.#showMoreButtonComponent, this.#filmListComponent.element);
  }

  #renderFilmList() {
    render(this.#filmHeaderComponent, this.#filmListComponent.element);

    render(this.#filmContainerComponent, this.#filmListComponent.element);
    this.#renderFilmCards(0, Math.min(this.#filmCards.length, FILM_CARDS_COUNT_PER_STEP));

    if (this.#filmCards.length > FILM_CARDS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #clearFilmList() {
    this.#filmCardPresenterList.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenterList.clear();
    this.#renderedFilmCardsCount = FILM_CARDS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #renderMainBoard() {
    render(this.#filmWrapperComponent, this.#container);
    render(this.#filmListComponent, this.#filmWrapperComponent.element);

    if (this.#filmCards.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSortBar();
    this.#renderFilterBar();
    this.#renderFilmList();
  }
}
