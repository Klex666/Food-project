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
   const modalClose = document.querySelector('[data-close]');

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
   modalClose.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
        if(e.target === modal) {
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

   new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
).render();


// Forms 

const form = document.querySelectorAll('form');
const message = {
    loading: 'Загрузка...',
    sucess: 'Благодарим! Мы скоро свяжемся с вами!',
    fail: 'Ошибка'
};

form.forEach(item => {
    postData(item);
});


function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();


        let statusMessages = document.createElement('div');
        statusMessages.classList.add('status');
        statusMessages.textContent = message.loading;
        form.appendChild(statusMessages);


        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        const formData = new FormData(form);
        request.send(formData);



        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessages.textContent = message.sucess;
                form.reset();
                setTimeout(() => {
                    statusMessages.remove();
                },3000);
            } else {
                statusMessages.textContent = message.fail;
            }
        });
    });
}




}); 


