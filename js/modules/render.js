import {createForm, createModal, createRowLight, createRowSuccess, createTable} from './createElements.js';
import {control} from './control.js';

export const appContainer = document.querySelector('.app-container');
appContainer.classList.add('app-container', 'container', 'vh-100', 'w-100', 'd-flex', 'align-items-center', 'flex-column');

export const start = () => {
  const {modal, modalForm, btnOK} = renderModal();
  control(modal, modalForm, btnOK);
};

export const renderModal = () => {
  const {modal, modalForm, buttonGroup} = createModal();
  appContainer.append(modal);
  const input = modal.querySelector('.modal-form-input');
  input.focus();
  buttonGroup.btns[0].disabled = true;
  return {
    modal: modal,
    modalForm: modalForm,
    btnOK: buttonGroup.btns[0],
    btnCancel: buttonGroup.btns[1],
  };
};

export const renderForm = () => {
  const form = createForm();
  return {form};
};

export const renderTable = () => {
  const {table} = createTable();
  appContainer.append(table);
  return {table};
};

export const renderRowLight = (table, task, n, selectedValue) => {
  table.tbody.append(createRowLight(task, n, selectedValue));

  return {table};
};

export const renderRowSuccess = (table, task, n) => {
  table.tbody.append(createRowSuccess(task, n));
  return {table};
};

