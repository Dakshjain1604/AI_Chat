const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String
});


const User = mongoose.model('User', userSchema);


module.exports={
    User
}