export default class Task {
  constructor(id, name, pomodori) {
    this._id = id;
    this.name = name;
    this.pomodori = pomodori;
  }

  addPomodoro = () => this.pomodori++;

  static getDefaultTask = () => new Task('1', 'Untitled task', 0);
}
