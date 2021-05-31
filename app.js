const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
// const ejs = require('ejs') //for js enabled html
const ejsMate = require('ejs-mate');
const session = require('express-session') //storing cookies session
const methodOverride = require('method-override'); //allows you to add PUT/DELETE methods

//models

const Food = require('./models/food')

//authentication
const passport = require('passport');
const LocalStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize');

//validation
const joi = require('joi');
const flash = require('connect-flash');
const { emitWarning } = require('process');


//connects mongoDB and MongoDB
mongoose.connect('mongodb://localhost:27017/myStash', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
//'view' direcory for what users will see
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true })) //middleware that parses info submitted
app.use(methodOverride('_method'))

//to include .css files on .ejs files
app.use(express.static(__dirname + '/public'));


const port = 3000;
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('users/register')
})

app.get('/login', (req, res) => {
    res.send('Login to myStash')
})

app.get('/logout', (req, res) => {
    res.send('Logout of MyStash')
})

//categories of all foods
const categories = ['produce', 'meat', 'seafood', 'bread', 'dry good', 'snack', 'dairy']
    //locations of foods
const locations = ['fridge', 'deep freeze', 'pantry', 'ottoman', 'emergency', 'shelf']
    //displays all foods

const foodNum = 1;

app.get('/foods', async(req, res) => {
    const foods = await Food.find({})

    res.render('products/index', { foods, foodNum })
})

//loads page to input new food
app.get('/foods/new', (req, res) => {
    res.render('products/new', { categories, locations })
})

//submits new food info
app.post('/foods', async(req, res) => {
    //takes req.body info and passes into new Food (using model)
    const newFood = new Food(req.body);
    await newFood.save();
    console.log(newFood)
    res.redirect(`foods/${newFood._id}`)
})

app.delete('/foods/:id', async(req, res) => {
    //extract id from params
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id)
    res.redirect('/foods');
})

app.get('/foods/:id/edit', async(req, res) => {
    //find food by id & then pass it through page to load
    const { id } = req.params;
    const food = await Food.findById(id)
    res.render('products/edit', { food, categories, locations })
})

//update product
app.put('/foods/:id', async(req, res) => {
    const { id } = req.params;
    //find product
    const food = await Food.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/foods/${food._id}`)
})

//displays food info
app.get('/foods/:id', async(req, res) => {
    const { id } = req.params;
    const food = await Food.findById(id)
    console.log(food)
    res.render('products/show', { food })
})



app.get('/recommendations', (req, res) => {
    res.render('products/recommendations')
})

app.get('/help', (req, res) => {
    res.send('Contact admin for help...')
})







app.listen(port, () => {
    console.log(`LISTENING FROM PORT ${port}!`)
})