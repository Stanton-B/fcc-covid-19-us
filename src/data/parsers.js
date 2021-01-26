import format from './format';
import moment from 'moment';

function usStats(data) {
  const [usStatRaw] = data;

  return parseStats(usStatRaw);
}

function stateStats(state, data) {
  const stateRawData = data.find(d => d.state === state);

  return parseStats(stateRawData);
}

function parseStats(rawStats) {
  return {
    cases: format.number(rawStats.positive),
    deaths: format.number(rawStats.death),
    recovered: format.number(rawStats.recovered),
    ventilator: format.number(rawStats.onVentilatorCurrently),
    hospitalized: format.number(rawStats.hospitalized),
    icu: format.number(rawStats.inIcuCurrently),
    tested: format.number(rawStats.totalTestResults),
    updated: moment(rawStats.lastModified).format('LT'),
    // updated: new Intl.DateTimeFormat('en',
    //   {
    //     weekday: 'long',
    //     month: 'long',
    //     day: 'numeric',
    //     year: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     hour12: true
    //   }).format(new Date(rawStats.lastModified)),
  };
}

export default {
  usStats,
  stateStats,
}


// Sample data for US(as of 01/2020)
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

