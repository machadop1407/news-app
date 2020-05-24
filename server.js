const express = require('express')
const path = require('path')
const app = express()

//NEWS API
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('15e9098a61a3b7915a99983e1df5ae70aeedc89446ecd1e6318ddb20fb49fa3e')

//GOOGLE API
const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults()




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var weekAgo = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 7)
    newsapi.v2.topHeadlines({
        q: 'covid-19',
        language: 'en',
        from: weekAgo,
        to: date,
    }).then(response => {
        res.render('index', {articles: response.articles})
    });
})

app.get('/volunteer', (req, res) => {
    var parameter = {
        engine: "google_jobs",
        q: "barista",
        google_domain: "google.com",
        gl: "ca",
        hl: "en",
    };
    
    var callback = function(data) {
      console.log(data)
    }
    
    // Show result as JSON
    client.json(parameter, callback)
    res.render('volunteer')
})

app.get('/donate', (req, res) => {
    res.render('donate')
})

app.listen(process.env.PORT || 6969)

module.exports = app