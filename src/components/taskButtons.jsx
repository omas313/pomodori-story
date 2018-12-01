import React, { Component } from 'react';
import { Button } from 'reactstrap';

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

export default TaskButtons;
