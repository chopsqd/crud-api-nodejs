import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 5000

app.use(bodyParser.json())

app.listen(PORT, (err) => {
    if(err) {
        console.warn('Error: ', err)
    }

    console.log(`Server running on port: ${PORT}\nhttp://localhost:${PORT}`)
})