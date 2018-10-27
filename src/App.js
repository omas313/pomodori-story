import React, { Component } from 'react';
import SessionButtons from './components/sessionButtons';
import Time from './components/time';
import Tasks from './components/tasks';
import TaskEntry from './components/taskEntry';
import Summary from './components/summary';
import Navbar from './components/navbar';
import './App.css';

const POMODORO = 25,
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
    pomodoroCount: 0
  };

  componentDidMount() {
    // const tasks = [{ _id: 1, name: 'Untitled task', count: 0 }];
    const tasks = [
      { _id: 1, name: 'Untitled task', count: 0 },
      { _id: 2, name: 'Untitled task', count: 0 },
      { _id: 3, name: 'Untitled task', count: 0 },
      { _id: 4, name: 'Untitled task', count: 0 }
    ];
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

  toggleTimer = () => {
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
    const { pomodoroCount, currentSession } = this.state;

    this.stopTimer();
    this.setState({
      time: { min: 0, sec: 0 },
      totalCount:
        currentSession === POMODORO ? pomodoroCount + 1 : pomodoroCount
    });

    if (this.state.currentSession === POMODORO) this.incrementTaskCounter();
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
    if (task._id === this.state.currentTask._id) return;
    this.setState({ currentTask: task });
  };

  handleNewTask = name => {
    if (name.substring(0, 3) === '>>!')
      return this.runCommand(name.substring(3));

    const tasks = [...this.state.tasks];
    const newId =
      name.length +
      this.state.tasks.length +
      Math.ceil(Math.random() * 100 + 100);
    const task = { name: name.trim(), count: 0, _id: newId };
    tasks.push(task);

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

  handleEditTask = (id, name) => {
    const { tasks: oldTasks, currentTask } = this.state;

    const tasks = [...oldTasks];
    const index = tasks.findIndex(t => t._id === id);

    const task = { ...tasks[index] };
    task.name = name.trim();
    tasks[index] = task;
    console.log(tasks);
    this.setState({ tasks }, () => {
      if (task._id === currentTask._id) this.setState({ currentTask: task });
    });
  };

  incrementTaskCounter() {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(this.state.currentTask);
    const task = { ...tasks[index] };
    task.count++;
    tasks[index] = task;
    this.setState({ tasks, currentTask: tasks[index] });
  }

  // hacks for debugging
  runCommand(command) {
    if (command === 'es') this.onSessionEnd();
  }

  render() {
    const {
      pomodoroCount,
      time,
      currentSession,
      tasks,
      currentTask,
      timer
    } = this.state;
    const paused =
      !timer &&
      time.min !== currentSession &&
      (time.min !== 0 && time.sec !== 0);

    return (
      <React.Fragment>
        <Navbar title="Pomodori Story" />
        <div className="container">
          <div className="row">
            <div className="col left-section">
              <TaskEntry onSubmit={this.handleNewTask} />
              <Tasks
                tasks={tasks}
                currentTask={currentTask}
                onSetActiveTask={this.handleSetActiveTask}
                onAdd={this.handleNewTask}
                onEdit={this.handleEditTask}
                onDelete={this.handleDeleteTask}
              />
            </div>
            <div className="col-5 right-section">
              <SessionButtons
                onPomodoroClick={() => this.handleSetSession(POMODORO)}
                onShortBreakClick={() => this.handleSetSession(SHORT_BREAK)}
                onLongBreakClick={() => this.handleSetSession(LONG_BREAK)}
              />
              <Time time={time} paused={paused} onToggle={this.toggleTimer} />
              <Summary taskCount={tasks.length} pomodoroCount={pomodoroCount} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
