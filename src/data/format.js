export default {
	number,
}
function number(num) {
	if (num === null || num === undefined) {
		return 'unknown';
	}

	return num.toLocaleString();
}

