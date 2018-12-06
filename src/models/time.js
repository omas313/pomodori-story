class Time {
  constructor(min, sec) {
    this.min = min;
    this.sec = sec;
  }

  toString() {
    const m = this.min < 10 ? `0${this.min}` : this.min;
    const s = this.sec < 10 ? `0${this.sec}` : this.sec;
    return `${m} : ${s}`;
  }
}

export default Time;
