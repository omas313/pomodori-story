import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroupItem, Badge } from 'reactstrap';
import TaskInput from './TaskInput';
import TaskButtons from './taskButtons';
import { taskType } from './../types/index';

class Task extends Component {
  state = {
    editing: false,
    newName: ''
  };

  handleEditClick = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleEditSubmit = name => {
    const { onEdit, task } = this.props;
    onEdit(task._id, name);
    this.setState({ editing: false });
  };

  handleChange = newName => {
    this.setState({ newName });
  };

  getBadgeColor = () => (this.props.task.count === 0 ? 'secondary' : 'primary');

  render() {
    const { editing, newName } = this.state;
    const { task, active, onSetActiveTask, onDelete } = this.props;

    const taskClasses = 'task' + (active ? ' active' : '');

    return (
      <ListGroupItem className={taskClasses}>
        <Row>
          <Col
            className="w-100 clickable task-name"
            onClick={() => onSetActiveTask(task)}
          >
            {editing ? (
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
              {task.count}
            </Badge>
          </Col>
          <Col md="3" xs="3" className="text-right action-buttons">
            <TaskButtons
              task={task}
              newName={newName}
              editing={editing}
              onSubmit={this.handleEditSubmit}
              onButtonClick={this.handleEditClick}
              onDelete={onDelete}
            />
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

// TODO: change to isActive, onSetActive
Task.propTypes = {
  task: taskType.isRequired,
  active: PropTypes.bool,
  onSetActiveTask: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Task;
