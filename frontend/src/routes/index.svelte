<script context="module">
    //get started with tailwind svelte
	//whenever doing api calls use context="module"
	export async function load({ fetch, params }) { //where params is url params
		const stocks = ['pypl', 'v', 'mrna', 'rklb'];
		const baseUrl = 'http://localhost:8008/';
		const data = await Promise.all(
			stocks.map(async (stock) => {
                const res = await fetch(baseUrl + stock);
				return await res.json()
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
<AddStock/>
<section class="flex flex-column">
	<StockList {stocks} />
</section>

<!-- //styling is scoped -->
<style>
</style>
