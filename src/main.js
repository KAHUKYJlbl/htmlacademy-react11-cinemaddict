import FooterStatisticView from './view/footer-statistic-view.js';
import { render } from './util/render.js';

import HeaderPresenter from './presenter/header-presenter.js';
import FilterBarPresenter from './presenter/filters-presenter.js';
import MainBoardPresenter from './presenter/main-board-presenter.js';
import TopRatedPresenter from './presenter/top-rated-presenter.js';
import MostCommentedPresenter from './presenter/most-commented-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooterStatistics = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const headerPresenter = new HeaderPresenter({
  container: pageHeader,
  filmsModel,
});
const filterBarPresenter = new FilterBarPresenter({
  container: pageMain,
  filmsModel,
});
const mainPresenter = new MainBoardPresenter({
  container: pageMain,
  filmsModel,
  commentsModel,
});
const topRatedPresenter = new TopRatedPresenter({
  container: mainPresenter.filmWrapperComponent,
  filmsModel,
  commentsModel,
});
const mostCommentedPresenter = new MostCommentedPresenter({
  container: mainPresenter.filmWrapperComponent,
  filmsModel,
  commentsModel,
});

render(new FooterStatisticView(), pageFooterStatistics);

headerPresenter.init();
filterBarPresenter.init();
mainPresenter.init();
topRatedPresenter.init();
mostCommentedPresenter.init();
