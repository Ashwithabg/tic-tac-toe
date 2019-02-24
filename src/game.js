import React from 'react';
import Board from "./board"
import {calculateWinner, SquareCoordinates} from "./utils";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}],
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
                coordinates: SquareCoordinates(squarePosition)
            }]),
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
        let status;

        if (winner) {
            status = "Winner: " + winner
        } else if (history.length === 10) {
            status = 'No one wins!!'
        } else {
            status = "Next player: " + this.nextSquareState()
        }

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