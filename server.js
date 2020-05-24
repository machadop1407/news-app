const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

//NEWS API
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('046b7a8dcf034c39a8dc468583bd0253')

//GOOGLE API
const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults("d1c96b22c28a88b9a1815f0a604e7899876d186f80a5b6d4f97371665f54f68a")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var weekAgo = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 7)
    // newsapi.v2.everything({
    //     q: 'covid-19 AND cure AND curve AND flattening AND improvement',
    //     language: 'en',
    //     from: weekAgo,
    //     to: date,
    // }).then(response => {
    //     res.render('index', {articles: response.articles})
    // });

    res.render('index', { articles: [{ url: "sss", title: "snsns", description: "cacabb", author: "iiiii", urlToImage: "llll", publishedAt: "vishal" }, { url: "sss", title: "snsns", description: "cacabb", author: "iiiii", urlToImage: "llll", publishedAt: "vishal" }] })
})

app.post('/searchVolunteer', (req, res) => {

    var country = req.body.location
    var parameter = {
        engine: "google_jobs",
        q: "barista",
        google_domain: "google.com",
        gl: "ca",
        hl: "en",
        location: country,

    };

    var callback = function (data) {
        res.send({ jobs: data.jobs_results })
    }

    // Show result as JSON
    client.json(parameter, callback)

})

app.get('/volunteer', (req, res) => {
    res.render('volunteer')
})

app.get('/donate', (req, res) => {
    res.render('donate')
})

app.get('/aboutus', (req, res)=> {
    res.render('aboutus')
})
app.listen(process.env.PORT || 6969)

module.exports = app