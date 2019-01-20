import { delay } from "redux-saga";
import { all, call, put, fork, takeLatest, take, select } from "redux-saga/effects";
import { readAnalytics, writeAnalytics } from "../db/analytics";
import * as actions from "../actions"

export function* read() {
	const response = yield call(readAnalytics);

	if (response) {
		let analytics = [];
		for (var key in response) {
			analytics.push(
				{ 
					winner: response[key].winner,
					lines: response[key].lines
				}
			);
		}

		yield put(actions.readAnalytics(analytics));
	}
}

export function* readWatcher() {
	yield takeLatest(actions.READ_ANALYTICS_REQUEST, read);
}

export function* write() {
	const getSavedWinner = (state) => state.savedWinner;
	const savedWinner = yield select(getSavedWinner);
	yield call(writeAnalytics, savedWinner[0], savedWinner[1].toString()); // Syntax...
}

export function* writeWatcher() {
	yield takeLatest(actions.WRITE_ANALYTICS_REQUEST, write);	
}

export default function* rootSaga() {
	yield all([call(readWatcher), call(writeWatcher)]);
}
