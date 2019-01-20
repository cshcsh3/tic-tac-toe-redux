export const MAKE_MOVE = "MAKE_MOVE";
export const LIST_ORDER = "LIST_ORDER";
export const JUMP_TO = "JUMP_TO";
export const READ_ANALYTICS = "READ_ANALYTICS";
export const READ_ANALYTICS_REQUEST = "READ_ANALYTICS_REQUEST";
export const WRITE_ANALYTICS_REQUEST ="WRITE_ANALYTICS_REQUEST";

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

export function readAnalytics(analytics) {
	return {
		type: READ_ANALYTICS,
		analytics
	}
}

export function readAnalyticsRequest() {
	return {
		type: READ_ANALYTICS_REQUEST,
		readRequest: true
	}
}

export function writeAnalyticsRequest(savedWinner) {
	return {
		type: WRITE_ANALYTICS_REQUEST,
		savedWinner
	}
}
