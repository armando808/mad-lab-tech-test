const express = require("express")
const fetchBooks = require("../utils/fetchBooks")

const router = express.Router()

router.get('/', async (req, res) => {
    const data = await fetchBooks()

    if (data.error) {
        return res.status(data.status || 500).send(`<h1>${data.message}</h1>`)
    }

    if (data && data.results) {
        const uppercaseSubjects = data.results.map(book => {
            book.subjects = book.subjects.map(subject => subject.toUpperCase())
            return book
        })

        let pageContent = `
        <html>
        <head>
            <title>Books with Uppercase Subjects</title>
            <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
                h1 { color: #2c3e50; font-weight: 600; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
                ul { list-style-type: circle; padding-left: 20px; }
                li { margin: 10px 0; }
                li strong { font-size: 1.2em; color: #2980b9; }
            </style>
        </head>
        <body>
            <h1>Books with Uppercase Subjects</h1>
            <a class="home-btn" href="/books/tasks-home">Home</a>
            <ul>
        `;

        uppercaseSubjects.forEach(book => {
            pageContent += `
                <li>
                    <strong>Title:</strong> ${book.title}<br>
                    <strong>ID:</strong> ${book.id}<br>
                    <strong>Authors:</strong> ${book.authors.map(author => author.name).join(", ")}<br>
                    <strong>Subjects:</strong> ${book.subjects.join(", ")}<br>
                    <strong>Bookshelves:</strong> ${book.bookshelves.join(", ")}<br>
                    <strong>Languages:</strong> ${book.languages.join(", ")}<br>
                    <strong>Download Count:</strong> ${book.download_count}<br>
                </li>
                <hr>
            `;
        });

        pageContent += `
            </ul>
        </body>
        </html>
        `;

        res.send(pageContent)
    } else {
        res.send("<h1>Error fetching data from Gutenberg API</h1>")
    }
})

module.exports = router