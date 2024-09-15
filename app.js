const express = require('express')
const sortByIdRoute = require('./routes/sortById.js')

const app = express()
const PORT = 3000

app.use('/books/sorted', sortByIdRoute)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})