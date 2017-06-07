const express = require('express')
const app = express()
const products = require('./app/routers/products')
const path = require('path')
const config = require('./config.json')
const numeral = require('numeral')
const url = require('url')

app.use((req, res, next) => {
    res.locals = {
        snipcartApiKey: config.snipcartApiKey,
        formatMoney: (number) => {
            return numeral(number).format('0.00$')
        },
        fullUrl: (path) => {
            return url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: path
            })
        }
    }
    console.log(res.locals)
    next()
})

app.use('/', products)

app.use((req, res, next) => {
    res.status(404)
});

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/app/views'))

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port 3000.');
})