import React from 'react';
import Board from "./board"

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    nextSquareState = () => {
        return this.state.xIsNext ? "X" : "O"
    };

    handleClick(squarePosition) {
        let initialStep = 0;
        let nextStep = this.state.stepNumber + 1;
        const history = this.state.history.slice(initialStep, nextStep);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[squarePosition]) {
            return;
        }

        squares[squarePosition] = this.nextSquareState();
        this.setState({
            history: history.concat([{
                squares: squares,
                coordinates: SquareCoordinates(squarePosition)}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status = winner ? "Winner: " + winner : "Next player: " + this.nextSquareState();

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move + ":" + step.coordinates : 'Go to game start';
            return (
                <li key={move}>
                    <button className="moves" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;

function calculateWinner(squares) {
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

function SquareCoordinates(squareStep) {
    const coordinates = {
        0: '(1, 1)',
        1: '(1, 2)',
        2: '(1, 3)',
        3: '(2, 1)',
        4: '(2, 2)',
        5: '(2, 3)',
        6: '(3, 1)',
        7: '(3, 2)',
        8: '(3, 3)',
    };
    return coordinates[squareStep];
}