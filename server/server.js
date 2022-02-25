const axios = require('axios')
const cheerio = require('cheerio')
const app = (require('express'))()
const port = 8008
app.use(require('cors')())


app.get('/:ticker', async (req, res) => {
    //read from db here first
    const { ticker } = req.params
    console.log(`Requesting ${ticker} data`)
    const { api_key } = req.query //localhost:8008/mrna?api_key=askjasldkjfhlads
    if (!ticker) { return res.status(400).send({ message: 'Please include stock ticker' }) }
    try {
        const stockInfoType = await Promise.all(['key-statistics', 'history'].map(async (type) => {
            const url = `https://finance.yahoo.com/quote/${ticker}/${type}?p=${ticker}`
            const { data } = await axios.get(url)
            const $ = cheerio.load(data)
            if (type === 'history') {
                const prices = $('td:nth-child(6)').get().map(val => $(val).text())
                return { prices }
            }
            if (type === 'key-statistics') {
                const metrics = [
                    'Market Cap (intraday)',
                    'Trailing P/E',
                    'Forward P/E',
                    'PEG Ratio (5 yr expected)',
                    'Price/Sales (ttm)',
                    'Price/Book (mrq)',
                    'Enterprise Value/Revenue',
                    'Enterprise Value/EBITDA',
                    'Shares Outstanding5',
                    'Profit Margin',
                    'Operating Margin (ttm)',
                    'Return on Assets (ttm)',
                    'Return on Equity (ttm)',
                    'Revenue (ttm)',
                    'Revenue Per Share (ttm)',
                    'Quarterly Revenue Growth (yoy)',
                    'Gross Profit (ttm)',
                    'EBITDA',
                    'Net Income Avi to Common (ttm)',
                    'Quarterly Earnings Growth (yoy)',
                    'Total Cash (mrq)',
                    'Total Debt (mrq)',
                    'Total Debt/Equity (mrq)',
                    'Operating Cash Flow (ttm)'
                ]
                const statsArea = $('section[data-test="qsp-statistics"] > div:nth-child(2)').get().map(val => {
                    const $ = cheerio.load(val)
                    const valuationMeasures = $('div:first-child tbody tr').get().map(val => {
                        const text = $(val).text()
                        if (metrics.reduce((acc, curr) => {
                            if (acc === true) { return true }
                            return $(val).text().includes(curr)
                        }, false)) {
                            return text
                        } else {
                            return ''
                        }
                    }).filter(val => {
                        return val !== ''
                    }).reduce((acc, curr) => {
                        let title = ''
                        for (const tit of metrics) {
                            if (curr.includes(tit)) {
                                title = tit
                            }
                        }
                        return { ...acc, [title]: curr.replace(title, '') }
                    }, {})
                    return valuationMeasures
                })
                return { financials: statsArea[0] }
            }
        }))

        //save to db before this step

        res.status(200).send({
            [ticker]: stockInfoType.reduce((acc, curr) => {
                return { ...acc, [Object.keys(curr)[0]]: Object.values(curr)[0] }
            }, {})
        })
    } catch (err) {
        res.status(500).send({ message: 'rip' })
    }
})

app.listen(port, () => console.log(`Server started on port: ${port}`))