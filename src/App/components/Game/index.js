import React, { useState } from "react";
import Board from "../Board";

/*
    Used ant design for the player cards as well as the play again button.
    Mostly to practise and look into it as Limio uses this UI framework.
*/
import { Card, Button } from "antd";
const { Meta } = Card;

/**
 * A game of tic-tac-toe.
 */

const Game = () => {
  const [gameHistory, setGameHistory] = useState([
    { squares: Array(9).fill(null) },
  ]); // Start of game
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [showHighlight, setShowHighlight] = useState(false);
  const [player, setPlayer] = useState({
    startGame: true,
    player1: {
      score: 0,
      name: "",
      value: "X",
    },
    player2: {
      score: 0,
      name: "",
      value: "O",
    },
  });

  //Had this part added to the player object so that the players would not keep getting prompted for their names unless they refresh the application.
  if (player.startGame) {
    const player1 = prompt("What is your name player 1 ?");
    const player2 = prompt("What is your name player 2 ?");
    setPlayer({
      ...player,
      player1: { ...player.player1, name: player1 },
      player2: { ...player.player2, name: player2 },
      startGame: false,
    });
  }

  const calculateWinner = (squares) => {
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
      /*
                Interesting way of finding the winning by destructuring the array of arrays.
                a = 0, b = 1, c = 2 on the first iteration.
            */
      const [a, b, c] = lines[i];

      //Checking the values if x == x at the possible winning positions (lines)
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        /*
                    I wanted the function to return the player name rather than just the value
                    which will then be used in the status message.
                */
        let winningPlayer =
          player.player1.value === squares[a]
            ? player.player1.name
            : player.player2.name;

        return winningPlayer;
      }
    }

    return null;
  };

  const handleClick = (i) => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    /*
            Had to figure out why were are checking for squares[i].
            Found out that if the square is occupied then I dont want to continue with the below code.
            As that would lead to a bad user experience (one could keep clicking on the same square and change the values).
        */
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setGameHistory([...history, { squares }]);
    setStepNumber(history.length);
    setXisNext(!xIsNext);

    if (calculateWinner(squares)) {
      /*
                Change the highlight true to indicate the last one to be changed.
                Reason why its here and not above the previous if is because it would be 1 behind.
            */
      setShowHighlight(true);

      /*
                The below code is responsible for the leaderboard tracking.
                Using the spread operator to make sure that the other properties remain the same and that I only update the score property.
            */
      if (player.player1.name === calculateWinner(squares)) {
        setPlayer({
          ...player,
          player1: { ...player.player1, score: player.player1.score + 1 },
        });
      } else {
        setPlayer({
          ...player,
          player2: { ...player.player2, score: player.player2.score + 1 },
        });
      }

      return;
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const current = gameHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  let moves = gameHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";

    return (
      <li key={move}>
        {/*
                    Bellow code is how we highlight the winning move button.
                    By having a condition (showHighlight which becomes truthy after calculatewinner function has found a winner).
                    And use the gamehistory length to make sure its the last move that gets highlighted.
                */}
        <button
          style={{
            backgroundColor:
              showHighlight && gameHistory.length - 1 == move ? "beige" : "",
          }}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <h2>Lets play Noughts and Crosses</h2>
      <p>Win games to upgrade your robo pic! :)</p>
      <div className="leaderboard">
        <div className="player1">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                width="150px"
                height="150px"
                alt="Toggling through random robot pics"
                src={`https://robohash.org/${player.player1.score}`}
              />
            }
          >
            <Meta
              title={`Player 1: ${player.player1.name}`}
              description={`Score: ${player.player1.score}`}
            />
          </Card>
        </div>
        <div className="player2">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                width="150px"
                height="150px"
                alt="Toggling through random robot pics"
                src={`https://robohash.org/${player.player2.score}`}
              />
            }
          >
            <Meta
              title={`Player 2: ${player.player2.name}`}
              description={`Score: ${player.player2.score}`}
            />
          </Card>
        </div>
      </div>
      <div className="top">
        <div className="game-board">
          <Board
            squares={current.squares}
            showHighlight={showHighlight}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      <div className="bottom">
        <Button
          type="primary"
          block
          onClick={() => {
            /*
                        Below code is to reset the game after there is a winner
                        and keep track of the scores -> leaderboard.
                    */
            const revert = [{ squares: Array(9).fill(null) }];
            setGameHistory(revert);
            setStepNumber(0);
            setXisNext(true);
            setShowHighlight(false);
          }}
        >
          Play again ?
        </Button>
      </div>
    </div>
  );
};

export default Game;
