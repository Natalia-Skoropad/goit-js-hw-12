import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './js/refs';
import { getImagesByQuery } from './js/pixabay-api';

import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const PAGE_SIZE = 15;
let page = 1;
let maxPage = 0;
let query = '';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

//!======================================================

async function onFormSubmit(e) {
  e.preventDefault();
  query = refs.input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
      timeout: 5000,
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        title: '',
        message:
          'Sorry, there are no images matching<br />your search query. Please try again!',
        position: 'topRight',
        timeout: 5000,
      });
      return;
    }

    createGallery(data.hits);
    maxPage = Math.ceil(data.totalHits / PAGE_SIZE);

    if (page < maxPage) {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 5000,
    });
    console.error(err);
  } finally {
    hideLoader();
  }
}

//!======================================================

async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    const { height: cardHeight } =
      refs.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 3,
      behavior: 'smooth',
    });

    if (page >= maxPage) {
      hideLoadMoreButton();
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 5000,
      });
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 5000,
    });
    console.error(err);
  } finally {
    hideLoader();
  }
}
