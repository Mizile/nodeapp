const express = require('express')
const app = express()

const port = 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello NODE API test')
})