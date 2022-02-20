<script>
    let count = 0

    function incrementBtn() {
        count+=1
    }
</script>
<h1>Number: {count}</h1>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/about">redirect button</a>

<button on:click={incrementBtn}>increment</button>
<!-- //styling is scoped -->
<style>

</style>