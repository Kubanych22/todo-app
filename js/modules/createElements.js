export const createModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal-form-container');
  const modalForm = document.createElement('form');
  modalForm.classList.add('modal-form');
  modalForm.name = 'modal-form';
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-form-title');
  modalTitle.textContent = 'Приложение ToDo App\nприветствует Вас!';

  const modalLabel = document.createElement('label');
  modalLabel.classList.add('modal-form-label');
  const modalLabelText = document.createTextNode('Введите Ваше имя:');

  const modalInput = document.createElement('input');
  modalInput.classList.add('modal-form-input');
  modalInput.type = 'text';

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'OK',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
  ]);

  modalLabel.append(modalLabelText, modalInput);
  modalForm.append(modalTitle, modalLabel, buttonGroup.btnWrapper);
  modal.append(modalForm);

  return {
    modal,
    modalForm,
    buttonGroup,
    bntOK: buttonGroup[0],
  };
};

const createButtonsGroup = params => {
  const btnWrapper = document.createElement('div');

  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;

    return button;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

export const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.name = 'form';

  const formSelectWrapper = document.createElement('div');
  formSelectWrapper.classList.add('select-wrapper', 'me-3', 'mb-3');

  const formSelectLabel = document.createElement('label');
  formSelectLabel.for = 'importance';
  formSelectLabel.textContent = 'Важность задачи'
  const formSelect = document.createElement('select');
  formSelect.classList.add('select');
  formSelect.id = 'importance'
  formSelect.innerHTML = `
  <select name="task">
    <option value="ordinary">Обычная</option>
    <option value="important">Важная</option>
    <option value="urgent">Срочная</option>
  </select>
  `
  formSelectWrapper.append(formSelectLabel, formSelect);

  const formLabel = document.createElement('label');
  formLabel.classList.add('form-group', 'me-3', 'mb-0');
  const formInput = document.createElement('input');
  formInput.classList.add('form-control');
  formInput.type = 'text';
  formInput.name = 'task';
  formInput.placeholder = 'ввести задачу';
  formLabel.append(formInput);
  const formBtnSubmit = document.createElement('button');
  formBtnSubmit.classList.add('btn', 'btn-primary', 'me-3', 'disabled');
  formBtnSubmit.textContent = 'Сохранить';

  const formBtnReset = document.createElement('button');
  formBtnReset.classList.add('btn', 'btn-warning');
  formBtnReset.textContent = 'Очистить';

  form.append(formSelectWrapper, formLabel, formBtnSubmit, formBtnReset);
  return form;
};

export const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');
  const tHead = document.createElement('thead');
  const trHead = document.createElement('tr');
  const thNum = document.createElement('th');
  thNum.textContent = '№';
  const thTask = document.createElement('th');
  thTask.textContent = 'Задача';
  const thStatus = document.createElement('th');
  thStatus.textContent = 'Статус';
  const thActions = document.createElement('th');
  thActions.textContent = 'Действия';
  trHead.append(thNum, thTask, thStatus, thActions);
  tHead.append(trHead);

  const tbody = document.createElement('tbody');
  table.append(tHead, tbody);
  table.tHead = tHead;
  table.tbody = tbody;
  return {
    table: table,
    tbody: tbody
  };
};

export const createRowLight = (task, numRow, selectedValue) => {
  const trLight = document.createElement('tr');
  trLight.classList.add('table-light');
  if (typeof selectedValue !== undefined) {
    trLight.className = `${selectedValue}`;
  }
  const tdNum = document.createElement('td');
  tdNum.textContent = `${numRow}`;
  const tdTask = document.createElement('td');
  tdTask.classList.add('task');
  tdTask.textContent = `${task}`;
  const tdStatus = document.createElement('td');
  tdStatus.textContent = 'В процессе';
  const tdActions = document.createElement('td');

  const deleteTask = document.createElement('button');
  deleteTask.classList.add('btn', 'btn-danger', 'me-3');
  deleteTask.textContent = 'Удалить';

  const completeTask = document.createElement('button');
  completeTask.classList.add('btn', 'btn-success', 'me-3');
  completeTask.textContent = 'Завершить';

  const editTask = document.createElement('button');
  editTask.classList.add('btn', 'btn-secondary');
  editTask.textContent = 'Редактировать';

  tdActions.append(deleteTask, completeTask, editTask);

  trLight.append(tdNum, tdTask, tdStatus, tdActions);
  return trLight;
};

export const createRowSuccess = (task, numRow) => {
  const trSuccess = document.createElement('tr');
  trSuccess.classList.add('table-success');

  const tdNum = document.createElement('td');
  tdNum.textContent = `${numRow}`;

  const tdTask = document.createElement('td');
  tdTask.classList.add('text-decoration-line-through');
  tdTask.textContent = `${task}`;
  const tdStatus = document.createElement('td');
  tdStatus.textContent = 'Выполнена';
  const tdActions = document.createElement('td');

  const deleteTask = document.createElement('button');
  deleteTask.classList.add('btn', 'btn-danger', 'me-3');
  deleteTask.textContent = 'Удалить';

  const completeTask = document.createElement('button');
  completeTask.classList.add('btn', 'btn-success');
  completeTask.textContent = 'Завершить';

  tdActions.append(deleteTask, completeTask);

  trSuccess.append(tdNum, tdTask, tdStatus, tdActions);

  return trSuccess;
};




