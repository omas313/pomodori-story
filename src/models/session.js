export default class Session {
  static OVERTIME = false;
  static DARK_MODE = false;
  static POMODORO = 25;
  static SHORT_BREAK = 5;
  static LONG_BREAK = 10;
  static TIMER_MIN = 1;
  static TIMER_MAX = 120;

  static getOvertime = () => Session.OVERTIME;
  static setOvertime = (value) => Session.OVERTIME = value;

  static getDarkMode = () => Session.DARK_MODE;
  static setDarkMode = (value) => Session.DARK_MODE = value;

  static validTimers = timers =>
    !Object.keys(timers).some(
      k => timers[k] < Session.TIMER_MIN || timers[k] > Session.TIMER_MAX
    );

  static setTimers = timers => {
    if (timers.pomodoro !== 0) Session.POMODORO = timers.pomodoro;
    if (timers.shortBreak !== 0) Session.SHORT_BREAK = timers.shortBreak;
    if (timers.longBreak !== 0) Session.LONG_BREAK = timers.longBreak;
  };

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

  static getTextFromTime = time => {
    switch (time) {
      case Session.SHORT_BREAK:
        return 'Break (S)';

      case Session.LONG_BREAK:
        return 'Break (L)';

      default:
        return 'Pomodoro';
    }
  };
}
