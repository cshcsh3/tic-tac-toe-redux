import React, { Component } from "react";
import Square from "../components/Square";

class Board extends Component {
	renderSquare(i) {
    return <Square value={this.props.squares[i]} highlight={this.props.highlight.includes(i) ? "winner-winner-chicken-dinner" : null} 
    onClick={() => this.props.onClick(i)}/>;
  }

  createSquares() {
    // Row
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let squares = [];
        
      // Column
      for (let j = 0; j < 3; j++) {
        const index = 3 * i + j;
        squares.push(this.renderSquare(index));
      }
      
      rows.push(<div className="board-row" key={i}>
          {squares.map((square, i) => <span key={i}>{square}</span>)}
        </div>);
    }
    
    return rows;
  }
  
  render() {
    return (
      <div>
        {this.createSquares()}
      </div>
    );
  }
}

export default Board;
