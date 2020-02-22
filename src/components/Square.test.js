import React from 'react';
import ReacDOM from 'react-dom';
import Square from './Square';

import { render, fireEvent, cleanup, createEvent, act } from "@testing-library/react";

afterEach(cleanup);
jest.useFakeTimers();

it('renders render square correctly', () => {
  const div = document.createElement("div");
  ReacDOM.render(<Square />, div);
});

describe('when drag starts', () => {
  it('should set the data transfer and add opacity to square', () => {
    const { getByTestId } = render(<Square />);
    const element = getByTestId('square');
    const mockSetData = jest.fn();
    const mockDragStartEvent = createEvent.dragStart(element, { target: { id: '1' } })
    // define 'dataTransfer' to dragStart event
    Object.defineProperty(mockDragStartEvent, 'dataTransfer', {
      value: {
        setData: mockSetData
      }
    });

    fireEvent(element, mockDragStartEvent);

    // move ahead in time
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(mockSetData).toHaveBeenCalled();
    expect(element.style.opacity).toEqual('0.1');
  });
});

describe('when drag enter', () => {
  it('should add the class "over" to the square', () => {
    const { getByTestId } = render(<Square />);
    const element = getByTestId('square');
    expect(element.classList.contains('over')).toBeFalsy();

    fireEvent.dragEnter(element);

    expect(element.classList.contains('over')).toBeTruthy();
  });
});


describe('when drag leaves', () => {
  it('should remove the class "over" to the square', () => {
    const { getByTestId } = render(<Square className='over' />);
    const element = getByTestId('square');
    expect(element.classList.contains('over')).toBeTruthy();

    fireEvent.dragLeave(element);

    expect(element.classList.contains('over')).toBeFalsy();
  });
});

describe('when drag ends', () => {
  it('should remove opacity to square', () => {
    const { getByTestId } = render(<Square />);
    const element = getByTestId('square');
    element.style.opacity = '0.1';

    fireEvent.dragEnd(element);

    expect(element.style.opacity).toEqual('');
  });
});

describe('when dragging over', () => {
  it('should prevent default', () => {
    const { getByTestId } = render(<Square />);
    const element = getByTestId('square');
    const evt = createEvent.dragOver(element, { target: { id: '1' } });
    spyOn(evt, 'preventDefault');

    fireEvent(element, evt);

    expect(evt.preventDefault).toHaveBeenCalled();
  });

  it('should not prevent default', () => {
    const { getByTestId } = render(<Square />);
    const element = getByTestId('square');
    const evt = createEvent.dragOver(element);
    spyOn(evt, 'preventDefault');

    fireEvent(element, evt);

    expect(evt.preventDefault).not.toHaveBeenCalled();
  });
});