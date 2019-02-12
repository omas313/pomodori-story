import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import AppNavbar from './components/appNavbar';
import InfoModal from './components/infoModal';
import LeftToBottomCol from './components/leftToBottomCol';
import RightToTopCol from './components/rightToTopCol';
import SessionButtons from './components/sessionButtons';
import Summary from './components/summary';
import Tasks from './components/tasks';
import Timer from './components/timer';
import Session from './models/session';
import './App.css';

class App extends Component {
  state = {
    currentSession: Session.POMODORO,
    taskCount: 0,
    pomodoroCount: 0,
    pendingPomodoro: false,
    isWorking: false,
    infoModalOpen: false
  };

  onPomodoroFinished() {
    const { pomodoroCount: oldPomodoroCount } = this.state;

    const pomodoroCount = oldPomodoroCount + 1;

    this.setState({
      pomodoroCount,
      pendingPomodoro: true
    });
    this.handleSetSession(Session.getBreakduration(pomodoroCount));
  }

  handleSessionEnd = () => {
    const { currentSession } = this.state;

    if (currentSession === Session.POMODORO) this.onPomodoroFinished();
    else this.handleSetSession(Session.POMODORO);
  };

  handleSetSession = session => this.setState({ currentSession: session });

  handleTimerStart = () => {
    this.setState({
      isWorking: this.state.currentSession === Session.POMODORO
    });
  };

  handleTimerStop = () => this.setState({ isWorking: false });

  handleTaskCountChange = (taskCount, pomodoroCount) =>
    this.setState({ taskCount, pomodoroCount });

  handlePomodoroAssigned = () => {
    if (this.state.pendingPomodoro) this.setState({ pendingPomodoro: false });
  };

  handleInfoModalToggle = () =>
    this.setState({ infoModalOpen: !this.state.infoModalOpen });

  render() {
    const {
      pomodoroCount,
      currentSession,
      pendingPomodoro,
      isWorking,
      taskCount,
      infoModalOpen
    } = this.state;

    const isSessionPomodoro = currentSession === Session.POMODORO;

    return (
      <React.Fragment>
        <AppNavbar
          title="Pomodori Story"
          isBreakTime={!isSessionPomodoro}
          isWorking={isWorking}
          onInfoClick={this.handleInfoModalToggle}
        />
        <InfoModal
          isOpen={infoModalOpen}
          onToggle={this.handleInfoModalToggle}
        />
        <Container>
          <Row>
            <LeftToBottomCol>
              <Tasks
                pendingPomodoro={pendingPomodoro}
                onTasksChanged={this.handleTaskCountChange}
                onPomodoroAssigned={this.handlePomodoroAssigned}
                DEBUG_se_hack={this.handleSessionEnd}
              />
            </LeftToBottomCol>
            <RightToTopCol>
              <SessionButtons
                currentSession={currentSession}
                onButtonClick={this.handleSetSession}
              />
              <Timer
                currentSessionValue={currentSession}
                isPomodoro={isSessionPomodoro}
                onTimerStart={this.handleTimerStart}
                onTimerStop={this.handleTimerStop}
                onTimerDone={this.handleSessionEnd}
              />
              <Summary taskCount={taskCount} pomodoroCount={pomodoroCount} />
            </RightToTopCol>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
