import {controlTasks} from './controlTasks.js';

export const control = (modal, modalForm, btnOK) => {

  const closeModal = () => {
    modal.remove();
  };

  const input = document.querySelector('.modal-form-input');
  input.addEventListener('input', (e) => {
    e.preventDefault();
    btnOK.disabled = (e.target.value === '');
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = e.target.querySelector('.modal-form-input').value;
    if (user !== '') {
      closeModal();
    }
    controlTasks(user);
  });

  modalForm.addEventListener('reset', () => {
    closeModal();
  });
};
