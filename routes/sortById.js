const express = require("express")
const fetchBooks = require("../utils/fetchBooks")

const router = express.Router()

router.get("/", async (req, res) => {
    const data = await fetchBooks()

    if (data && data.results) {
        const booksByIdAsc = data.results.sort((a, b) => a.id - b.id)
        let pageContent = `
        <html>
        <head>
            <title>Gutenberg Books</title>
            <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
                h1 { color: #2c3e50; font-weight: 600; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
                ul { list-style-type: circle; padding-left: 20px; }
                li { margin: 10px 0; }
                li strong { font-size: 1.2em; color: #2980b9; }
            </style>
        </head>
        <body>
            <h1>Books from Gutenberg (sorted in ascending order by ID)</h1>
            <ul>
        `;

        booksByIdAsc.forEach(book => {
            pageContent += `
                <li>
                    <strong>${book.title}</strong> by ${book.authors.map(author => author.name).join(", ")}
                    (ID: ${book.id})
                </li>
            `;
        })

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