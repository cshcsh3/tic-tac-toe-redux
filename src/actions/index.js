export const MAKE_MOVE = "MAKE_MOVE";
export const LIST_ORDER = "LIST_ORDER";
export const JUMP_TO = "JUMP_TO";

export function makeMove(i) {
	return {
		i,
		type: MAKE_MOVE,
		history: [{
			index: 0,
			position: [],
			squares: []
		}],
		step: 0,
		xIsNext: true
	}
}

export function listOrder() {
	return {
		type: LIST_ORDER,
		order: true
	}
}

export function jumpTo(index) {
	return {
		type: JUMP_TO,
		index,
		step: 0,
		xIsNext: true,
	}
}