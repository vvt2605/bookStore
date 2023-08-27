
const  express = require('express')
const path = require('path');
const  app = express()
const route = require('./routes')
const exphbs =require('express-handlebars');
const db = require('./config/db')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

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
// Routes init 
route(app)

app.listen(3000)
