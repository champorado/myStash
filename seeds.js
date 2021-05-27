const mongoose = require('mongoose')
const Food = require('./models/food')

mongoose.connect('mongodb://localhost:27017/myStash', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })



// const f = new Food({
//     name: 'Grapefruit',
//     category: 'produce',
//     expiryDate: '2021-12-09'
// })

// f.save()
//     .then(f => {
//         console.log(f)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [{
        name: 'Carrots',
        category: 'produce',
        expiryDate: '2021-06-09'
    },
    {
        name: 'Fusilli',
        category: 'dry goods',
        expiryDate: '2022-12-09'
    },
    {
        name: 'Pepperoni Pizza',
        category: 'snack',
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