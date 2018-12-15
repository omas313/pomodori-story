import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sound from './sound';

configure({ adapter: new Adapter() });

describe('Sound', () => {
  let sound = null;

  beforeEach(() => {
    sound = shallow(<Sound />);
  });

  it('renders audio as root element', () => {
    const audio = sound.find('audio');
    expect(audio).toEqual(sound.first());
  });

  it('sets src attr for audio', () => {
    const audio = sound.find('audio');

    expect(audio.props().src).toBeTruthy();
  });

  it('sets autoplay attr for audio', () => {
    const audio = sound.find('audio');

    expect(audio.props().autoPlay).toBeTruthy();
  });
});
