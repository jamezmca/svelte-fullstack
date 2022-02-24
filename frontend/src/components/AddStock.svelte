<script>
	let inputValue = '';
	let active = true;
	import StockStore from '../stocks';
	//save new stock
	function updateStocks() {
		console.log(inputValue)
		if (inputValue === '') {
			return;
		}
		console.log('clicked');
		console.log([...new Set([inputValue, ...$StockStore])])
		// StockStore.set([...new Set([inputValue, ...$StockStore])])
		$StockStore = [...new Set([inputValue, ...$StockStore])]
		// StockStore.update((curr) => {
		// 	return [...new Set([inputValue, ...curr])];
		// });
		console.log($StockStore)
		inputValue = '';
	}
</script>

<form class="relative">
	<!-- on:blur={() => (active = false)}
	on:focus={() => (active = true)} -->
	<input
		bind:value={inputValue}
		type="text"
		placeholder="Stock ticker"
		class="w-full bg-slate-800 py-2 px-2 uppercase text-white outline-0"
	/>
	{#if active}
		<button
			type="submit"
			on:click={updateStocks}
			class="absolute top-0 right-0 h-full flex items-center px-4 bg-amber-500 text-white transition hover:bg-amber-800 duration-300 cursor-pointer"
		>
			Add
		</button>
	{/if}
</form>
