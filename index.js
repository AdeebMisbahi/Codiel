// acquire express  & cookie
const express=require('express');
const cookieParser = require('cookie-parser');

// app will run on this port
const port=3000;
const app=express();
// acquire mongodb database
const db=require('./config/mongoose')
// require expres-ejs-layout
const expressLayouts=require('express-ejs-layouts');

app.use(express.urlencoded());

app.use(cookieParser());
// access static file
app.use(express.static('./assets'));
// and then use express layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views')



app.listen(port, function(err){
    if(err){
        console.log(`ERROR While Server is going Up ${err}`);
        return;
    }
    console.log(`Server is up and running on Port: ${port}`)
})
