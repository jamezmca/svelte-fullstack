<script context="module">
	//whenever doing api calls use context="module"
	export async function load({ fetch }) {
		const stocks = ['pypl', 'v'];
		const baseUrl = 'http://localhost:8008/';
		const data = await Promise.all(
			stocks.map(async (stock) => {
                const res = await fetch(baseUrl + stock);
				return await res.json()
			})
		);
        console.log(data)
		// const data = await res.json();
		// console.log(data);
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
	import StockList from '../components/StockList.svelte';
	export let stocks;
</script>

<section>
	<StockList {stocks} />
</section>

<!-- //styling is scoped -->
<style>
</style>
