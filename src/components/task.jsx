import React, { Component } from 'react';
import { Row, Col, ListGroupItem, Badge, Button } from 'reactstrap';
import TaskEdit from './taskEdit';

class Task extends Component {
  state = {
    editing: false,
    newName: ''
  };

  handleEditClick = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleEditFinish = (id, name) => {
    const { onEdit } = this.props;
    onEdit(id, name);
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
              <TaskEdit
                task={task}
                onChange={this.handleChange}
                onEdit={this.handleEditFinish}
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
            {editing ? (
              <Button
                size="sm"
                color="primary"
                outline
                onClick={() => this.handleEditFinish(task._id, newName)}
              >
                <img
                  src="./img/check_mark.svg"
                  alt="Done"
                  className="action-button"
                />
              </Button>
            ) : (
              <Button
                size="sm"
                color="primary"
                outline
                onClick={this.handleEditClick}
              >
                <img
                  src="./img/edit.svg"
                  alt="Edit"
                  className="action-button"
                />
              </Button>
            )}
            <Button
              size="sm"
              color="primary"
              outline
              onClick={() => onDelete(task)}
            >
              <img
                src="./img/delete.svg"
                alt="Delete"
                className="action-button"
              />
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

export default Task;
