import firebase from './firebase';

export async function writeAnalytics(winner, lines) {
	await firebase.database().ref('analytics/').push({
		winner: winner,
		lines: lines
	});

	return true;
}

export async function readAnalytics() {
	var rootRef = firebase.database().ref('analytics/').limitToLast(10);
	var json = {};
	
	await rootRef.once('value', function(snapshot) {
		snapshot.forEach(function(child) {
			var key = child.key;
			var value = child.val();
			json[key] = { winner: value.winner, lines: value.lines };
		});
	});	

	return json;
}
