import { writable } from "svelte/store";

export const persistStore = (key, initial) => {
    const persist = localStorage.getItem('stockTickerList')
    const data = persist ? JSON.parse(persist) : initial

    const store = writable(data, () => {
        const unsub = store.subscribe(val => {
            localStorage.setItem('stockTickerList', JSON.stringify(val))
        })
        return unsub
    })
    return store
}