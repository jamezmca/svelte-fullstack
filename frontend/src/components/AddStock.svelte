<script>
	let inputValue = '';
	let active = true;
	import StockStore from '../stocks';

	async function updateStocks() {
		if (inputValue === '') {
			return;
		}
		// StockStore.set([...new Set([inputValue, ...$StockStore])])
		$StockStore = [...new Set([inputValue, ...$StockStore])];
		// StockStore.update((curr) => {
		// 	return [...new Set([inputValue, ...curr])];
		// });
		inputValue = '';
	}
</script>

<div class="relative">
	<!-- on:blur={() => (active = false)}
	on:focus={() => (active = true)} -->
	<input
		bind:value={inputValue}
		type="text"
		placeholder="Stock ticker"
		class="w-full bg-slate-800 py-3 px-4 uppercase text-white outline-0 text-4xl"
	/>
	{#if active}
		<div
			type="submit"
			on:click={updateStocks}
			class="absolute uppercase top-0 right-0 h-full flex items-center px-4 bg-amber-500 text-white transition hover:bg-amber-800 duration-300 text-xl cursor-pointer"
		>
			Add
		</div>
	{/if}
</div>
