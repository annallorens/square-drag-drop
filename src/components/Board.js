import React from 'react';
import Square from './Square';



class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            backgroundColor: [
                '#ffcc00', '#cc6600', '#ffcc99', '#ff9999',
                '#ff4da6', ' #bf4080', '#0089BA', '#cc9900',
                '#4FFBDF', '#845EC2', '#B39CD0', '#008F7A',
                '#0089BA', '#00C9A7', '#D5CABD', '#F9F871'
            ],
        };
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
                backgroundColor={this.state.backgroundColor[i]}
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