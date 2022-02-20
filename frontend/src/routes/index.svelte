<script context="module">
	//whenever doing api calls use context="module"
	export async function load({ fetch }) {
        const url = 'http://localhost:8000/'
        const res = await fetch(`${url}`) 
        const data = await res.json()
        if (res.ok) {
            return {
                props: {
                    stocks: data.results
                }
            }
        }
    }
</script>

<!-- //styling is scoped -->
<style>
</style>
