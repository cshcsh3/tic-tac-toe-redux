import { delay } from "redux-saga";
import { all, call, put, fork } from "redux-saga/effects";
import { readAnalytics, writeAnalytics } from "../db/analytics";
import * as actions from "../actions"

export function* read() {
	while(true) {
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

		yield call(delay, 5000);
	}
}

export default function* rootSaga() {
	yield all([call(read)]);
}
