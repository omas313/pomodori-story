import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import AppNavbar from './components/appNavbar';
import InfoModal from './components/infoModal';
import SettingsModal from './components/settingsModal';
import LeftToBottomCol from './components/leftToBottomCol';
import RightToTopCol from './components/rightToTopCol';
import SessionButtons from './components/sessionButtons';
import Summary from './components/summary';
import Tasks from './components/tasks';
import Timer from './components/timer';
import Session from './models/session';
import './App.css';
import settingsService from './services/settingsService';
import Title from './models/title';

class App extends Component {
  state = {
    currentSession: 0,
    taskCount: 0,
    pomodoroCount: 0,
    pendingPomodoro: false,
    isWorking: false,
    infoModalOpen: false,
    settingsModalOpen: false,
    initCompleted: false
  };

  async componentDidMount() {
    await this.initSettings();
  }

  async initSettings() {
    this.initTimers();
    this.initOtherSettings();
    this.initTitle();
    await this.setState({ currentSession: Session.POMODORO },
      () => this.setState({ initCompleted: true }))
  }

  initTimers() {
    const timers = settingsService.getTimers();
    Session.setTimers(timers);
  }

  initOtherSettings() {
    const overtime = settingsService.getOvertime();
    Session.setOvertime(overtime);
  }

  initTitle() {
    const { currentSession } = this.state;
    Title.setSession(Session.getTextFromTime(currentSession));
  }

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

  handleSetSession = session =>
    this.setState({ currentSession: session }, () =>
      Title.setSession(Session.getTextFromTime(this.state.currentSession))
    );

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

  handleSettingsModalToggle = () =>
    this.setState({ settingsModalOpen: !this.state.settingsModalOpen });

  render() {
    const {
      pomodoroCount,
      currentSession,
      pendingPomodoro,
      isWorking,
      taskCount,
      infoModalOpen,
      settingsModalOpen,
      initCompleted
    } = this.state;

    const isSessionPomodoro = currentSession === Session.POMODORO;

    return (
      <React.Fragment>
        <AppNavbar
          title="Pomodori Story"
          isBreakTime={!isSessionPomodoro}
          isWorking={isWorking}
          onInfoClick={this.handleInfoModalToggle}
          onSettingsClick={this.handleSettingsModalToggle}
        />
        <InfoModal
          isOpen={infoModalOpen}
          onToggle={this.handleInfoModalToggle}
        />
        {initCompleted && (
          <SettingsModal
            isOpen={settingsModalOpen}
            onToggle={this.handleSettingsModalToggle}
          />
        )}
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
                startOnChange={initCompleted}
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
