import utils from '../../utils';

import './slide.css';
import noposter from './no_poster.png';

export default class Slide {
  constructor(id, title, type, poster, year, rating) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.poster = poster === 'N/A' ? noposter : poster;
    this.year = year;
    this.rating = rating;
  }

  render() {
    function onError() {
      this.src = noposter;
    }

    const slide = utils.createElement('div', 'swiper-slide');
    const card = utils.createElement('div', 'card h-100');

    const cardHeader = utils.createElement('a', 'text-reset');
    cardHeader.href = `https://www.imdb.com/title/${this.id}/videogallery/`;
    cardHeader.target = '_blank';
    cardHeader.innerHTML = `
    <h6 class="card-header font-weight-bolder" title="(${this.type}) ${this.title}">
    <span aria-hidden="true">${this.title}</span>
    </h6>
    `;

    const cardBody = utils.createElement('div', 'card-img');

    const cardImage = utils.createElement('img', 'slide-image');
    cardImage.alt = 'movie title';
    cardImage.onerror = onError;
    cardImage.src = this.poster;

    const cardFooter = utils.createElement('div', 'card-footer');
    cardFooter.innerHTML = `
    <span>${this.year}</span>
    <span><i class="fa fa-star" aria-hidden="true"></i> ${this.rating}</span>
    `;

    cardBody.append(cardImage);

    card.append(cardHeader);
    card.append(cardBody);
    card.append(cardFooter);

    slide.append(card);

    return slide;
  }
}
