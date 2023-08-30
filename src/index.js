
const  express = require('express')
const path = require('path')
const  app = express()
const route = require('./routes')
const exphbs =require('express-handlebars')
const db = require('./config/db')
const methodOverride = require('method-override')
const  passport = require("passport")
const bodyParser = require("body-parser")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
app.use(methodOverride('_method'))
const User = require('./app/models/User')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
// cấu hình và sử dụng passport
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to db
db.connect()

//file static
app.use(express.static(__dirname + '/public'));

//use extname hbs
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: "main",
    helpers: {
        sum: (a)=> a+1
    }
    
}));
// Rendering engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
console.log(path.join(__dirname, 'resources/views'));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
// Routes init 
route(app)

app.listen(3000)
