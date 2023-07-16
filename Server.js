import express, { response } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import bcrypt from 'bcrypt'
import knex from 'knex'
import handleSignin from './controller/Signin.js'
import handleRegister from './controller/Register.js'
import handleProfileGet from "./controller/Profile.js";
import handleImageEntry from "./controller/Image.js";

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: '8328452',
        database: 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data)
// })

const app = express()
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.send('its working')})
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
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${PORT}`)
})