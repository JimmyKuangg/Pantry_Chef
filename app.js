const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const bodyParser = require('body-parser');
const passport = require('passport');
const recipes = require("./routes/api/recipes");
const ingredients = require("./routes/api/ingredients");
const pantries = require("./routes/api/pantries");
const categories = require("./routes/api/categories")

const path = require('path')
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.use("/api/users", users);
app.use("/api/recipes", recipes);
app.use("/api/ingredients", ingredients);
app.use('/api/pantries', pantries)
app.use('/api/categories', categories)

app.listen(port, () => console.log(`Server is running on port ${port}`));