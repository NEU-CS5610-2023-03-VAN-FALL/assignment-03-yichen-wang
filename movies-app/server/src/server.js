const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
// const bookmarkRoutes = require('./routes/bookmarkRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
// app.use('/bookmarks', bookmarkRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});