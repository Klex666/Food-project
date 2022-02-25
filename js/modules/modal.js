function openModal(modalSelector, modalTimerId ) { 
     const modal = document.querySelector(modalSelector);

     modal.style.display = 'block';
     document.body.style.overflow = 'hidden';
     if (modalTimerId) {
          clearInterval(modalTimerId);
     }
}

function closeModal(modalSelector) {
     const modal = document.querySelector(modalSelector);

     modal.style.display = 'none';
     document.body.style.overflow = ''; 
}


function modal (triggerSelector, modalSelector, modalTimerId) {
    const modalButton = document.querySelectorAll(triggerSelector);
   const modal = document.querySelector(modalSelector);

   modalButton.forEach(items => {
    items.addEventListener('click', () => openModal(modalSelector, modalTimerId));
   });


   modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
   });

   document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            closeModal(modalSelector);
        }
   });

   function showModaByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModaByScroll);
    }
   }

   window.addEventListener('scroll', showModaByScroll);

}

export default modal;
export {closeModal};
export {openModal};
