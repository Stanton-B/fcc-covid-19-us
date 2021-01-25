<script>
	let isOpen = false;
	export let segment;

	function toggleNav() {
		isOpen = !isOpen;
	}
</script>

<style>
	@media (min-width: 769px) {
		nav {
			border-bottom: solid gray 1px;
		}
	}
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/"> <img src="logo.jpg" alt="virus" /> </a>

		<span
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			class:is-active={isOpen}
			on:click={toggleNav}>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</span>
	</div>
	<div class="navbar-menu" class:is-active={isOpen}>
		<div class="navbar-start">
			<a
				class="navbar-item"
				href="/"
				class:is-active={segment === undefined}>Home</a>
			<a
				class="navbar-item"
				href="/about"
				class:is-active={segment === 'about'}>About</a>
		</div>
	</div>
</nav>
