import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor:
                [
                    '#001f3f', '#0074D9', '#7FDBFF', '#39CCCC',
                    '#3D9970', '#2ECC40', '#01FF70', '#FFDC00',
                    '#FF851B', '#FF4136', '#85144b', '#F012BE',
                    '#B10DC9', '#111111', '#AAAAAA', '#DDDDDD'
                ],
        };

        this.dragOver = e => {
            // only allow drop in square components
            if (e.target.id) {
                e.preventDefault();
            }
        }

        this.onDrop = (e) => {
            const dropSquare = e.target;
            const dragSquareId = e.dataTransfer.getData('dragSquareId');

            // remove highlight of drop square when square drops on it
            dropSquare.classList.remove('over');

            this.swapColors(dragSquareId, dropSquare.id);
        }
    }

    // swap 'backgoungColor' of dropped and dragged squares
    swapColors(from, to) {
        const backgroundColor = this.state.backgroundColor.slice();
        [backgroundColor[from], backgroundColor[to]] = [backgroundColor[to], backgroundColor[from]];
        this.setState({
            backgroundColor: backgroundColor,
        });
    }

    // create a board 4*4 and fill it with square components
    renderBoard() {
        const rows = Array(4);
        for (let i = 0;i < rows.length;i++) {
            let square = [];
            for (let j = 0;j < rows.length;j++) {
                square.push(this.renderSquare(rows.length * i + j));
            }
            rows[i] = <div className="board-row" key={i}>{square}</div>;
        }
        return rows;
    }

    renderSquare(i) {
        return (
            <Square
                key={i}
                id={i}
                className='square'
                draggable='true'
                backgroundColor={this.state.backgroundColor[i]}
            />
        );
    }

    render() {
        const board = this.renderBoard();
        return (
            <div onDrop={this.onDrop} onDragOver={this.dragOver}>
                {board}
            </div>
        );
    }
}

export default Board;