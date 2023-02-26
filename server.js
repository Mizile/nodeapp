const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const dotenv = require('dotenv')
const cred = dotenv.config()

// Check for errors loading the .env file
if (cred.error) {
    throw cred.error;
}
  
// Access your environment variables like this:
const dbUsername = cred.parsed.DB_USERNAME;
const dbPassword = cred.parsed.DB_PASSWORD;


const port = 3000
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@mizcluster.mtxyeqg.mongodb.net/?retryWrites=true&w=majority`


app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Blog page test')
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.connect(uri)
.then(() => { 
    console.log('Connected to atlas or cloud!')
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
}).catch((error) => {
    console.log(error)
})