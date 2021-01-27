<script context="module">
	import requests from "../data/requests.js";

	export async function preload() {
		try {
			const usStats = await requests.usStats();
			const historic = await requests.historicUS();
			return { usStats, historic };
		} catch (e) {
			console.log(e);
			this.error(500, e);
		}
	}
</script>

<script>
	import CovidStat from "../components/CovidStat.svelte";
	import CovidChart from "../components/CovidChart.svelte";
	import TableContainer from "../components/TableContainer.svelte";

	export let usStats;
	export let historic;

	console.log("usStats: ", usStats);
	console.log("historic: ", historic);
</script>

<svelte:head>
	<title>Covid 19 US Tracker</title>
</svelte:head>

<div class="section header">
	<div class="container">
		<h1>Covid 19 - US</h1>
	</div>
</div>

<CovidStat {...usStats} />
<CovidChart />

<TableContainer />
