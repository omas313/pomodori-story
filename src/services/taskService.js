const key = 'tasks';

function getAll() {
  return JSON.parse(localStorage.getItem(key));
}

function save(tasks) {
  return localStorage.setItem(key, JSON.stringify(tasks));
}

export default { getAll, save };
