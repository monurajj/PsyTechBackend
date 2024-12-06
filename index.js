const express = require('express');
const mongoose = require('mongoose');
const allRoutes = require('./allapis/allroutes');

const app = express();
const PORT = 5001;

app.use(express.json());

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/psytechbackend', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/api', allRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
