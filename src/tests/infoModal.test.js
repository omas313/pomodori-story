import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import InfoModal from '../components/infoModal';

configure({ adapter: new Adapter() });

describe('InfoModal', () => {
  let infoModal = null;

  beforeEach(() => {
    infoModal = shallow(<InfoModal isOpen={false} onToggle={() => {}} />);
  });

  it('renders a Modal as root the element', () => {
    const modal = infoModal.find(Modal);
    expect(modal).toEqual(infoModal.first());
    expect(modal.length).toEqual(1);
  });

  it("passes isOpen prop to Modal's isOpen prop", () => {
    infoModal.setProps({ isOpen: true });

    const modal = infoModal.find(Modal);
    expect(modal.props().isOpen).toBeTruthy();
  });

  it("passes onToggle prop to Modal's toggle prop", () => {
    const onToggle = jest.fn();
    infoModal.setProps({ onToggle });

    const modal = infoModal.find(Modal);
    expect(modal.props().toggle).toEqual(onToggle);
  });

  it('sets info-modal class on Modal', () => {
    const modal = infoModal.find(Modal);
    expect(modal.hasClass('info-modal')).toBeTruthy();
  });

  it('renders a ModalHeader', () => {
    expect(infoModal.find(ModalHeader).length).toEqual(1);
  });

  it("passes onToggle prop to ModalHeader's toggle prop", () => {
    const onToggle = jest.fn();
    infoModal.setProps({ onToggle });

    const modalHeader = infoModal.find(ModalHeader);
    expect(modalHeader.props().toggle).toEqual(onToggle);
  });

  it('renders a ModalBody', () => {
    expect(infoModal.find(ModalBody).length).toEqual(1);
  });
});
