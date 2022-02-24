<script context="module">
	//get started with tailwind svelte
	//whenever doing api calls use context="module"
	import { onMount } from 'svelte';
	import StockStore from '../stores';
	let stocks = [];
	const unsub = StockStore.subscribe((data) => {
		stocks = data;
	}); //returns unsub function that i could use onDestroy()

	onMount(() => {
		//get data from local storage
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
</script>

<section class="flex flex-column">
	<StockList {stocks} />
</section>

<!-- //styling is scoped -->
<style>
</style>
