import React from 'react';

const SessionButtons = ({
  onPomodoroClick,
  onShortBreakClick,
  onLongBreakClick
}) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-primary session-button"
        onClick={onPomodoroClick}
      >
        <img
          src="./img/pomodoro.png"
          alt="pomodoro"
          className="session-button-img"
        />
      </button>
      <button
        className="btn btn-primary session-button"
        onClick={onShortBreakClick}
      >
        <img
          src="./img/time-5.png"
          alt="Short break"
          className="session-button-img"
        />
      </button>
      <button
        className="btn btn-primary session-button"
        onClick={onLongBreakClick}
      >
        <img
          src="./img/time-10.png"
          alt="Long break"
          className="session-button-img"
        />
      </button>
    </div>
  );
};

export default SessionButtons;
