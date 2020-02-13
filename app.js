const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const alert = require('alert-node');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));



app.get('/results', (req, res) => {
    let query = req.query.search;
    request('https://api.themoviedb.org/3/search/movie?api_key=a084c992a81be9f171bba84163b45be3&query=' + query, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        let data = JSON.parse(body);
        if (query == '') {
            alert('data search cant be null, please to fulfiled ');
            res.redirect('search');
        } else {
            function titleCase(string) {
                if (string == '') {
                    return res.redirect('search')
                } else {
                    var sentence = string.toLowerCase().split(" ");
                    for (var i = 0; i < sentence.length; i++) {
                        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
                    }
                    console.log(sentence);
                    return sentence;
                }
            }
            res.render('movie', {
                data: data,
                searchQuery: titleCase(query),
            });
        }
    });
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.listen(3000, () => {
    console.log(`Server started on port`);
});