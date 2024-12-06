const express = require('express');
const mongoose = require('mongoose');
const allRoutes = require('./AllApis/AllRoutes')
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

mongoose
    .connect('mongodb+srv://monuk23csai:R1LaWKlMqfaqfEEE@psytech.r6qsw.mongodb.net/?retryWrites=true&w=majority&appName=Psytech')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/api', allRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app