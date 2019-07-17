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
import settingsService from './services/settingsService';
import Title from './models/title';
import Time from './models/time';
import { ThemeContext, themes } from './context/themeContext';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    this.state = {
      currentSession: 0,
      taskCount: 0,
      pomodoroCount: 0,
      pendingPomodoro: false,
      isWorking: false,
      infoModalOpen: false,
      settingsModalOpen: false,
      initCompleted: false,
      reset: false,
      overtime: {
        pomodori: 0,
        breaks: 0
      },
      theme: themes.dark,
      toggleTheme: this.toggleTheme
    };

    this.styles = {
      width: '100%',
      height: '100%',
      minHeight: '100%',
      margin: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      overflow: 'auto'
    };
  }


  async componentDidMount() {
    await this.initSettings();
  }

  async initSettings() {
    this.initTimers();
    await this.initOtherSettings();
    this.initTitle();
    await this.setState({ currentSession: Session.POMODORO },
      () => this.setState({ initCompleted: true }));
  }

  initTimers() {
    const timers = settingsService.getTimers();
    Session.setTimers(timers);
  }

  async initOtherSettings() {
    const overtime = settingsService.getOvertime();
    Session.setOvertime(overtime);
    const darkMode = settingsService.getDarkMode();
    Session.setDarkMode(darkMode);
    await this.setState({ theme: darkMode ? themes.dark : themes.light })
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

  handleReset = () => this.setState({ reset: true });

  handleResetDone = () => this.setState({ reset: false });

  handlePomodoroAssigned = () => {
    if (this.state.pendingPomodoro) this.setState({ pendingPomodoro: false });
  };

  handleInfoModalToggle = () =>
    this.setState({ infoModalOpen: !this.state.infoModalOpen });

  handleSettingsModalToggle = () =>
    this.setState({ settingsModalOpen: !this.state.settingsModalOpen });

  handleOvertime = sec => {
    const overtime = { ...this.state.overtime };
    const { currentSession } = this.state;

    if (currentSession === Session.POMODORO) overtime.pomodori += sec;
    else overtime.breaks += sec;

    this.setState({ overtime });
  }

  mapOvertimeToString = ({ pomodori, breaks }) => ({
    pomodori: Time.secToMinSecString(pomodori),
    breaks: Time.secToMinSecString(breaks)
  });

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.renderContent()}
      </ThemeContext.Provider>
    );
  }

  renderContent() {
    const {
      pomodoroCount,
      currentSession,
      pendingPomodoro,
      isWorking,
      taskCount,
      infoModalOpen,
      settingsModalOpen,
      initCompleted,
      overtime,
      reset,
      theme
    } = this.state;

    const isSessionPomodoro = currentSession === Session.POMODORO;
    const styles = {
      ...this.styles,
      background: theme.background,
      color: theme.foreground
    };

    return (
      <div style={styles}>
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
                resetTasks={reset}
                onResetDone={this.handleResetDone}
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
                onOvertimeDone={this.handleOvertime}
              />
              <Summary
                taskCount={taskCount}
                pomodoroCount={pomodoroCount}
                overtime={this.mapOvertimeToString(overtime)}
                showOvertime={Session.OVERTIME}
                onResetClicked={this.handleReset}
              />
            </RightToTopCol>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
