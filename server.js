const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/volunteer', (req, res) => {
    res.render('volunteer')
})

app.get('/donate', (req, res) => {
    res.render('donate')
})

app.listen(process.env.PORT || 6969)

module.exports = app