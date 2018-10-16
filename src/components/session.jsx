import React from 'react';

const SessionButtons = ({
  onPomodoroClick,
  onShortBreakClick,
  onLongBreakClick
}) => {
  return (
    <React.Fragment>
      <button className="btn btn-primary" onClick={onPomodoroClick}>
        Pomodoro
      </button>
      <button className="btn btn-primary" onClick={onShortBreakClick}>
        Short Break
      </button>
      <button className="btn btn-primary" onClick={onLongBreakClick}>
        Long Break
      </button>
    </React.Fragment>
  );
};

export default SessionButtons;
