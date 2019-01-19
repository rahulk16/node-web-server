const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 5050;

var app = express();


app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials/');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to fetch data!!!');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to Home Page :)'
  });
});

app.get('/about',(req,res) => {
	res.render('about.hbs',{
    pageTitle: 'About',
  });
});

app.get('/bad', (req,res) => {
	res.send({
		errorMessage: 'Unable to fetch data.'
	});
});

app.listen(port, () => {
	console.log(`Server is up at port ${port}`);
});
