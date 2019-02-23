import React from 'react';
import Square from './square';

class Board extends React.Component {
    renderSquareWith(i) {
        return <Square value={i}/>
    }

    render() {
        const status = "next Player: X";

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