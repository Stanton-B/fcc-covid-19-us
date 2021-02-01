<script context="module">
	/* A <script> tag with a context="module" attribute runs once when the module */
	/* first evaluates, rather than for each component instance. Values declared */
	/* in this block are accessible from a regular <script> (and the component */
	/* markup) but not vice versa. */
	/* https://svelte.dev/docs#script_context_module */

	import requests from "../data/requests.js";

	export async function preload() {
		/* Page components can define a preload function that runs before the
		 * component is created. The values it returns are passed as props to the
		 * page. */
		/* Preload functions are called when a page is loaded and are typically */
		/* used to load data that the page depends on - hence its name. This */
		/* avoids the user seeing the page update as it loads, as is typically the */
		/* case with client-side loading. */
		/* Note that preload will run both on the server side and on the client
		 * side. Therefore, it may not reference any APIs only present in the
		 * browser. */
		/* https://sapper.svelte.dev/docs#Preloading */
		try {
			const usStats = await requests.usStats();
			const historic = await requests.historicUS();
			const statesData = await requests.statesData();
			return { usStats, historic, statesData };
		} catch (e) {
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
	export let statesData;
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
<CovidChart historicData={historic} title="US Covid-19" />

<TableContainer data={statesData} />
