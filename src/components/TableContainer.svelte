<script>
	import TableFilter from "./TableFilter.svelte";
	import Table from "./Table.svelte";

	export let data;
	let sortBy = "name";
	let stateName = "";
	$: states = filterAndSort(data, stateName, sortBy);

	function filterAndSort(states, stateName, sortBy) {
		const filteredStates = states.filter((state) => {
			return (
				stateName === "" ||
				state.fullStateName.toLowerCase().indexOf(stateName.toLowerCase()) > -1
			);
		});

		if (sortBy !== "name") {
			return filteredStates.sort((a, b) => {
				let aNum = a[sortBy].replace(/,/g, "");
				let bNum = b[sortBy].replace(/,/g, "");
				return +bNum - +aNum;
			});
		}

		return filteredStates;
	}
</script>

<h1>{stateName} / {sortBy}</h1>
<TableFilter bind:stateName bind:sortBy />
<Table {states} />
