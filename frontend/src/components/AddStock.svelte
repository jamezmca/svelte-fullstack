<script>
	let inputValue = '';
	let active = false;
	import StockStore from '../stores';
	let stocks = [];
	StockStore.subscribe((data) => {
		stocks = data;
	});
</script>

<form class="relative">
	<input
		on:blur={() => (active = false)}
		on:focus={() => (active = true)}
		bind:value={inputValue}
		type="text"
		name="search-stock"
		placeholder="Stock ticker"
		class="w-full bg-slate-800 py-2 px-2 uppercase text-white outline-0"
	/>
	{#if active}
		<div class="absolute top-0 right-0 h-full flex items-center px-4 bg-amber-500 text-white transition hover:bg-amber-800 duration-300 cursor-pointer">Add</div>
	{/if}
</form>
