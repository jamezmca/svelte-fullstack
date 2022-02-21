<script>
    import StockRow from "./StockRow.svelte";
	export let stocks;
</script>

<h1>Popular stocks</h1>
<div>
	{#each stocks as stock}
		<h3>{Object.keys(stock)[0]}</h3>
        <StockRow {stock}/>
	{/each}
</div>
