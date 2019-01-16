import React, { Component } from "react";
import { readAnalytics } from "../db/analytics";

class Analytics extends Component {
	async getAnalytics() {
		const analytics = await readAnalytics();
		const rows = [];		

		for (var key in analytics) {
			rows.push(<li key={key}>{ analytics[key].winner } won with { analytics[key].lines.toString() } </li>);
		}

		return rows;
	}

	render() {
		return (<div></div>);
	}
}

export default Analytics;