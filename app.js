'use strict';

const HTTP = require('http');

const HOSTNAME = '127.0.0.1',
    PORT = 3000;

const express = require('express'),
    session = require('express-session'), //this is middleware!!!
    app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(session({
    secret: 'your love is strong!',
    is_logged_in: 'false',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const SERVER = HTTP.createServer(app);

SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});

const rootController = require('./routes/index');
const bandsController = require('./routes/bands');
const usersController = require('./routes/users');

app.use('/', rootController);
app.use('/bands', bandsController);
app.use('/users', usersController);