import React, { Component } from 'react';
import './App.css';
import store from "../store";
import Board from "../components/Board";
import Analytics from "../components/Analytics";
import * as actions from "../actions";
import { calculateWinner } from "../shared/calculateWinner";
import { connect } from "react-redux";

class App extends Component {

  handleClick(i) {
    store.dispatch(actions.makeMove(i));
  }

  handleList() {
    store.dispatch(actions.listOrder());
  }
   
  jumpTo(index) {
    store.dispatch(actions.jumpTo(index));
  }

  render() {
    const { analytics } = this.props;

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
          <p>Latest 10 winnings</p>
          <Analytics analytics={analytics}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    analytics: state.analytics
  }
}

export default connect(mapStateToProps)(App);
