import axios from 'axios';
import parsers from './parsers';

export default {
	usStats,
	stateStats,
	historicUS,
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
