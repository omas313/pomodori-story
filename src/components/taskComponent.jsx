import React, { Component } from 'react';
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

  getBadgeColor = () =>
    this.props.task.pomodori === 0 ? 'secondary' : 'primary';

  render() {
    const { isEditing, newName } = this.state;
    const { task, isActive, onSetActive, onDelete } = this.props;

    const taskClasses = 'task' + (isActive ? ' active' : ' inactive');

    return (
      <ListGroupItem className={taskClasses}>
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
            <Badge color={this.getBadgeColor()} pill>
              {task.pomodori}
            </Badge>
          </Col>
          {isActive && (
            <Col md="3" xs="3" className="text-right action-buttons">
              <TaskButtons
                task={task}
                newName={newName}
                isEditing={isEditing}
                onSubmit={this.handleEditSubmit}
                onEditClick={this.handleEditClick}
                onDelete={onDelete}
              />
            </Col>
          )
          }
        </Row>
      </ListGroupItem>
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
