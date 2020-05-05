import './slide.css';
import noposter from './no_poster.png';

export default class Slide {
  constructor(title, poster, year, rating) {
    this.title = title;
    this.poster = poster === 'N/A' ? noposter : poster;
    this.year = year;
    this.rating = rating;
  }

  render() {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    slide.innerHTML = `
    <div class="card">
    <h5 class="card-header" title="${this.title}">${this.title}</h5>
    <img style="height: 300px; width: 100%; display: block;" src="${this.poster}" class="card-img-top" alt="movie title"/>
    <div class="card-footer"><span>${this.year}</span><span><i class="fa fa-star" aria-hidden="true"></i> ${this.rating}</span></div>
    </div>
    `;

    return slide;
  }
}
