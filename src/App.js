import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SessionButtons from './components/sessionButtons';
import Timer from './components/timer';
import Tasks from './components/tasks';
import Summary from './components/summary';
import AppNavbar from './components/appNavbar';
import './App.css';
import InfoModal from './components/infoModal';

const Session = {
  POMODORO: 25,
  SHORT_BREAK: 5,
  LONG_BREAK: 10
};

class App extends Component {
  state = {
    currentSession: Session.POMODORO,
    pomodoroCount: 0,
    pendingPomodoro: false,
    taskCount: 0,
    infoModalOpen: false
  };

  onSessionEnd() {
    const { currentSession } = this.state;

    if (currentSession === Session.POMODORO) this.onPomodoroFinished();
    else this.handleSetSession(Session.POMODORO);
  }

  onPomodoroFinished() {
    const { pomodoroCount: oldPomodoroCount } = this.state;

    const pomodoroCount = oldPomodoroCount + 1;

    this.setState({
      pomodoroCount,
      pendingPomodoro: true
    });

    const longBreakTime = pomodoroCount > 0 && pomodoroCount % 4 === 0;
    this.handleSetSession(
      longBreakTime ? Session.LONG_BREAK : Session.SHORT_BREAK
    );
  }

  handleSetSession = session => {
    this.setState({ currentSession: session });
  };

  handleTaskCountChange = (taskCount, pomodoroCount) => {
    this.setState({ taskCount, pomodoroCount });
  };

  handlePomodoroAssigned = () => {
    if (this.state.pendingPomodoro) this.setState({ pendingPomodoro: false });
  };

  handleInfoModalToggle = () => {
    this.setState({
      infoModalOpen: !this.state.infoModalOpen
    });
  };

  render() {
    const {
      pomodoroCount,
      currentSession,
      pendingPomodoro,
      timer,
      taskCount,
      infoModalOpen
    } = this.state;

    const isSessionPomodoro = currentSession === Session.POMODORO;

    return (
      <React.Fragment>
        <AppNavbar
          title="Pomodori Story"
          isBreakTime={!isSessionPomodoro}
          isWorking={!!timer && isSessionPomodoro}
          onInfoClick={this.handleInfoModalToggle}
        />
        <InfoModal
          isOpen={infoModalOpen}
          onToggle={this.handleInfoModalToggle}
        />
        <Container>
          <Row>
            <Col
              lg={{ size: 8, order: 1 }}
              xs={{ size: 12, order: 2 }}
              className="tasks-column"
            >
              <Tasks
                pendingPomodoro={pendingPomodoro}
                onTasksChanged={this.handleTaskCountChange}
                onPomodoroAssigned={this.handlePomodoroAssigned}
                DEBUG_se_hack={this.onSessionEnd.bind(this)}
              />
            </Col>
            <Col
              lg={{ size: 4, order: 2 }}
              xs={{ size: 12, order: 1 }}
              className="timer-column"
            >
              <SessionButtons
                currentSession={currentSession}
                session={Session}
                onButtonClick={this.handleSetSession}
              />
              <Timer
                currentSession={currentSession}
                isPomodoro={isSessionPomodoro}
                onTimerDone={this.onSessionEnd}
                onTimerToggle={this.handleTimerToggle}
              />
              <Summary taskCount={taskCount} pomodoroCount={pomodoroCount} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
