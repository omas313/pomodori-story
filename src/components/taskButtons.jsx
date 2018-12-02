import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { taskType } from './../types/index';

class TaskButtons extends Component {
  renderActionButtons() {
    const { task, onDelete, onButtonClick } = this.props;

    return (
      <React.Fragment>
        <Button
          className="action-button"
          size="sm"
          color="primary"
          outline
          onClick={onButtonClick}
        >
          <img src="./img/edit.svg" alt="Edit" />
        </Button>
        <Button
          className="action-button"
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
    const { editing } = this.props;

    return editing ? this.renderSubmitEditButton() : this.renderActionButtons();
  }
}

// TODO: change prop names onEditClick, isEditing
TaskButtons.propTypes = {
  task: taskType,
  newName: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TaskButtons;
