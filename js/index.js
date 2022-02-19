document.addEventListener("DOMContentLoaded", () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');

    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        } 
    });

    //Timer

   const deadline = "2022-02-31";


   function getTimeRemaining(endtime) {
     const t = Date.parse(endtime) - Date.parse(new Date());

     const days = Math.floor( (t/(1000*60*60*24)) );
     const seconds = Math.floor( (t/1000) % 60 );
     const minutes = Math.floor( (t/1000/60) % 60 );
     const hours = Math.floor( (t/(1000*60*60) % 24) );

     return { 
        'total': t,
        'days': days,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours
     };
   }

   function correct(num) {
       if (num >= 0 && num < 10) {
           return '0' + num;
       } else {
           return num;
       }
   }

   function setClock(selector, endtime) {
       const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             seconds = timer.querySelector('#seconds'),
             minutes = timer.querySelector('#minutes'),
             hours = timer.querySelector('#hours'),
             timeInterval = setInterval(updateClock, 1000);

    updateClock();

     function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = correct(t.days);
        hours.innerHTML = correct(t.hours);
        minutes.innerHTML = correct(t.minutes);
        seconds.innerHTML = correct(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
     }        
   }

   setClock('.timer', deadline);

   // Modal

   const modalButton = document.querySelectorAll('[data-modal]');
   const modal = document.querySelector('.modal');

   modalButton.forEach(items => {
    items.addEventListener('click', openModal);
   });

   function openModal() { 
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
   }

   function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; 
   }

   modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
   });

   document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            closeModal();
        }
   });

   const modalTimerId = setTimeout(openModal, 50000);

   function showModaByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModaByScroll);
    }
   }

   window.addEventListener('scroll', showModaByScroll);

   // Class for card

   class MenuCard {
       constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price; 
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 26;
            this.changeToUAH();
       }

       changeToUAH() {
            this.price = +this.price * this.transfer;
       }

       render() {
           const element = document.createElement('div');

           if (this.classes.length === 0) {
               this.element = 'menu__item';
               element.classList.add(this.element);
           } else {
            this.classes.forEach(className => element.classList.add(className));
           }

           element.innerHTML = `
           <img src=${this.src} alt=${this.alt}>
           <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>`;
           this.parent.append(element);
       }
   }

   const getResourse = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};


getResourse('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

// Forms 

const form = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    sucess: 'Благодарим! Мы скоро свяжемся с вами!',
    fail: 'Ошибка'
};

form.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }); 

    return await res.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();


        let statusMessages = document.createElement('img');
        statusMessages.src = message.loading;
        statusMessages.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessages);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.sucess);
            statusMessages.remove();
        })
        .catch(() => {
            showThanksModal(message.fail);
        })
        .finally(() => {
            form.reset();
        });
    });
}

function showThanksModal(message) {
    const modalDialog = document.querySelector('.modal__dialog');

    modalDialog.style.display = 'none';
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        modalDialog.style.display = 'block';
        closeModal();
    }, 4000);
}

// Slider 

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');

    let slideIndex = 1;

    showSlides(slideIndex);

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    }else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if(n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }else {
            current.textContent = slideIndex;
        }
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click',() => {
        plusSlides(-1);
    });
    next.addEventListener('click',() => {
        plusSlides(1);
    });









}); 


