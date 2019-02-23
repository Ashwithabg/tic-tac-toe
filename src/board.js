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

    renderSquareWith(position) {
        return <Square
            value={this.state.squares[position]}
            onClick={() => this.handleClick(position)}
        />
    }

    handleClick = (position) => {
        const squares = this.state.squares.slice();
        squares[position] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    };

    render() {
        const status = "next Player:" + (this.state.xIsNext ? 'X' : 'O');

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