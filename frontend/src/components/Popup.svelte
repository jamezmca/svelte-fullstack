<script>
	export let message = 'Default message';
    export let toggleGraph;
</script>

<div class="absolute inset-0 bg-black z-40 text-white">
    <slot/>
    <h2 on:click={toggleGraph}>{message}</h2>
</div>
