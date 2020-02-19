import React from 'react';
import Square from './Square';



class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    // Create a board 4*4 and fill it with square elements
    renderBoard() {
        const rows = Array(4);
        for (let i = 0;i < rows.length;i++) {
            let cells = [];
            for (let j = 0;j < rows.length;j++) {
                cells.push(this.renderSquare(rows.length * i + j));
            }
            rows[i] = <div className="board-row" key={i}>{cells}</div>;
        }
        return rows;
    }

    renderSquare(i) {
        return (
            <Square
                key={i}
            />
        );
    }

    render() {
        const board = this.renderBoard();
        return (
            <div>{board}</div>
        );
    }
}

export default Board;