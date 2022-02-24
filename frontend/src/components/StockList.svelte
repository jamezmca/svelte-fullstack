<script>
	import StockRow from './StockRow.svelte';
	export let stocks;
	const rowTitles = stocks.map((stock) => {
		const [key] = Object.entries(stock);
		return Object.keys(key[1].financials);
	})[0];

</script>

<div class="max-w-full overflow-auto flex gap-8 pt-3 px-4">
	{#each [{ 'Ticker': 0 }, ...stocks] as stock}
		<div class=" flex flex-col gap-1">
			<div class="uppercase font-bold">
				{Object.keys(stock)[0]}
			</div>
			{#each rowTitles as financial}
				<div>
					{#if Object.keys(stock)[0] === 'Ticker'}
						{financial}
					{:else}
					<div class="text-right">
						{stock[Object.keys(stock)[0]].financials[financial]}
					</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
