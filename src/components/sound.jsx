import React, { Component } from 'react';

export default class Sound extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.audioRef.current.volume = 0.3;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.play && this.props.play)
      this.audioRef.current.play();
  }

  render() {
    return (
      <audio src="./sound/alert.mp3" ref={this.audioRef}>
        It looks like your browser doesn't support audio playback through html...
      </audio>
    );
  }
}
