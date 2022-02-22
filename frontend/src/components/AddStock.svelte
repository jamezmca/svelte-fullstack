<script>
	let inputValue = '';
	let active = false;
</script>

<form>
	{#if !active}
		james
	{/if}
	<label for="search-stock"
		>Stock Ticker
		<input
			on:blur={() => (active = false)}
			on:focus={() => (active = true)}
			bind:value={inputValue}
			type="text"
			name="search-stock"
		/>
	</label>
	<button>ADD</button>
</form>
