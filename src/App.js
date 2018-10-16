import React, { Component } from 'react';
import Time from './components/time';
import SessionButtons from './components/session';
import Tasks from './components/tasks';
import TaskEntry from './components/taskEntry';
import './App.css';

const POMODORO = 30,
  SHORT_BREAK = 5,
  LONG_BREAK = 15;

class App extends Component {
  state = {
    time: { min: POMODORO, sec: 0 },
    timer: null,
    playing: false,
    currentSession: POMODORO,
    tasks: [],
    currentTask: null,
    totalCount: 0
  };

  componentDidMount() {
    const tasks = [{ _id: 1, name: 'Untitled task', count: 0 }];
    this.setState({
      tasks,
      currentTask: tasks[0]
    });
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({ timer: null, playing: false });
  };

  startTimer = () => {
    const { playing } = this.state;

    if (playing) this.stopTimer();

    this.setState({
      timer: setInterval(this.onSecondPassed, 1000),
      playing: true
    });
  };

  toggle = () => {
    const { playing } = this.state;

    if (playing) this.stopTimer();
    else this.startTimer();
  };

  onSecondPassed = () => {
    const { time } = this.state;
    const nextTime = { ...time };

    if (time.sec === 0 && time.min === 0) return this.onSessionEnd();

    if (time.sec === 0) {
      nextTime.min = time.min - 1;
      nextTime.sec = 59;
    } else {
      nextTime.sec = time.sec - 1;
    }

    this.setState({ time: nextTime });
  };

  onSessionEnd = () => {
    this.stopTimer();

    const { totalCount, currentSession } = this.state;
    this.setState({
      time: { min: 0, sec: 0 },
      totalCount: currentSession === POMODORO ? totalCount + 1 : totalCount
    });

    if (this.state.currentSession !== POMODORO) return;
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(this.state.currentTask);
    const task = { ...tasks[index] };
    task.count++;
    tasks[index] = task;

    this.setState({ tasks, currentTask: tasks[index] });
  };

  handleSetSession = session => {
    this.setState(
      {
        time: { min: session, sec: 0 },
        currentSession: session
      },
      () => {
        const { tasks, currentSession } = this.state;
        if (tasks.length === 0 && currentSession === POMODORO)
          this.handleNewTask('Untitled task');
      }
    );

    this.startTimer();
  };

  handleSetActiveTask = task => {
    this.setState({ currentTask: task });
  };

  handleNewTask = name => {
    const tasks = [...this.state.tasks];
    const newId =
      name.length +
      this.state.tasks.length +
      Math.ceil(Math.random() * 100 + 100);
    const task = { name, count: 0, _id: newId };
    tasks.unshift(task);

    const updates = { tasks };
    if (tasks.length === 1) updates.currentTask = task;

    this.setState(updates);
  };

  handleDeleteTask = task => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    const updates = { tasks };
    if (task._id === this.state.currentTask._id) updates.currentTask = tasks[0];

    this.setState(updates);
  };

  handleEditTask = (oldTask, newName) => {
    const { tasks: oldTasks } = this.state;

    const tasks = [...oldTasks];
    const index = oldTasks.indexOf(oldTask);

    const task = { ...tasks[index] };
    task.name = newName;
    tasks[index] = task;

    this.setState({ tasks }, () => {
      if (task._id === this.state.currentTask._id)
        this.setState({ currentTask: task });
    });
  };

  render() {
    const {
      totalCount,
      time,
      currentSession,
      tasks,
      currentTask,
      timer
    } = this.state;
    const paused = !timer && time.min !== currentSession;

    return (
      <React.Fragment>
        total count: {totalCount}
        <br />
        <button onClick={this.onSessionEnd}>end session</button>
        <hr />
        <SessionButtons
          onPomodoroClick={() => this.handleSetSession(POMODORO)}
          onShortBreakClick={() => this.handleSetSession(SHORT_BREAK)}
          onLongBreakClick={() => this.handleSetSession(LONG_BREAK)}
        />
        <Time time={time} paused={paused} onToggle={this.toggle} />
        <TaskEntry onSubmit={this.handleNewTask} />
        <Tasks
          tasks={tasks}
          currentTask={currentTask}
          onSetActiveTask={this.handleSetActiveTask}
          onAdd={this.handleNewTask}
          onEdit={this.handleEditTask}
          onDelete={this.handleDeleteTask}
        />
      </React.Fragment>
    );
  }
}

export default App;
