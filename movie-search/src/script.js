import './style.css';

import '../node_modules/@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import Splide from '@splidejs/splide';

const mySplide = new Splide('#splide', {
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
});

mySplide.mount();
