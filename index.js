// acquire express  & cookie
const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
// app will run on this port
const port=3000;
// require expres-ejs-layout
const expressLayouts=require('express-ejs-layouts');
// acquire mongodb database
const db=require('./config/mongoose')
// used for cookie
// require express-session
const session=require('express-session');
// require passport and passport-local
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware')
// related to convert scss file to css
const path = require('path');
const sass=require('node-sass');
const scssSrcDir = path.join(__dirname, 'assets', 'scss');
const cssDestDir = path.join(__dirname, 'assets', 'css');

// Custom middleware to compile SCSS to CSS
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    const scssFilePath = path.join(scssSrcDir, req.url.replace('/css/', '').replace('.css', '.scss'));
    
    sass.render({
      file: scssFilePath,
      outputStyle: 'expanded' // Adjust the output style as needed
    }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      res.setHeader('Content-Type', 'text/css');
      res.send(result.css);
    });
  } else {
    next();
  }
});

// Serve static files from the CSS directory
app.use('/css', express.static(cssDestDir));  // converted scss to css 



app.use(express.urlencoded());

app.use(cookieParser());
// access static file
app.use(express.static('./assets'));
// and then use express layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views')
// 
app.use(session({
    name:'codial',
    // TODO change secret before developement in production
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },

    store: MongoStore.create(
        {
        mongoUrl:('mongodb://127.0.0.1:27017/codeial_development'),
        mongooseConnection:db,
        autoRemove: 'disabled'
        },
        function(err){
            console.log((err || 'connect-mongodb connection is ok'))
        }

    )

}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());

app.use(customMware.setFlash)

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`ERROR While Server is going Up ${err}`);
        return;
    }
    console.log(`Server is up and running on Port: ${port}`)
})
