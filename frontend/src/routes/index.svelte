<script context="module">
	//get started with tailwind svelte
	//whenever doing api calls use context="module"
	let stocks = ['pypl', 'v']; //read from db or localstorage
	//can also use the $ syntax somehow
	import StockStore from '../stocks';
	StockStore.update((curr) => {
		return [...new Set(stocks)];
	});
	export async function load({ fetch, params }) {
		//where params is url params
		const baseUrl = 'http://localhost:8008/';
		const data = await Promise.all(
			stocks.map(async (stock) => {
				const res = await fetch(baseUrl + stock);
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
		console.log($StockStore);
	});

	$: getData($StockStore);

	async function getData(newTickers) {
		console.log('here');
		console.log(newTickers);
		const baseUrl = 'http://localhost:8008/';
		const data = await Promise.all(
			newTickers.map(async (stock) => {
				const res = await fetch(baseUrl + stock);
				return await res.json();
			})
		);
		stocks = data;
	}
</script>

<section class="flex flex-column">
	<StockList {stocks} />
</section>

<!-- //styling is scoped -->
<style>
</style>
