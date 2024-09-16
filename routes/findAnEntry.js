const express = require("express")
const fetchBooks = require("../utils/fetchBooks")

const router = express.Router()

router.get("/", async (req, res) => {
    let pageContent = ""
    let foundBook = null
    let data = await fetchBooks(1)

    for (let page = 1; data && data.next; page++) {
        if (data.error) {
            return res.status(data.status || 500).send(`<h1>${data.message}</h1>`)
        }

        foundBook = data.results.find(book => {
            const authors = book.authors.map(author => author.name)
            const hasAuthor = authors.includes("Dostoyevsky, Fyodor")
            return book.title === "Short Stories" && hasAuthor
        })

        if (foundBook) {
            pageContent = `
                <html>
                <head>
                    <title>Book Found</title>
                    <style>
                        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
                        h1 { color: #2c3e50; font-weight: 600; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
                        ul { list-style-type: circle; padding-left: 20px; }
                        li { margin: 10px 0; }
                        li strong { font-size: 1.2em; color: #2980b9; }
                    </style>
                </head>
                <body>
                    <h1>Found on page ${page}</h1>
                    <ul>
                        <li>
                            <strong>Title:</strong> ${foundBook.title}<br>
                            <strong>ID:</strong> ${foundBook.id}<br>
                            <strong>Authors:</strong> ${foundBook.authors.map(author => `${author.name} (Born: ${author.birth_year}, Died: ${author.death_year})`).join(", ")}<br>
                            <strong>Birth Year:</strong> ${foundBook.authors.map(author => author.birth_year).join(", ")}<br>
                            <strong>Death Year:</strong> ${foundBook.authors.map(author => author.death_year).join(", ")}<br>
                            <strong>Subjects:</strong> ${foundBook.subjects.join(", ")}<br>
                            <strong>Bookshelves:</strong> ${foundBook.bookshelves.join(", ")}<br>
                            <strong>Languages:</strong> ${foundBook.languages.join(", ")}<br>
                            <strong>Download Count:</strong> ${foundBook.download_count}<br>
                        </li>
                    </ul>
                </body>
                </html>
            `;
            return res.send(pageContent);
        }
    
        data = await fetchBooks(page + 1);
    
        if (!data.next) {
            return res.send("<h1>Book not found</h1>");
        }
    }
})

module.exports = router