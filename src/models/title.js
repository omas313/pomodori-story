export default class Title {
  static value = '';

  static session = '';
  static time = '';
  static isPaused = false;

  static update = () =>
    (document.title =
      `${Title.session} - ${Title.time}` + (Title.isPaused ? ` - PAUSED` : ''));

  static setSession = session => {
    Title.session = session;
    Title.update();
  };

  static setTime = time => {
    Title.time = time;
    Title.update();
  };

  static setState = state => {
    Title.isPaused = state;
    Title.update();
  };
}
