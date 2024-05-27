const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const { connect } = require('./configurations/database');

const app = express();
app.use(bodyParser.json());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compression());
app.use(cors());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const rideRoutes = require('./routes/ride');

app.use('/auth', authRoutes);
app.use('/rides', rideRoutes);
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Go-Bus!' });
});

connect().then(() => {
    app.listen(process.env.PORT, async () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});