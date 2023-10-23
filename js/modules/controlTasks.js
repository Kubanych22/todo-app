import {appContainer, renderForm, renderRowLight, renderRowSuccess, renderTable} from './render.js';
import {addNewTask, deleteFromLocalStorage, getTasksData, updateLocalStorage} from './serviceStorage.js';

export const controlTasks = (user) => {
  const welcome = document.createElement('h2');
  welcome.classList.add('welcome');
  welcome.textContent = 'Привет, ' + user + '!';
  const {form} = renderForm();
  appContainer.append(welcome, form);

  const {table} = renderTable();

  showTasks(table, user);

  formControl(form, table, user);

  tableControl(table, user);
};

const formControl = (form, table, user) => {
  const formInput = form.querySelector('.form-control');
  const btnInput = form.querySelector('.btn-primary');
  formInput.addEventListener('input', (e) => {
    e.preventDefault();
    btnInput.classList.remove('disabled');
  });

  const select = document.querySelector('.select');
  let option = select.querySelector('option');
  let selectedValue = 'ordinary';
  select.addEventListener('change', (e) => {
    e.preventDefault();
    const selectedIndex = e.target.selectedIndex;
    option = select.options;
    selectedValue = option[selectedIndex].value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const newTask = Object.fromEntries(formData).task;

    if (e.submitter.classList.contains('btn-primary')) {
      switch (selectedValue) {
        case 'ordinary':
          selectedValue = 'table-light';
          break;
        case 'important':
          selectedValue = 'table-warning'
          break;
        case 'urgent':
          selectedValue = 'table-danger'
          break;
      }
      addNewTask(table, newTask, user, getTasksData(user).length + 1, selectedValue);
      selectedValue = 'ordinary';
    }

    btnInput.classList.add('disabled');
    form.reset();
  });
};

export const showTasks = (table, user) => {
  const tasks = getTasksData(user);
  if (tasks.length === 0) {
    table.classList.add('is-visible');
  }
  let numRow = 1;
  tasks.map(task => {
    if (task.status === 0) {
      renderRowLight(table, task.task, numRow, task.importance);
      numRow++;
    } else {
      renderRowSuccess(table, task.task, numRow, task.importance);
      numRow++;
    }
  });
  rerenderTable();
};

const tableControl = (table, user) => {
  table.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    const tr = target.closest('tr')
    if (target.classList.contains('btn-success')) {
      completeTask(tr, user);
    }
    if (target.classList.contains('btn-secondary')) {
      const task = table.querySelector('.task')
      task.setAttribute("contenteditable", "true");
      task.focus();
    }
    if (target.classList.contains('btn-danger')) {
      deleteTask(tr, user);
    }
  });

  const completeTask = (tr, user) => {
    tr.classList.replace('table-light', 'table-success');
    const td = tr.firstElementChild.nextElementSibling;
    const task = td.textContent;
    td.classList.replace('task', 'text-decoration-line-through');
    const nextSibling = td.nextSibling;
    nextSibling.textContent = 'выполнено';
    tr.querySelector('.btn-secondary').remove();
    updateLocalStorage(task, user);
  }

  const deleteTask = (tr, user) => {
    if (confirm('Вы уверены')) {
      tr.remove();
      const td = tr.firstElementChild.nextElementSibling;
      const task = td.textContent;
      deleteFromLocalStorage(task, user);
      rerenderTable();
    }
  };
};

const rerenderTable = () => {
  const table = appContainer.querySelector('tbody');
  const tr = table.querySelectorAll('tr')
  let numRow = 1;
  for (const trElement of tr) {
    trElement.children[0].textContent = String(numRow++)
  }
};
