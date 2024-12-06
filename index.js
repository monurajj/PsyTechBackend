const express = require('express');
const mongoose = require('mongoose');
const allRoutes = require('./AllApis/AllRoutes');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoUri = 'mongodb+srv://monuRentKaro:monuRentkarodbPassword@rentkarodb.6kqj2.mongodb.net/?retryWrites=true&w=majority&appName=RentKarodb';

mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the app if the database connection fails
    });

// Routes
app.use('/api', allRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred" });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
