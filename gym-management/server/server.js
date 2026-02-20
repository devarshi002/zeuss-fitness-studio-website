const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);

// connect to MongoDB (UPDATED)
mongoose.connect("mongodb://127.0.0.1:27017/gym-management")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err));

app.get('/', (req, res) => {
    res.send("Gym API running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));