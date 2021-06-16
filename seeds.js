const mongoose = require('mongoose')
const Food = require('./models/food')

//pre-populate data into mongodb for testing (optional) 
mongoose.connect('mongodb://localhost:27017/myStash', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

const seedProducts = [{
        name: 'Carrots',
        category: 'produce',
        location: 'fridge',
        expiryDate: '2021-06-09'
    },
    {
        name: 'Fusilli',
        category: 'dry good',
        location: 'pantry',
        expiryDate: '2022-12-09'
    },
    {
        name: 'Pepperoni Pizza',
        category: 'snack',
        location: 'deep freeze',
        expiryDate: '2021-11-01'
    },
]

Food.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })