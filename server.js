const express = require('express')
const path = require('path')
const app = express()

//NEWS API
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('15e9098a61a3b7915a99983e1df5ae70aeedc89446ecd1e6318ddb20fb49fa3e')

//GOOGLE API
const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults()


const GSR = require('google-search-results-nodejs')
let client = new GSR.GoogleSearchResults("d1c96b22c28a88b9a1815f0a604e7899876d186f80a5b6d4f97371665f54f68a")



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
<<<<<<< HEAD
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
=======
   
var parameter = {
    engine: "google_jobs",
    q: "barista",
    google_domain: "google.com",
    gl: "ca",
    hl: "en",
    location: "Canada",
    
};

var callback = function(data) {
  console.log(data)
  //res.json(data)
}

// Show result as JSON
client.json(parameter, callback)
    //res.render('volunteer')
>>>>>>> a5cb72ff8ba68f735c1339aef474cd519648eb56
})

app.get('/donate', (req, res) => {
    res.render('donate')
})

app.listen(process.env.PORT || 6969)

module.exports = app

