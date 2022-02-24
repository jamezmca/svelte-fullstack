<script>
	import StockRow from './StockRow.svelte';
	export let stocks;
	const stockTickers = stocks.map((stock) => Object.keys(stock)[0]);
	const columns = [
		'Stock Ticker',
		...stocks.map((stock) => {
			const [key] = Object.entries(stock);
			return Object.keys(key[1].financials);
		})[0]
	];
	Object.values(stocks).forEach((stock) => {
		console.log(stock);
	});
</script>

<div class="max-w-full overflow-scroll flex gap-4">
	{#each columns as col}
		<div class="min-w-fit">
			<div class="text-lg">
				{col}
			</div>
			<div class="">
				{#each Object.values(stocks) as stock}
                <div>
                    {#if col === 'Stock Ticker'}
						{Object.keys(stock)[0]}
					{:else}
						{stock[Object.keys(stock)[0]].financials[col]}
					{/if}
                </div>
				{/each}
			</div>
		</div>
	{/each}
</div>
