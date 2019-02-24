import React from 'react';
import Square from './square';

const boardSize = 3;

class Board extends React.Component {
    renderSquare(position) {
        return (
            <Square
                value={this.props.squares[position]}
                onClick={() => this.props.onClick(position)}
            />
        );
    }

    render() {
        const rows = Array(boardSize);
        for (let i = 0; i < boardSize; i++) {
            const squares = Array(boardSize);

            for (let j = 0; j < boardSize; j++) {
                const index = i * boardSize + j;
                squares[j] = this.renderSquare(index)
            }

            rows[i] = (
                <div key={i} className="board-row">
                    {squares}
                </div>
            )
        }

        return (
            <div>{rows}</div>
        );
    }
}

export default Board;