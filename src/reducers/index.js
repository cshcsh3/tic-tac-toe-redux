import * as actions from "../actions";
import { calculateWinner } from "../shared/calculateWinner";
import { writeAnalytics } from "../db/analytics"

const initialState = {
	history: [{
		index: 0,
		position: Array(2).fill(null),
		squares: Array(9).fill(null)
	}],
	order: true,
	step: 0,
	xIsNext: true,
	analytics: null, 
	winner: null
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case actions.MAKE_MOVE:
			const { i } = action;

			let step = state.step;
			let xIsNext = state.xIsNext;

			// Add 1 to index
			let index = step + 1;
			let history = state.history.slice(0, step + 1);
			let current = history[history.length - 1];
			let squares = current.squares.slice();
			let position = current.position.slice();

			// Do nothing and return state if winner exists or square already filled
			if (calculateWinner(squares) || squares[i]) {
     			 return {
     			 	...state
     			 };
    		}

			// Set position
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
		    
		    // Set square value
			if (xIsNext) {
				squares[i] = "X";
			} else {
				squares[i] = "O"
			}

			// Toggle next player
			xIsNext = !xIsNext;

			// Add 1 to step
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

		case actions.LIST_ORDER:
			// Toggle move list order
			let order = state.order;
			order = !order;

			return {
				...state,
				order: order
			}

		case actions.JUMP_TO:
			// Jump to appropriate step and ensure next player is correct
			xIsNext = (action.index%2 === 0);

			return {
				...state,
				step: action.index,
				xIsNext: xIsNext
			}

		case actions.READ_ANALYTICS:
			return { 
				...state, 
				analytics: action.analytics 
			}

		// case actions.WRITE_ANALYTICS:
		// 	return {
		// 		...state,
		// 		winner: action.winner
		// 	}

		default:
			return state;
	}
} 