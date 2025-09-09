const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));

// Define schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String
});

// Create model (represents the 'users' collection)
const User = mongoose.model('User', userSchema);


module.exports={
    User
}