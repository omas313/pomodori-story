/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { ThemeContext } from '../context/themeContext';

const Summary = ({ taskCount, pomodoroCount, overtime, showReset, showOvertime, onResetClicked }) => (
  <ThemeContext.Consumer>
    {({ theme, _ }) => {
      const styles = css`
        border-top: 1px solid ${theme.foreground};
        border-bottom: 1px solid ${theme.foreground};
        padding: 0.6rem;
        margin: 1rem 0 !important;

        .reset {
          display: inline-block;
          color: ${theme.primary}
          
        }
        .reset:hover {
          cursor: pointer;
          color: ${theme.tertiary}
        }
      `;
      return (
        <div css={styles}>
          <Row>
            <Col className="text-center">
              <p className="text-bold">Tasks</p>
              <p>{taskCount}</p>
            </Col>
            {showReset && (
              <Col sm="3" className="text-center">
                <p className="reset" onClick={onResetClicked}>RESET</p>
              </Col>
            )}
            <Col className="text-center">
              <p className="text-bold">Pomodori</p>
              <p>{pomodoroCount}</p>
            </Col>
          </Row>
          {showOvertime && (
            <Row>
              <Col className="text-center">
                <p className="text-bold">Overtime (P)</p>
                <p id="summary-overtime-pomodoro">{overtime.pomodori}</p>
              </Col>
              <Col className="text-center">
                <p className="text-bold">Overtime (B)</p>
                <p id="summary-overtime-breaks">{overtime.breaks}</p>
              </Col>
            </Row>
          )}
        </div>
      );
    }}
  </ThemeContext.Consumer>
);


Summary.propTypes = {
  taskCount: PropTypes.number.isRequired,
  pomodoroCount: PropTypes.number.isRequired,
  overtime: PropTypes.object.isRequired,
  showReset: PropTypes.bool.isRequired,
  showOvertime: PropTypes.bool.isRequired,
  onResetClicked: PropTypes.func.isRequired
};

export default Summary;
