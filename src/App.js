import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let def = [
    ["k1", "k2", "k3"],
    ["k4", "k5", "k6"],
    ["k7", "k8", "k9"],
  ];
  const [positions, setPositions] = useState(def);
  const [scores, setScores] = useState([0, 0]);
  const [turn, setTurn] = useState("X");
  const [design, setDesign] = useState(turn === "X" ? "blue" : "red");
  const [winner, setWinner] = useState("");

  // constantly updates positions state 
  const handlePositionChange = (e) => {
    let temp = positions;
    let targetId = e.target.id;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (temp[i][j] === targetId) {
          temp[i][j] = turn;
        }
      }
    }
    setPositions(temp);
  };

  // Handles turn changes after successful click
  const handleTurnChange = () => {
    if (turn === "X") {
      setTurn("O");
      setDesign("red");
    } else {
      setTurn("X");
      setDesign("blue");
    }
  };


  const handleClick = (e) => {
    handlePositionChange(e);
    if (!e.target.classList.contains("chosen")) {
      e.target.innerText = turn;
      e.target.className = "table__data chosen " + design;
      handleTurnChange();
    }
  };

  // in every turn change checks weather either side won 
  // only works with rows
  const checkWinner = (pos) => {
    let temp = scores;
    pos.map((row) => {
      if ((row[0] === row[1]) & (row[1] === row[2])) {
        if (turn === "X") {
          setWinner("O");
          temp[1] = temp[1] + 1;
          setScores(temp);
        } else {
          setWinner("X");
          temp[0] = temp[0] + 1;
          setScores(temp);
        }
        document.querySelectorAll(".table__data").forEach((cell) => {
          cell.classList.add("chosen");
        });
      }
    });
  };

  // Turns columns into rows so that checkWinner func works with columns too
  const columnChanger = (pos) => {
    let tempAll = [];
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    for (let i = 0; i < 3; i++) {
      temp1.push(pos[i][0]);
      temp2.push(pos[i][1]);
      temp3.push(pos[i][2]);
    }
    tempAll.push(temp1, temp2, temp3);
    return tempAll;
  };

  // Turns diogalas into rows so that checkWinner func works with dioaganals too
  const dioganalChanger = (pos) => {
    let tempAll = [];
    let temp1 = [];
    let temp2 = [];
    let j = 2;
    for (let i = 0; i < 3; i++) {
      temp1.push(pos[i][i]);
      temp2.push(pos[i][j]);
      j--;
    }
    tempAll.push(temp1, temp2);
    return tempAll;
  };

  // lets the playes play again
  const tryAgain = () => {
    setPositions(def);
    setWinner("");
    document.querySelectorAll(".table__data").forEach((cell) => {
      cell.innerText = "";
      cell.className = "table__data";
    });
  };

  useEffect(() => {
    let temp = positions;
    checkWinner(temp);
    checkWinner(columnChanger(temp));
    checkWinner(dioganalChanger(temp));
  }, [positions, turn]);

  return (
    <div className="App">
      <table className='scores-table'>
        <tbody>
          <tr className='scores-row'>
            <th className='scores-display border-bottom blue'>X</th>
            <th className='scores-display border-bottom red'>O</th>
          </tr>
          <tr className='scores-row'>
            <td className='scores-display border-top blue'>{scores[0]}</td>
            <td className='scores-display border-top red'>{scores[1]}</td>
          </tr>
        </tbody>
      </table>
      {winner ? (
        <h1 className="winner_display">{winner} Won</h1>
      ) : (
        <h1>{turn}'s turn</h1>
      )}

      <table className="table">
        <tbody>
          <tr className="table__row">
            <td id="k1" onClick={handleClick} className="table__data"></td>
            <td id="k2" onClick={handleClick} className="table__data"></td>
            <td id="k3" onClick={handleClick} className="table__data"></td>
          </tr>

          <tr className="table__row">
            <td id="k4" onClick={handleClick} className="table__data"></td>
            <td id="k5" onClick={handleClick} className="table__data"></td>
            <td id="k6" onClick={handleClick} className="table__data"></td>
          </tr>

          <tr className="table__row">
            <td id="k7" onClick={handleClick} className="table__data"></td>
            <td id="k8" onClick={handleClick} className="table__data"></td>
            <td id="k9" onClick={handleClick} className="table__data"></td>
          </tr>
        </tbody>
      </table>

      <button onClick={tryAgain}>{winner ? "Try Again" : "Clear Table"}</button>

      <div>&copy; Created by <a href='https://github.com/foziljon02'>Foziljon</a></div>
    </div>
  );
}

export default App;
