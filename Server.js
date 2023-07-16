import express, { response } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import bcrypt from 'bcrypt'
import knex from 'knex'
import handleSignin from './controller/Signin.js'
import handleRegister from './controller/Register.js'
import handleProfileGet from "./controller/Profile.js";
import handleImageEntry from "./controller/Image.js";


const PORT = process.env.PORT || 3000;

const db = knex({
    client: 'pg',
    connection: {
        connectionString:process.env.DATABASE_URL,
        ssl: {rejectUnauthorized : false},
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data)
// })

const app = express()
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.json('its working')})
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {handleImageEntry(req, res, db)});

// app.put('/image', (req, res) => {
//     const { id } = req.body;
//     db('users').where('id', '=', id)
//         .increment('entries', 1)
//         .returning('entries')
//         .then(entries => {
//             res.json(entries[0].entries)
//         })
//         .catch(err => res.status(400).json('cannot get entries'))

// })
app.listen(PORT || 3000, () => {
    console.log(`app is running on port ${PORT}`)
})