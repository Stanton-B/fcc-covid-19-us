import axios from 'axios';
import parsers from './parsers';

export default {
	usStats,
	stateStats,
	historicUS,
	historicState,
	statesData,
};

async function usStats() {
	// gets current national US stats
	const response = await axios.get('https://api.covidtracking.com/v1/us/current.json');
	return parsers.usStats(response.data);
}

async function stateStats(state) {
	// gets current stats by state
	const response = await axios.get('https://api.covidtracking.com/v1/states/current.json');
	return parsers.stateStats(state, response.data);
}

async function historicUS() {
	// gets set of ALL daily national US covid data since beginning(!!)
	const response = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
	return parsers.historicUS(response.data);
}

// async function historicState(state) {
// 	// all daily national covid data by state since beginning. Massive file...
// 	const response = await axios.get('https://api.covidtracking.com/v1/states/daily.json');
// 	return parsers.historicState(state, response.data);
// }
async function historicState(state) {
	// all daily national covid data for the state (coded into the url)
	const response = await axios.get(`https://api.covidtracking.com/v1/states/${state}/daily.json`);
	return parsers.historicState(response.data);
}

async function statesData() {
	// for the state table on the main page
	const response = await axios.get('https://api.covidtracking.com/v1/states/current.json');
	return parsers.stateTable(response.data);
}
