const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.crwpe.mongodb.net/DB11');

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

const Movie = mongoose.model('Movie', movieSchema);

/*app.get('/api/movies', ...): Sets up a GET route at /api/movies, which will return all movies.
Movie.find({}) is called. The empty object {} as an argument means it fetches all documents in the movies collection.*/

app.get('/api/movies', async(req, res) => {
    const movies = await Movie.find({});
    res.json(movies);
});

/*app.get('/api/movie/:id', ...): Defines a GET route at /api/movie/:id, where :id is a parameter for the movie’s unique ID.
Movie.findById(req.params.id): This method searches the movies collection for a document with the ID provided in the URL.*/

app.get('/api/movie/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movies);
});

//async and await are used to handle asynchronous operations like saving data to a database.
//app.post('/api/movies', ...): This sets up a POST route at /api/movies, which will be used to add new movies.
app.post('/api/movies',async(req, res)=>{
    console.log(req.body.title);

    const { title, year, poster } = req.body;
    const newMovie = new Movie({ title, year, poster });
    await newMovie.save();


    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/*{
          "Title": "Avengers: Infinity War (server)",
          "Year": "2018",
          "imdbID": "tt4154756",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
          "Title": "Captain America: Civil War (server)",
          "Year": "2016",
          "imdbID": "tt3498820",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
          "Title": "World War Z (server)",
          "Year": "2013",
          "imdbID": "tt0816711",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }*/