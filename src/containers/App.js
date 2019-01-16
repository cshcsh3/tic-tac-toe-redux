import React, { Component } from 'react';
import './App.css';
import store from "../store";
import Board from "../components/Board";
import Analytics from "../components/Analytics";
import { makeMove, listOrder, jumpTo } from "../actions";
import { calculateWinner } from "../shared/calculateWinner";
import { writeAnalytics } from "../db/analytics";

class App extends Component {
  handleClick(i) {
    store.dispatch(makeMove(i));
  }

  handleList() {
    store.dispatch(listOrder());
  }
   
  jumpTo(index) {
    store.dispatch(jumpTo(index));
  }

  weHaveAWinner(winner) {
    writeAnalytics(winner[0], winner[1].toString());
  }

  render() {
    const state = store.getState();
    let history = state.history;
    let current = history[state.step];
    let winner = calculateWinner(current.squares);
    let order = state.order;

    // Do not mutate directly
    const sorter = history.slice();

    const moves = sorter
    .sort((a, b) => order ? a.index - b.index : b.index - a.index)
    .map((step, move) => {
      const desc = step.index ?
            'Go to move #' + step.index + ' (' + step.position + ')': 
            'Go to game start';
      
      return (
          <li key={move}>
          <button style={ (step.index === state.step) ? { fontWeight: 'bold' } : {fontWeight: 'normal'} } 
                  onClick={() => this.jumpTo(step.index)}>
            {desc}
          </button>
          </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner[0];
      this.weHaveAWinner(winner);
    } else {
      if (!current.squares.includes(null)) {
        status = 'Draw';
      } else {
        status = "Next player: " + (state.xIsNext ? "X" : "O");
      }
    }

    let listOrder = (state.order) ? "Order move list to be DESC" : "Order move list to be ASC";

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} highlight={winner ? winner[1] : ""} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          
          <button onClick={() => this.handleList()}>{listOrder}</button>
          <ol>{moves}</ol>
        </div>
        <div className="game-analytics">
          <Analytics />
        </div>
      </div>
    );
  }
}

export default App;
