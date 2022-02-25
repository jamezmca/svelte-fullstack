<script>
	import { modal } from '../stocks';
	import StockStore from '../stocks';
	import StockRow from './StockRow.svelte';
	import Popup from './Popup.svelte';
	export let stocks;
	const rowTitles = stocks.map((stock) => {
		const [key] = Object.entries(stock);
		return Object.keys(key[1].financials);
	})[0];

	let show = false;
	let ticker = '';
	function toggleShow(tick) {
		if (show === true) {
			ticker = '';
		} else {
			ticker = tick;
		}
		show = !show;
	}

	let showGraph = false;
	function toggleGraph() {
		showGraph = !showGraph;
	}
</script>

{#if showGraph}
	<Popup {toggleGraph}>James</Popup>
{/if}
<div class="max-w-full overflow-auto flex gap-8 pt-3 px-4">
	{#each [{ Ticker: 0 }, ...stocks] as stock}
		<div class=" flex flex-col gap-1">
			<div class="uppercase font-bold text-xl">
				{#if Object.keys(stock)[0] == 'Ticker'}
					<div class="relative z-10 select-none">
						{Object.keys(stock)[0]}
					</div>
				{:else}
					<div
						class="relative"
						on:mouseenter={toggleShow(Object.keys(stock)[0])}
						on:mouseleave={toggleShow(Object.keys(stock)[0])}
					>
						<div class="relative z-10 select-none">
							{Object.keys(stock)[0]}
						</div>
						{#if show && ticker == Object.keys(stock)[0]}
							<div class="absolute inset-0 flex bg-white z-20 cursor-pointer select-none">
								<div
									class="flex-1 bg-sky-800 text-amber-400 text-xs grid place-items-center transition duration-300 hover:opacity-70 px-2"
									on:click={toggleGraph}
								>
									GRAPH
								</div>
								<div
									class="text-xs bg-amber-400 text-sky-800 grid place-items-center px-1 transition duration-300 hover:opacity-50 px-1"
									on:click={() =>
										($StockStore = stocks
											.map((val) => Object.keys(val)[0])
											.filter((val) => val !== 'Ticker' && val !== Object.keys(stock)[0]))}
								>
									<p class=" scale-75">╳</p>
								</div>
							</div>
						{/if}
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
