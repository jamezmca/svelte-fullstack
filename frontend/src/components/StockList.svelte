<script>
	import StockStore from '../stocks';
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
	let vals = [];
	let max = null;
	let min = null;
	function toggleGraph() {
		showGraph = !showGraph;
		if (showGraph) {
			vals = stocks.find((stock) => Object.keys(stock)[0] === ticker)[ticker].prices.map(val => val.replace(',', ''));
			max = Math.max(...vals);
			min = Math.min(...vals);
		} else {
			vals = [];
			min = null;
			max = null;
		}
		console.log(max, min)
	}

</script>

{#if showGraph}
	<Popup {toggleGraph}>
		<div>
			<div class="mx-auto w-screen h-48 max-h-screen pt-4 relative overflow-hidden">
				{#each vals as val}
					<div
						class="absolute h-0.5 w-0.5 bg-amber-200"
						style="left: {100 - (vals.indexOf(val) / vals.length) * 100}%; bottom: {((val - min) /
							(max - min)) *
							90}%"
					/>
				{/each}
				<div class="absolute top-0 left-0 bg-slate-900 text-white text-xs">{max}</div>
				<div class="absolute bottom-0 left-0 bg-slate-900 text-white text-xs">{min}</div>
				<div
					class={'absolute text-center top-0 left-0 w-full ' +
						`${vals.indexOf(max) - vals.indexOf(min) > 0 ? 'text-lime-500' : 'text-rose-400'}`}
				>
					${vals[0]}
				</div>
			</div>
		</div>
	</Popup>
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
						class="relative cursor-pointer transition duration-300 text-right hover:opacity-50 hover:text-slate-700"
						on:click={toggleShow(Object.keys(stock)[0])}
					>
						<div class="relative z-10 select-none">
							{Object.keys(stock)[0]} <br />
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
									on:click={() => {
										$StockStore = stocks
											.map((val) => Object.keys(val)[0])
											.filter((val) => val !== 'Ticker' && val !== Object.keys(stock)[0]);
									}}
								>
									<p class=" scale-75">╳</p>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
			{#each ['Day Price', ...rowTitles] as financial}
				<div>
					{#if Object.keys(stock)[0] === 'Ticker'}
						<div class="truncate">
							{financial}
						</div>
					{:else}
						<div class="text-right">
							{#if financial !== 'Day Price'}
							{stock[Object.keys(stock)[0]].financials[financial]}
							{:else}
							${stock[Object.keys(stock)[0]].prices[0]}
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
</style>
