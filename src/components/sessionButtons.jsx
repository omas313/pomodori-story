import React from 'react';

const SessionButtons = ({
  session,
  currentSession,
  onPomodoroClick,
  onShortBreakClick,
  onLongBreakClick
}) => {
  const classes = 'btn btn-primary session-button';
  return (
    <div className="text-center">
      <button
        className={
          classes + (currentSession === session.POMODORO ? ' active' : '')
        }
        onClick={onPomodoroClick}
      >
        <img
          src="./img/pomodoro.png"
          alt="pomodoro"
          className="session-button-img"
        />
      </button>
      <button
        className={
          classes + (currentSession === session.SHORT_BREAK ? ' active' : '')
        }
        onClick={onShortBreakClick}
      >
        <img
          src="./img/time-5.png"
          alt="Short break"
          className="session-button-img"
        />
      </button>
      <button
        className={
          classes + (currentSession === session.LONG_BREAK ? ' active' : '')
        }
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
