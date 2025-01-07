import express from 'express'

const App = express()


app.get('/', (request, response) => {
    response.send(`Welcome to my API`)
})





App.listen(8000, () => console.log('server is running'))