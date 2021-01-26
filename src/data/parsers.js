import format from './format';

function usStats(data) {
	const [usStatRaw] = data;

	return {
		cases: format.number(usStatRaw.positive),
		deaths: format.number(usStatRaw.death),
		recovered: format.number(usStatRaw.recovered),
		ventilator: format.number(usStatRaw.onVentilatorCurrently),
		hospitalized: format.number(usStatRaw.hospitalized),
		icu: format.number(usStatRaw.inIcuCurrently),
		tested: format.number(usStatRaw.totalTestResults),
		updated: new Intl.DateTimeFormat('en',
			{
				weekday: 'long',
				month: 'long',
				day: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
			}).format(new Date(usStatRaw.lastModified)),
	};
}

export default {
	usStats,
}

// Sample data(as of 01/2020)
// [{"date": 20210124,
// 	"states": 56,
// 	"positive": 24800354,
// 	"negative": 224398833,
// 	"pending": 10892,
// 	"hospitalizedCurrently": 110628,
// 	"hospitalizedCumulative": 784945,
// 	"inIcuCurrently": 21168,
// 	"inIcuCumulative": 40931,
// 	"onVentilatorCurrently": 6989,
// 	"onVentilatorCumulative": 3943,
// 	"dateChecked": "2021-01-24T24:00:00Z",
// 	"death": 410212,
// 	"hospitalized": 784945,
// 	"totalTestResults": 295014810,
// 	"lastModified": "2021-01-24T24:00:00Z",
// 	"recovered": null, // recovered == deprecated
// 	"total": 0,
// 	"posNeg": 0,
// 	"deathIncrease": 1940,
// 	"hospitalizedIncrease": 1909,
// 	"negativeIncrease": 1210655,
// 	"positiveIncrease": 142949,
// 	"totalTestResultsIncrease": 1709230,
// 	"hash": "712d2ab94aba15b75be7043fa6705784b0dc1575"
// }]

