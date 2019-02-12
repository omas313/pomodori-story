export default class Session {
  static POMODORO = 25;
  static SHORT_BREAK = 5;
  static LONG_BREAK = 10;

  static getBreakduration = pomodori =>
    pomodori > 0 && pomodori % 4 === 0
      ? Session.LONG_BREAK
      : Session.SHORT_BREAK;
}
