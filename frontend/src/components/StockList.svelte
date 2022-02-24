<script>
	import StockRow from './StockRow.svelte';
	export let stocks;
	const rowTitles = stocks.map((stock) => {
		const [key] = Object.entries(stock);
		return Object.keys(key[1].financials);
	})[0];
	console.log(rowTitles);
	['Stock Ticker', ...stocks].forEach((stock) => {
		console.log(stock);
	});
</script>

<div class="max-w-full overflow-scroll flex gap-4">
	{#each [{ 'Stock Ticker': 0 }, ...stocks] as stock}
		<div class="min-w-fit">
			{Object.keys(stock)[0]}
			{#each rowTitles as financial}
				<div>
					{#if Object.keys(stock)[0] === 'Stock Ticker'}
						{financial}
					{:else}
						{stock[Object.keys(stock)[0]].financials[financial]}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
