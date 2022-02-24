<script>
	import StockRow from './StockRow.svelte';
	export let stocks;
	const stockTickers = ['Stock Ticker', ...stocks.map((stock) => Object.keys(stock)[0])];
	const rowTitles = stocks.map((stock) => {
		const [key] = Object.entries(stock);
		return Object.keys(key[1].financials);
	})[0];
	stocks.forEach((stock) => {
		console.log(stock);
	});
</script>

<div class="max-w-full overflow-scroll flex gap-4">
	{#each ['Stock Ticker', ...stocks] as stock}
		<div class="min-w-fit">
			{#each rowTitles as financial}
				<div>
					{#if stock === 'Stock Ticker'}
						{Object.keys(stock)[0]}
					{:else}
						{Object.values(stock)[0][financial]}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
