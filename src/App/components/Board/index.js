import React from "react";
import PropTypes from 'prop-types';

import Square from '../Square';

/**
 * A board for the game of tic-tac-toe.  A 3x3 square.
 */
const Board = ({onClick, squares, showHighlight}) => {
    const renderSquare = (i) => (
        <Square
            showHighlight={showHighlight}
            value={squares[i]}
            onClick={() => onClick(i)}
        />
    );

    return (
        <div>
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
        </div>
    )
};

Board.propTypes = {
    /**
     *  The 1..9 array of squares to display
     */
    squares: PropTypes.array.isRequired,

    /**
     *  The handler for when a square is clicked
     */
    onClick: PropTypes.func
};

export default Board;