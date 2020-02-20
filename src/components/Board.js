import React from 'react';
import Square from './Square';



class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squareDragging: null,
            squareEntered: null,
        };

        this.onDrop = (e) => {
            e.preventDefault();
            const squareId = e.dataTransfer.getData('squareId');
            const card = document.getElementById(squareId);
            card.style.display = '';
            e.target.appendChild(card);
        }
    }

    // Create a board 4*4 and fill it with square elements
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
            />
        );
    }

    render() {
        const board = this.renderBoard();
        return (
            <div onDrop={this.onDrop}>
                {board}
            </div>
        );
    }
}

export default Board;