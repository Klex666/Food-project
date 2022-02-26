import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

document.addEventListener("DOMContentLoaded", () => {
      const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

        cards();
        forms('form', modalTimerId);
        modal('[data-modal]', '.modal', modalTimerId);
        slider({
          container: '.offer__slider',
          slide: '.offer__slide',
          nextArrow: '.offer__slider-next',
          prevArrow: '.offer__slider-prev',
          totalCounter: '#total',
          currentCounter: '#current',
          wrapper: '.offer__slider-wrapper',
          field: '.offer__slider-inner'
      });
        tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        timer('.timer', '2022-03-10');
}); 


