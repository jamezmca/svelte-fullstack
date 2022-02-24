<script>
	import StockStore from '../stocks';
	import StockRow from './StockRow.svelte';
	export let stocks;
	const rowTitles = stocks.map((stock) => {
		const [key] = Object.entries(stock);
		return Object.keys(key[1].financials);
	})[0];
</script>

<div class="max-w-full overflow-auto flex gap-8 pt-3 px-4">
	{#each [{ Ticker: 0 }, ...stocks] as stock}
		<div class=" flex flex-col gap-1">
			<div class="uppercase font-bold">
				{#if Object.keys(stock)[0] == 'Ticker'}
					<div class="">{Object.keys(stock)[0]}</div>
				{:else}
					<div class="flex space-between items-center justify-end">
						{Object.keys(stock)[0]}
						<div class="cursor-pointer grid place-items-center text-xs text-red-400 pl-2 scale-75 transition duration-300 hover:opacity-50"
							on:click={() =>
								($StockStore = stocks.map(val => Object.keys(val)[0]).filter(
									(val) => val !== 'Ticker' && val !== Object.keys(stock)[0]
								))}
						>
							╳
						</div>
					</div>
				{/if}
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
