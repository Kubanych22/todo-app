import {renderRowLight} from './render.js';

export const getTasksData = (user) => (localStorage.getItem(user) ? JSON.parse(localStorage.getItem(user)) : []);

export const setTaskData = (user, data) => {
  const userData = getTasksData(user);
  if (!userData.find(item => item.task === data.task)) {
    userData.push(data);
    localStorage.setItem(user, JSON.stringify(userData));
    return true;
  }
  return false;
};

export const addNewTask = (table, task, user, n, selectedValue) => {
  table.classList.remove('is-visible');
  const data = {
    task: task,
    status: 0,
    importance: selectedValue,
  };
  if (setTaskData(user, data)) {
    renderRowLight(table, task, n++, data.importance);
  }
};

export const updateLocalStorage = (task, user) => {
  const userTaskData = getTasksData(user);
  const newTr = userTaskData.find(item => item.task === task);
  newTr.status = 1;
  localStorage.setItem(user, JSON.stringify(userTaskData));
};

export const deleteFromLocalStorage = (task, user) => {
  const userTaskData = getTasksData(user);
  const result = userTaskData.filter((item) => item.task !== task);
  localStorage.setItem(user, JSON.stringify(result));
}
