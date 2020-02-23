import React from 'react';
import ReacDOM from 'react-dom';
import Board from './Board';
import Square from './Square';

import { render, fireEvent, cleanup, createEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';

afterEach(cleanup);

it('renders render square correctly', () => {
  const div = document.createElement('div');
  ReacDOM.render(<Board />, div);
});

describe('when testing the redered component', () => {
  const board = create(<Board />);
  const boardInstance = board.getInstance();
  const boardRoot = board.root;

  it('should render board 4*4 and fill it with square components', () => {
    expect(boardRoot.findAllByProps({ className: 'board-row' })).toHaveLength(4);
    expect(boardRoot.findAllByType(Square)).toHaveLength(16);
  });

  it('should update the state with the new backbgoundColors', () => {
    const backgroundColor = [
      '#001f3f', '#0074D9', '#7FDBFF', '#39CCCC',
      '#3D9970', '#2ECC40', '#01FF70', '#FFDC00',
      '#FF851B', '#FF4136', '#85144b', '#F012BE',
      '#B10DC9', '#111111', '#AAAAAA', '#DDDDDD'
    ];
    const backgroundColorExpected = [
      '#0074D9', '#001f3f', '#7FDBFF', '#39CCCC',
      '#3D9970', '#2ECC40', '#01FF70', '#FFDC00',
      '#FF851B', '#FF4136', '#85144b', '#F012BE',
      '#B10DC9', '#111111', '#AAAAAA', '#DDDDDD'
    ];

    expect(backgroundColor).toEqual(boardInstance.state.backgroundColor);

    boardInstance.swapColors(0, 1);

    expect(backgroundColorExpected).toEqual(boardInstance.state.backgroundColor);
  });

  it('should render a square', () => {
    const id = 1;
    const expectedProps = {
      id,
      backgroundColor: boardInstance.state.backgroundColor[id],
      className: 'square',
      draggable: 'true'
    }
    const square = boardInstance.renderSquare(id);

    expect(expectedProps).toEqual(square.props);
  });
});

describe('when dragging over the board component', () => {
  it('should prevent default', () => {
    const { getByTestId } = render(<Board />);
    const board = getByTestId('board');
    const evt = createEvent.dragOver(board, { target: { id: '1' } });
    spyOn(evt, 'preventDefault');

    fireEvent(board, evt);

    expect(evt.preventDefault).toHaveBeenCalled();
  });

  it('should not prevent default', () => {
    const { getByTestId } = render(<Board />);
    const board = getByTestId('board');
    const evt = createEvent.dragOver(board);
    spyOn(evt, 'preventDefault');

    fireEvent(board, evt);

    expect(evt.preventDefault).not.toHaveBeenCalled();
  });
});

describe('when dropping on the board component', () => {
  it('gets the dragging square id', () => {
    const { getByTestId } = render(<Board />);
    const board = getByTestId('board');
    const mockGetData = jest.fn(() => 3);
    const mockDragStartEvent = createEvent.drop(board);
    // define 'dataTransfer' to dragStart event
    Object.defineProperty(mockDragStartEvent, 'dataTransfer', {
      value: {
        getData: mockGetData
      }
    });

    fireEvent(board, mockDragStartEvent);

    expect(mockGetData).toHaveBeenCalledWith('dragSquareId');
  });
});