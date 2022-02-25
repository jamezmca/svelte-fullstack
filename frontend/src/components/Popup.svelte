<script>
	export let message = 'CLOSE';
    export let toggleGraph;
</script>

<div class="absolute inset-0 bg-slate-900 z-40 flex flex-col">
    <div class="mx-auto">
        <h2 class="select-none cursor-pointer px-4 text-white py-1 bg-amber-500 transition duration-200 hover:text-amber-500 hover:bg-white" on:click={toggleGraph}>{message}</h2>
    </div>
    <div class="flex-1 grid place-items-center">
        <slot/>
    </div>
</div>
