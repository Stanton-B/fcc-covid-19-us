import format from './format';
import moment from 'moment';

export default {
  usStats,
  stateStats,
  historicUS,
}

function usStats(data) {
  const [usStatRaw] = data;

  return parseStats(usStatRaw);
}

function stateStats(state, data) {
  const stateRawData = data.find(d => d.state === state);

  return parseStats(stateRawData);
}

function historicUS(historicData) {
  // not sure why this go-between is necessary...maybe bc the chart parsing
  // requires more code?
  return parseHistoric(historicData);
}

function parseHistoric(historicData) {
  return [
    {
      label: 'Cases',
      key: 'positive',
      color: 'rgb(100, 0, 200)',
    },
    {
      label: 'Recovered',
      key: 'recovered',
      color: 'rgb(100, 100, 200)',
    },
    {
      label: 'Total Tested',
      key: 'totalTestResults',
      color: 'rgb(10, 30, 100)',
    },
    {
      label: 'Hospitalized',
      key: 'hospitalizedCurrently',
      color: 'rgb(20, 100, 230)',
    },
    {
      label: 'Deaths',
      key: 'death',
      color: 'rgb(255, 99, 132)'
    }
  ].reduce((prev, next) => {
    if (historicData.filter(d => d[next.key] !== null).length > 4) {
      prev.push(parseChart(historicData, next.key, next.label, next.color));
    }

    return prev;
  }, []);
}

function parseChart(historicData, key, label, color) {
  const chartData = historicData.map(data => {
    return {
      x: moment(data.date, 'YYYYMMDD'),
      y: data[key] || 0,
    };
  });

  return {
    label,
    data: chartData,
    fill: false,
    borderColor: color,
  };
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
