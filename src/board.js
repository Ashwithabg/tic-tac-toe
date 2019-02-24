import React from 'react';
import Square from './square';

const boardSize = 3;

class Board extends React.Component {
    renderSquare(position, winner) {
        return (
            <Square
                key = {"square"+ position}
                winner = {winner}
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
                const winner = this.props.winner && this.props.winner.includes(index);
                squares[j] = this.renderSquare(index, winner)
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