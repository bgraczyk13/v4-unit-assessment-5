require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')




const PORT = 3000;

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

massive({
connectionString: CONNECTION_STRING,
ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie: maxAge
}));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(3000, _ => console.log(`running on ${3000}`));