require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const dataRoutes = require('./routes/dataRoutes');
const app = express();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

app.use(express.json());


mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to the database...');
            console.log('Listening on port ', process.env.PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });

const requestMapper = '/api/v1';
app.use(requestMapper + '/data', dataRoutes);


app.use((req, res) => {
    res.status(404).json({ error: "No such method exists" });
});
