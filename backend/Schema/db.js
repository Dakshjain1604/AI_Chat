const mongoose = require('mongoose');
require('dotenv').config();

// connect to NEW DB with mongoose
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Chat" // 👈 this creates/uses the new DB
    });
    console.log("✅ Connected to MongoDB:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}

connectDB();

// define schema & model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
