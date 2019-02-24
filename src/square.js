import React from 'react';

function Square(props) {
    return (
        <button className={"square " + (props.winner ? "winner" : null)} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;