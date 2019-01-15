import * as actionTypes from "../actions";
import { calculateWinner } from "../shared/calculateWinner";

const initialState = {
	history: [{
		index: 0,
		position: Array(2).fill(null),
		squares: Array(9).fill(null)
	}],
	order: true,
	step: 0,
	xIsNext: true,
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.MAKE_MOVE:
			const { i } = action;

			let step = state.step;
			let xIsNext = state.xIsNext;

			let index = step + 1;
			let history = state.history.slice(0, step + 1);
			let current = history[history.length - 1];
			let squares = current.squares.slice();
			let position = current.position.slice();

			if (calculateWinner(squares) || squares[i]) {
     			 return {
     			 	...state
     			 };
    		}
			
		    if (i >= 0 && i < 3) {
		      position[0] = i;
		      position[1] = 0;
		    } 
		    else if (i >= 3 && i < 6) {
		      position[0] = i - 3;
		      position[1] = 1;
		    }
		    else if (i >= 6 && i < 9) {
		      position[0] = i - 6;
		      position[1] = 2;
		    }
		    
			if (xIsNext) {
				squares[i] = "X";
			} else {
				squares[i] = "O"
			}

			xIsNext = !xIsNext;
			step = step + 1;

			return {
				...state,
				step: step,
				xIsNext: xIsNext,
				history: history.concat([{
							squares: squares,
							position: position,
							index: index
						}])
			}

		case actionTypes.LIST_ORDER:
			let order = state.order;
			order = !order;

			return {
				...state,
				order: order
			}

		case actionTypes.JUMP_TO:
			xIsNext = (action.index%2 === 0);

			return {
				...state,
				step: action.index,
				xIsNext: xIsNext
			}

		default:
			return state;
	}
} 