import { writable } from "svelte/store";

const StockStore = writable(['pypl', 'v'])

export default StockStore