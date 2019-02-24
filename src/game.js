import React from 'react';
import Board from "./board"
import {calculateWinner, SquareCoordinates} from "./utils";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}],
            stepNumber: 0,
            xIsNext: true,
            isMovesReverseSorted: false
        };
    }

    nextSquareState = () => this.state.xIsNext ? "X" : "O";

    toggleSort = () => this.setState({isMovesReverseSorted: !this.state.isMovesReverseSorted});

    jumpTo = (step) => this.setState({ stepNumber: step, xIsNext: (step % 2) === 0 });

    handleClick = (squarePosition) => {
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
    };

    getHistoriesButtons = (history) => {
        return history.map((step, move) => {
            let desc;

            if (move === 0) {
                desc = 'Go to game start'
            }else if (move === this.state.stepNumber) {
                desc = <b>{'Go to move #' + move + ":" + step.coordinates} </b>
            }else {
                desc = 'Go to move #' + move + ":" + step.coordinates
            }

            return (
                <li key={move}>
                    <button className="moves" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
    };

    getStatus = (winner, history) => {
        let status;

        if (winner) {
            status = "Winner: " + winner
        } else if (history.length === 10) {
            status = 'No one wins!!'
        } else {
            status = "Next player: " + this.nextSquareState()
        }
        return status;
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status = this.getStatus(winner, history);
        let isReverseSorted = this.state.isMovesReverseSorted;
        const moves = this.getHistoriesButtons(history);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>

                <div className="game-info">
                    <div className="status">{status}</div>
                    <div>
                        <p> Sort: {isReverseSorted ? 'Decending': 'Acending'}</p>
                        <button className="sort" onClick={this.toggleSort}>sort</button>

                        <ol reversed={isReverseSorted ? 'reversed' : ''}>
                            {isReverseSorted ? moves.reverse() : moves}
                        </ol>
                    </div>

                </div>
            </div>
        );
    }
}

export default Game;