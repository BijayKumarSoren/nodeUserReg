const express    = require('express')
const mongoose   = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt  = require('bcryptjs')
const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect('mongodb://127.0.0.1:27017/registerdb');
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database connection Established!')
})

const userSchema   = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)


bcrypt.hash("asdf1234", 10, function(err, hashedPass) {
    if(err) {
        console.log("Error in Hashing!!")
    }

    let user = new User ({
        name :"bijay",
        email: "bijay@gmail.com",
        phone: "1234567890",
        password: hashedPass
    })
    user.save()
    .then(user => {
        console.log('User Added Successfully!') 
    })
    .catch(error => {
            console.log('An Error Occured!')
    })
})

app.listen(PORT, ()=> {
    console.log('Server is running on port ${PORT}')
})
