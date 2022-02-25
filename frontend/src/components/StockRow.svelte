<script>
	export let stock;
    const stockTicker = Object.keys(stock)[0]
    const financials = stock[stockTicker].financials
    const grid = []
    for (const financial of financials) {
        
    }
</script>

<div class="flex">
	<!-- {#each stock as item}
		<h3>{item} james</h3>
	{/each} -->
</div>

<style>
</style>
