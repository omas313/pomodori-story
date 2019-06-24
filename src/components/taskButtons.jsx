import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { taskType } from './../types/index';

class TaskButtons extends Component {
  renderActionButtons() {
    const { task, onDelete, onEditClick } = this.props;

    return (
      <React.Fragment>
        <Button
          id="task-edit-button"
          className="action-button task-button"
          size="sm"
          color="primary"
          outline
          onClick={onEditClick}
        >
          <img src="./img/edit.svg" alt="Edit" />
        </Button>
        <Button
          id="task-delete-button"
          className="action-button task-button"
          size="sm"
          color="primary"
          outline
          onClick={() => onDelete(task)}
        >
          <img src="./img/delete.svg" alt="Delete" />
        </Button>
      </React.Fragment>
    );
  }

  renderSubmitEditButton() {
    const { newName, onSubmit } = this.props;

    return (
      <Button
        id="task-submit-edit-button"
        className="action-button"
        size="sm"
        color="primary"
        outline
        onClick={() => onSubmit(newName)}
      >
        <img src="./img/check-mark.svg" alt="Edit" />
      </Button>
    );
  }

  render() {
    const { isEditing } = this.props;
    return isEditing
      ? this.renderSubmitEditButton()
      : this.renderActionButtons();
  }
}

TaskButtons.propTypes = {
  task: taskType,
  newName: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TaskButtons;
