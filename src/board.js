import React from 'react';
import Square from './square';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    squareState = () => (this.state.xIsNext ? 'X' : 'O')

    renderSquareWith(position) {
        return <Square
            value={this.state.squares[position]}
            onClick={() => this.handleClick(position)}
        />
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick = (position) => {
        const squares = this.state.squares.slice();
        if (this.calculateWinner(this.state.squares) || squares[position]) {
            return
        }

        squares[position] = this.squareState();
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    };

    render() {
        let status;
        const winner = this.calculateWinner(this.state.squares);
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + this.squareState();
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquareWith(0)}
                    {this.renderSquareWith(1)}
                    {this.renderSquareWith(2)}
                </div>

                <div className="board-row">
                    {this.renderSquareWith(3)}
                    {this.renderSquareWith(4)}
                    {this.renderSquareWith(5)}
                </div>

                <div className="board-row">
                    {this.renderSquareWith(6)}
                    {this.renderSquareWith(7)}
                    {this.renderSquareWith(8)}
                </div>

            </div>
        )
    }
}

export default Board;