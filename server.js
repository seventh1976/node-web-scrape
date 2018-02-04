var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
    url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = {title : "", release : "", rating : ""}

            $('.header').filter(function(){
                var data = $(this);

                title = data.children().first().text();

                release = data.children().last().children().text();

                json.title = title;
                json.release = release;
            })

            $('.star-box-giga-star').filter(function(){
                var data = $(this);

                rating = data.text();

                json.rating = rating;
            })
        }
    })
})

app.listen('8081')

console.log('Server started on port 8081');

exports = module.exports = app;
