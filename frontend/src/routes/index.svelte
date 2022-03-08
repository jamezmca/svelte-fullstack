<script context="module">
	//get started with tailwind svelte
	//whenever doing api calls use context="module"
	import StockStore from '../stocks';
	let stocks = [];
	const unsub = StockStore.subscribe((val) => {
		stocks = val;
	});
	unsub();
	//can also use the $ syntax somehow
	// StockStore.update((curr) => {
	// 	return [...new Set(stocks)];
	// });
	export async function load({ fetch, params }) {
		//where params is url params
		const baseUrl = `http://localhost:8008/`;
		const data = await Promise.all(
			stocks.map(async (stock) => {
				const res = await fetch(baseUrl + stock);
				// const res = await fetch(`/${stock}`);
				return await res.json();
			})
		);
		if (data) {
			return {
				props: {
					stocks: data
				}
			};
		}
	}
</script>

<script>
	import AddStock from '../components/AddStock.svelte';
	import StockList from '../components/StockList.svelte';
	export let stocks;

	//put the fetch logic in here somehow
	// const unsub = StockStore.subscribe((data) => {
	// 	stocks = data;
	// }); //returns unsub function that i could use onDestroy()
	import { onMount } from 'svelte';
	onMount(() => {
		// console.log($StockStore);
	});

	$: getData($StockStore);
	console.log(stocks)
	async function getData(newTickers) {
		const oldTickers = stocks.map((val) => Object.keys(val)[0]);
		if (newTickers.length < oldTickers.length) {
			return (stocks = stocks.filter((val) => newTickers.includes(Object.keys(val)[0])));
		}
		let difference = newTickers.filter((x) => !oldTickers.includes(x));
		const baseUrl = 'http://localhost:8008/';
		const data = await Promise.all(
			difference.map(async (stock) => {
				const res = await fetch(baseUrl + stock);
				return await res.json();
			})
		);
		stocks = [...data, ...stocks].filter((stock) => {
			const ticker = Object.keys(stock)[0];
			return stock[ticker]?.prices?.length > 50;
		});
	}
</script>

<section class="flex flex-column relative">
	{#if stocks.length > 0}
		<StockList {stocks} />
	{/if}
</section>

<!-- //styling is scoped -->
<style>
</style>
