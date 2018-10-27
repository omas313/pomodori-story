import React from 'react';

const Summary = ({ taskCount, pomodoroCount }) => {
  return (
    <div className="summary row">
      <div className="col text-center">
        <p className="text-bold">Tasks</p>
        <p>{taskCount}</p>
      </div>
      <div className="col text-center">
        <p className="text-bold">Pomodori</p>
        <p>{pomodoroCount}</p>
      </div>
    </div>
  );
};

export default Summary;
