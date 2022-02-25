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
        slider();
        tabs();
        timer();
}); 


