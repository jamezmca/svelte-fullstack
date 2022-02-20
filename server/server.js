const axios = require('axios')
const cheerio = require('cheerio')
const app = (require('express'))()
const port = 8000
app.use(require('cors')())


app.get('/', async (req, res) => {
    //going to start off with two stocks
    try {
        const stockInfo = ['mrna', 'pypl'].map(async (ticker) => {
            const stockInfoType = await Promise.all(['key-statistics', 'history', 'financials'].map(async (type) => {
                const url = `https://finance.yahoo.com/quote/${ticker}/${type}?p=${ticker}`
                const { data } = await axios.get(url)
                const $ = cheerio.load(data)
                if (type === 'history') {
                    const prices = $('td:nth-child(6)').get().map(val => $(val).text())
                    return { prices }
                }
                if (type === 'key-statistics') {
                    const statsArea = $('section[data-test="qsp-statistics"] div:nth-child(2)').get().map(val => {
                        const $ = cheerio.load(val)
                        console.log($.html())
                    })
                    // console.log(statsArea)
                    // const valuationMeasures = {
                    //     mktCap: statsArea('div:first-child tr td:last-child').innerText
                    // }
                    // console.log(valuationMeasures)
                }
                if (type === 'financials') {

                }

            }))

        })
    } catch (err) {
        res.status(500).send({ message: 'rip' })
    }
})

app.get('/:type', (req, res) => {
    const { type } = req.params
    const { ticker } = req.query
    res.status(200).send(`<h1>${type} for ticker: ${ticker}</h1>`)

    //else do a failure clause res.status(400)
    //show how to send a page
})


app.listen(port, () => console.log(`Server started on port: ${port}`))