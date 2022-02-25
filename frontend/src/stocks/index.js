import { writable } from "svelte/store";
import { browser } from '$app/env';

export const modal = writable(null)

const defaultStocks = []
const initialValue = browser ? JSON.parse(window.localStorage.getItem('stockTickerList')) ?? defaultStocks : defaultStocks;
const StockStore = writable(initialValue)

StockStore.subscribe((val) => {
    if (browser) {
        window.localStorage.setItem('stockTickerList', JSON.stringify(val))
    }
})



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