const express = require('express');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

let server = app.listen('3000', function() {
  console.log('Server listening on port 3000')
})

app.use(volleyball);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(express.static('public'))
