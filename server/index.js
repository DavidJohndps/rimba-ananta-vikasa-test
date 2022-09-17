const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const indexRoute = require('./Route/index');
const userRoute = require('./Route/userRoute');
const productRoute = require('./Route/productRoute');

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));

app.use('/api',indexRoute);
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    app.listen(PORT);
    console.log(`🚀 Server is airborne at http://localhost:${PORT}`)
})