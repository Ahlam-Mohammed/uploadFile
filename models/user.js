const mongoose = require('mongoose');

// Connected DB
mongoose.connect('mongodb://localhost/users', (err) => {
  if (err) console.log(err);
  else console.log("DB Conected...");
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
