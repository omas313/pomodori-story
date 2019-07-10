class Time {
  constructor(min, sec) {
    this.min = min;
    this.sec = sec;
  }

  get totalSeconds() {
    return this.min * 60 + this.sec;
  }

  incSeconds(s) {
    this.sec += s;
    if (this.sec >= 60) {
      this.min += Math.floor(this.sec / 60);
      this.sec = this.sec % 60;
    }
  }

  static secToMinSecString(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const m = mins < 10 ? `0${mins}` : mins;
    const s = secs < 10 ? `0${secs}` : secs;
    return `${m}:${s}`;
  }

  toString() {
    const m = this.min < 10 ? `0${this.min}` : this.min;
    const s = this.sec < 10 ? `0${this.sec}` : this.sec;
    return `${m} : ${s}`;
  }
}

export default Time;
