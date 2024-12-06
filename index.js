const express = require('express');
const mongoose = require('mongoose');
const allRoutes = require('./AllApis/AllRoutes')

const app = express();
const PORT = 5001;

app.use(express.json());
// monuk23csai
// R1LaWKlMqfaqfEEE
// Connect to MongoDB
mongoose
    .connect('mongodb+srv://monuk23csai:R1LaWKlMqfaqfEEE@psytech.r6qsw.mongodb.net/?retryWrites=true&w=majority&appName=Psytech', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/api', allRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app