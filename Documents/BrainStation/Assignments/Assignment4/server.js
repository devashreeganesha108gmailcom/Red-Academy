const request = require('request'); //importing the request library
const express = require('express'); //importing the express library
const cheerio = require('cheerio'); //importing the cheerio library
const app = express(); //creating express object
const port = process.argv[2] || 8080; //configuring the port

const MovieDBDatabaseURL = `https://www.themoviedb.org/movie`; //assigning the movie database url
const apiKey = '79cc065335eb505f9802891bb8cabedb'; //assigning the api key a value


app.set('view engine', 'ejs'); //setting the view engine
app.use(express.static('public')); //using the public directory for serving static files

//opening up a connection at the port
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
    console.log(`Press CTRL + C to stop server`);
    console.log(`Open up your browser and navigate to http://localhost:${port}.`)
});

//the main home page
app.get('/', (req, res) => {
    let movieNames = {}; //object to store the list of movies
    let movieImages = []; //array to store the list of images
    request(MovieDBDatabaseURL, function (error, response, movieNamesBody) {
        if (error) {
            console.log(`Error Message : ${error}`);
            console.log(`Status Code : ${response.statusCode()}`);
        }
        else {
            let $ = cheerio.load(movieNamesBody); //creating a cheerio handlebar
            movieNames = $("a.title.result"); //scrapes out all the movie names
            movieImages = $("img.poster.fade"); //scrapes out all the movie images
            res.render('home', { //sends those data to the home page
                movieNames,
                movieImages
            });
        }
    });
});

//creating a movie id endpoint
app.get('/movie/:id', (req, res) => {
    //let movieInfoBody = {}; 
    const movieInfoURL = `https://api.themoviedb.org/3/movie/${req.param('id')}?api_key=${apiKey}&language=en-US`;
    request(movieInfoURL, function (error, response, movieInfoBody) {
        //if there is an error
        if (error) {
            console.log(`Error Message : ${error}`);
            console.log(`Status Code : ${response.statusCode()}`);
        }
        else {
            let $ = cheerio.load(movieInfoBody); //creating a cheerio handlebar
            let movieInfo = JSON.parse(movieInfoBody);
            //requesting infor from the url
            request(MovieDBDatabaseURL, function (error, response, movieNamesBody) {
                if (error) { //checking if error exists
                    console.log(`Error Message : ${error}`);
                    console.log(`Status Code : ${response.statusCode()}`);
                }
                else { 
                    let $ = cheerio.load(movieNamesBody); //constructing the cheerio handlebar
                    let movieImages = $("img.poster.fade"); //scrapes out all the movie images
                    let movieNames = $("a.title.result"); //scrapes out all the movie names
                    let keyOfImage; //variable to store the key of the required image
                    for(var key in movieNames){
                        if(movieNames[key].attribs !== undefined){   //checks to see if the attribs object is undefined     
                            if (movieNames[key].attribs.title === movieInfo.original_title){ //checks to see if the movie name is the same between the two objects
                                keyOfImage = key; //assigns the keyofimage the correct value
                                break;
                            }
                        }
                    } //sends the data to the movie page
                    res.render('movie', {
                        movieInfo,
                        movieImages,
                        keyOfImage
                    });
                }
            });
        }
    });
});

//creating an endpoint for the filtered results page
app.get('/filteredresult', (req, res) => {
    let search = req.query.search; //
    const MovieDBDatabaseURL = `https://www.themoviedb.org/movie`;
    //let movieNames;
    let movieImages = [];
    request(MovieDBDatabaseURL, function (error, response, movieNamesBody) {
        //checking for error messages
        if (error) {
            console.log(`Error Message : ${error}`);
            console.log(`Status Code : ${response.statusCode()}`);
        }
        else {
            let $ = cheerio.load(movieNamesBody); //creating a cheerio handlebar
            let movieNames = $("a.title.result"); //scrapes all the movie names
            movieImages = $("img.poster.fade"); //scrapes all the movie images
            res.render('filtered', { //sends the required data to the specific page
                search,
                movieNames,
                movieImages
            });
        }
    });
});

