const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', text => text.toUpperCase());

// Register Handlebars view engine
// app.engine('handlebars', exphbs());
// Use Handlebars view engine
// app.set('view engine', 'handlebars');



//next tell your middleware that it is done, that it should move to the next request
//req help us get info about our client
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance')
// })

//lets use a middleware, we will specify the right path using "__dirname". It is important we define this after the maintenance middleware
app.use(express.static(__dirname + '/public'));


//setting up routes:
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    //lets pass an object:
    // res.send({
    //     name: 'Steven',
    //     Likes: [
    //         'BasketBall',
    //         'Writing Code'
    //     ]
    // })
    res.render('home', {
        pageTitle: 'Welcome to this page',
        // currentYear: new Date().getFullYear()
        welcomeMessage: 'This is the best website in the world'
    })
})

app.get('/about', (req, res) => {
    // res.send('About page')
    res.render('about', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'Portfolio Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle request'
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
    
}) //this makes sure the app runs infinitely,except it crashes or u stop it