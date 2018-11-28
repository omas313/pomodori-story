import React, { Component } from 'react';
import SessionButtons from './components/sessionButtons';
import Time from './components/time';
import Tasks from './components/tasks';
import TaskEntry from './components/taskEntry';
import Summary from './components/summary';
import Navbar from './components/navbar';
import './App.css';

const Session = {
  POMODORO: 25,
  SHORT_BREAK: 5,
  LONG_BREAK: 10
};

class App extends Component {
  state = {
    time: { min: Session.POMODORO, sec: 0 },
    timer: null,
    playing: false,
    currentSession: Session.POMODORO,
    tasks: [],
    currentTask: null,
    pomodoroCount: 0
  };

  componentDidMount() {
    const tasks = [
      { _id: 1, name: 'Untitled task', count: 0 }
      // { _id: 2, name: 'Untitled task', count: 0 },
      // { _id: 3, name: 'Untitled task', count: 0 },
      // { _id: 4, name: 'Untitled task', count: 0 }
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

  handleTimerToggle = () => {
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
    const { currentSession } = this.state;

    this.stopTimer();

    if (currentSession === Session.POMODORO) this.onPomodoroFinished();
    else this.handleSetSession(Session.POMODORO);
  };

  onPomodoroFinished = () => {
    const { pomodoroCount, tasks } = this.state;

    if (tasks.length === 0) this.handleNewTask('Untitled task', 1);
    else this.incrementTaskCounter();
    const newPomodoroCount = pomodoroCount + 1;

    this.setState({ pomodoroCount: newPomodoroCount });

    const longBreakTime = newPomodoroCount > 0 && newPomodoroCount % 4 === 0;
    this.handleSetSession(
      longBreakTime ? Session.LONG_BREAK : Session.SHORT_BREAK
    );
  };

  handleSetSession = session => {
    this.setState({
      time: { min: session, sec: 0 },
      currentSession: session
    });

    this.startTimer();
  };

  handleSetActiveTask = task => {
    this.setState({ currentTask: task });
  };

  handleNewTask = (name, count = 0) => {
    if (name.startsWith('>>')) return this.runCommand(name.substring(2));

    const tasks = [...this.state.tasks];
    const task = {
      name: name.trim(),
      count,
      _id: `${name.length}${Math.random() * 1000000}`
    };
    tasks.push(task);

    this.setState({ tasks }, () => {
      if (tasks.length === 1) this.handleSetActiveTask(task);
    });
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
    switch (command) {
      case 'es':
        this.onSessionEnd();
        break;
      case 'po':
        this.handleSetSession(Session.POMODORO);
        break;
      case 'sb':
        this.handleSetSession(Session.SHORT_BREAK);
        break;
      case 'lb':
        this.handleSetSession(Session.LONG_BREAK);
        break;
      default:
        console.log('Unknown command: ' + command);
    }
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
            <div className="col-md-6 col-sm-12 order-2 order-md-1 left-section">
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
            <div className="col-md-6 col-sm-12 order-1 order-md-2 right-section">
              <SessionButtons
                onPomodoroClick={() => this.handleSetSession(Session.POMODORO)}
                onShortBreakClick={() =>
                  this.handleSetSession(Session.SHORT_BREAK)
                }
                onLongBreakClick={() =>
                  this.handleSetSession(Session.LONG_BREAK)
                }
              />
              <Time
                time={time}
                paused={paused}
                onToggle={this.handleTimerToggle}
              />
              <Summary taskCount={tasks.length} pomodoroCount={pomodoroCount} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
