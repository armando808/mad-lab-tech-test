const express = require('express')
const sortByIdRoute = require('./routes/sortById.js')
const uppercaseSubjectsRoute = require('./routes/uppercaseSubjects.js')
const recentAuthorsRoute = require('./routes/filterByDate.js')

const app = express()
const PORT = 3000

app.use('/books/sorted', sortByIdRoute)
app.use('/books/uppercase-subjects', uppercaseSubjectsRoute)
app.use('/books/recent-authors', recentAuthorsRoute)

app.use((req, res) => {
    res.status(404).send("<h1>404 - Not Found</h1>")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("<h1>500 - Internal Server Error</h1>")
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})