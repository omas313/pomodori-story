export default class Session {
  static POMODORO = 25;
  static SHORT_BREAK = 5;
  static LONG_BREAK = 10;

  static setTimers(timers) {
    if (timers.pomodoro !== 0) Session.POMODORO = timers.pomodoro;
    if (timers.shortBreak !== 0) Session.SHORT_BREAK = timers.shortBreak;
    if (timers.longBreak !== 0) Session.LONG_BREAK = timers.longBreak;
  }

  static getTimers = () => {
    return {
      pomodoro: Session.POMODORO,
      shortBreak: Session.SHORT_BREAK,
      longBreak: Session.LONG_BREAK
    };
  };

  static getBreakduration = pomodori =>
    pomodori > 0 && pomodori % 4 === 0
      ? Session.LONG_BREAK
      : Session.SHORT_BREAK;
}
