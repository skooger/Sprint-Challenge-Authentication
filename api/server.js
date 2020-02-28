require("dotenv").config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const knexStore = require('connect-session-knex')(session);
const knex = require('../database/dbConfig');


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(express.json(), helmet(), cors(), session({
    name: 'user-session',
    secret: 'Kinghts of Carlos',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    store: new knexStore({
        knex: knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'session_id',
        clearInterval: 1000 * 60 * 15

    })
}))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
