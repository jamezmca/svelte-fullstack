import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

export const modal = writable(null)

const defaultStocks = []
const StockStore = persistStore('stockTickerList', defaultStocks)
// console.log(localStorage)
// const stored = ['pypl']//localStorage.getItem('stockTickerList')
// const StockStore = writable(stored || [])
// StockStore.subscribe(val => {
//     if (typeof localstorage == 'undefined') {
//         console.log('bananana')
//         localStorage['stockTickerList'] = val
//     }
// })

export default StockStore