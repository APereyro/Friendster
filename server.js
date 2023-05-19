const express = require("express");
const db = require("./config/connection");
const userRoutes = require("./routes/api/user-route")
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

// mongoose.connect('mongodb://localhost:27017/friendster', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRoutes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
