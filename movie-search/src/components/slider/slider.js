import '../../../node_modules/@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import Splide from '@splidejs/splide';

// import Card from '../card';

import './slider.css';

export default class Slider {
  constructor() {
    this.options = {
      breakpoints: {
        375: {
          perPage: 1,
        },
        425: {
          perPage: 2,
        },
        768: {
          perPage: 3,
        },
      },
      focus: 0,
      gap: '0.5rem',
      perMove: 1,
      perPage: 4,
    };

    const splideList = document.createElement('ul');
    splideList.className = 'splide__list';

    const splideTrack = document.createElement('div');
    splideTrack.className = 'splide__track';

    splideTrack.append(splideList);

    this.splide = document.createElement('div');
    this.splide.className = 'splide';
    this.splide.id = 'splide';

    this.splide.append(splideTrack);

    this.slider = new Splide(this.splide, this.options);
  }

  mount() {
    return this.splide.mount();
  }

  render() {
    return this.splide;
  }
}
