const express = require('express')
const path = require('path')
const app = express()

//NEWS API
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('046b7a8dcf034c39a8dc468583bd0253')



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var weekAgo = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 7)
    newsapi.v2.topHeadlines({
        q: 'covid-19',
        category: 'business',
        language: 'en',
        from: weekAgo,
        to: date,
    }).then(response => {
        console.log(response);
        res.render('index', {articles: response.articles})
    });
    
})

app.get('/volunteer', (req, res) => {
    res.render('volunteer')
})

app.get('/donate', (req, res) => {
    res.render('donate')
})

app.listen(process.env.PORT || 6969)

module.exports = app