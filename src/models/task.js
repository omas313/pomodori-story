export default class Task {
  constructor(id, name, pomodori) {
    this._id = id;
    this.name = name;
    this.pomodori = pomodori;
  }

  addPomodoro = () => this.pomodori++;

  static getDefaultTask = () => new Task('1', 'Untitled task', 0);

  static isDefaultTask = task =>
    task.name === 'Untitled task'
    && task._id === '1'
    && task.pomodori === 0;
}
