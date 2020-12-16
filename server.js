const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));


const articleRouter = require('./routes/article');
const homeRouter = require('./routes/home');



app.use(methodOverride('_method'));

//use ejs as templating engine 
app.set('view-engine', 'ejs');


//set the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});



//routers

app.use('/article',articleRouter);
app.use('/',homeRouter)




app.listen(5000, () => {
    console.log(`Server started on port 5000`);
});