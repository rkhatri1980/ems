var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./config/config');
var bodyParser = require('body-parser');

//mongoose connection
//
mongoose.connect(config.url);

//database connection
mongoose.connection.on('connected', function () {
    console.log('Database connected at ', config.url);
});

//error connection
mongoose.connection.on('error', function (err) {
    console.log('Database connection error ' + err);
});

//set middleware
//CORS
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Setting up public directory
app.use(express.static(path.join(__dirname, 'public')));

//test the index route
app.get('/', function (req, res) {
    res.send('Welcome to home page');
});



//set route
var router = require('./routes/employee');
var userRoute = require('./routes/user');
app.use('/employee', router);
app.use('/users', userRoute);

//fire the server
// var port =  3000;

// app.listen(port, function () {
//    console.log('server is running on port ', port);
// });

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));