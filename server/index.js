const cors = require("cors");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/users",userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("DB connected");
})
.catch((err) => {
  console.error("Mongo Error:", err);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});