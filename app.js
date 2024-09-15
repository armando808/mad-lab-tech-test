const express = require('express')
const sortByIdRoute = require('./routes/sortById.js')
const uppercaseSubjectsRoute = require('./routes/uppercaseSubjects.js')

const app = express()
const PORT = 3000

app.use('/books/sorted', sortByIdRoute)
app.use('/books/uppercase-subjects', uppercaseSubjectsRoute)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})