const timersKeys = {
  pomodoro: 'pomodoro',
  shortBreak: 'sb',
  longBreak: 'lb'
};

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

export default {
  getTimers,
  saveTimers
};
