import React, { Component } from "react";
import { readAnalytics } from "../db/analytics";

class Analytics extends Component {
	createRows() {
		const analytics = this.props.analytics;
		const rows = [];

		if (analytics) {
			analytics.forEach((item, i) => {
				rows.push(<li key={i}>{item.winner} won with {item.lines}</li>);
			})
		}

		return rows;
	}

	render() {
		return (
			<ul>
				{this.createRows()}
			</ul>
		);
	}
}

export default Analytics;