/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Component } from 'react';
import { ThemeContext } from '../context/themeContext';
import PropTypes from 'prop-types';
import { Row, Col, ListGroupItem, Badge } from 'reactstrap';
import TaskInput from './taskInput';
import TaskButtons from './taskButtons';
import { taskType } from '../types/index';

class TaskComponent extends Component {
  state = {
    isEditing: false,
    newName: ''
  };

  handleEditClick = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  };

  handleEditSubmit = name => {
    const { task, onEdit } = this.props;
    onEdit(task._id, name);
    this.setState({ isEditing: false });
  };

  handleChange = newName => {
    this.setState({ newName });
  };

  getBadgeStyles = theme => {
    const baseStyles = css`
      transition: background-color 0.3s;
    `;
    const colorStyles = this.props.task.pomodori === 0 ?
      css`
        background-color: ${theme.background} !important;
        color: ${theme.foreground} !important;
      `
      : css`
        background-color: ${theme.primary} !important;
        color: ${theme.foreground} !important;
      `;

    return [baseStyles, colorStyles]
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, _ }) => {

          const { isEditing, newName } = this.state;
          const { task, isActive, onSetActive, onDelete } = this.props;

          const styles = css`
            color: ${theme.foreground} !important;
            border-radius: 10px !important;
            transition: background-color 0.3s, border-color 0.3s, display 0.3s;
            animation: fadeIn 0.3s ease-in 0s 1;
            -webkit-animation: fadeIn 0.3s ease-in 0s 1;
            
            ${isActive ? `
              background-color: ${theme.background} !important;
              border-top: 2px solid ${theme.primary} !important;
              border-bottom: 2px solid ${theme.primary} !important;
              opacity: 1 !important;
            ` : `
              background-color: ${theme.controlBackground} !important;
              border-color: ${theme.primaryDarker} !important;
              margin-left: 3rem;
              margin-right: 3rem;
              opacity: 0.5;
            `}

            &:hover {
              background-color: ${theme.primary} !important;
            }
            
            & .task-name {
              color: ${theme.foreground};
              overflow: auto;
              font-size: 1.1rem;
            }

            & .action-button img {
              max-width: 20px;
            }
            
            & .task-button {
              outline: none !important;
              border: none !important;
            }
            
            & .btn-outline-primary {
              color: ${theme.foreground} !important;
              border-color: ${theme.primaryDarker} !important;
            }
            & .btn-outline-primary:hover, & .btn-outline-primary:active {
              background-color: ${theme.foreground} !important;
            }
          `;

          return (
            <ListGroupItem css={styles}>
              <Row>
                <Col
                  className="w-100 clickable task-name"
                  onClick={() => onSetActive(task)}
                >
                  {isEditing ? (
                    <TaskInput
                      text={task.name}
                      onChange={this.handleChange}
                      onSubmit={this.handleEditSubmit}
                    />
                  ) : (
                      task.name
                    )}
                </Col>
                <Col md="2" xs="1">
                  <Badge css={this.getBadgeStyles(theme)} pill>
                    {task.pomodori}
                  </Badge>
                </Col>
                <Col md="3" xs="3" className="text-right action-buttons">
                  <TaskButtons
                    task={task}
                    newName={newName}
                    isEditing={isEditing}
                    hideEditButton={!isActive}
                    onSubmit={this.handleEditSubmit}
                    onEditClick={this.handleEditClick}
                    onDelete={onDelete}
                  />
                </Col>
              </Row>
            </ListGroupItem>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

TaskComponent.propTypes = {
  task: taskType.isRequired,
  isActive: PropTypes.bool,
  onSetActive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TaskComponent;
