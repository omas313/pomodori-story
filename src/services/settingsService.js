const timersKeys = {
  pomodoro: 'pomodoro',
  shortBreak: 'sb',
  longBreak: 'lb'
};
const overtimeKey = 'overtime';
const darkModeKey = 'darkMode';

function getTimers() {
  const values = Object.keys(timersKeys).map(k =>
    Number(localStorage.getItem(timersKeys[k]))
  );
  return {
    pomodoro: values[0],
    shortBreak: values[1],
    longBreak: values[2]
  };
}

function saveTimers(timers) {
  localStorage.setItem(timersKeys.pomodoro, timers.pomodoro);
  localStorage.setItem(timersKeys.shortBreak, timers.shortBreak);
  localStorage.setItem(timersKeys.longBreak, timers.longBreak);
}

function getOvertime() {
  const value = localStorage.getItem(overtimeKey);
  if (value === null) return false;
  return value.toString() === "true";
}

function setOvertime(value) {
  if (value === null) value = false;
  localStorage.setItem(overtimeKey, value.toString() === "true");
}

function getDarkMode() {
  const value = localStorage.getItem(darkModeKey);
  if (value === null) return false;
  return value.toString() === "true";
}

function setDarkMode(value) {
  if (value === null) value = false;
  localStorage.setItem(darkModeKey, value.toString() === "true");
}

export default {
  getTimers,
  saveTimers,
  getOvertime,
  setOvertime,
  getDarkMode,
  setDarkMode
};
