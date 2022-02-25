import {closeModal, openModal} from './modal';
import {postData} from '../services/services';


function forms (formSelector, modalTimerId) {
    const form = document.querySelectorAll(formSelector);
        const message = {
            loading: 'img/form/spinner.svg',
            sucess: 'Благодарим! Мы скоро свяжемся с вами!',
            fail: 'Ошибка'
        };

        form.forEach(item => {
            bindPostData(item);
        });


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
            openModal('.modal', modalTimerId);

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
                closeModal('.modal');
            }, 4000);
        }
}

export default forms;
