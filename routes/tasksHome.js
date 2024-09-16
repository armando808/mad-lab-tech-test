const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    const pageContent = `
    <html>
    <head>
        <title>Gutenberg Task Home</title>
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9f9; padding: 20px; }
            h1 { color: #2c3e50; font-weight: 600; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
            ul { list-style-type: circle; padding-left: 20px; }
            li { margin: 10px 0; }
            li strong { font-size: 1.2em; color: #2980b9; }
        </style>
    </head>
    <body>
        <h1>Here you will find links to the response data for each task, displayed in a simple, user friendly format</h1>
        <h2>Please note, loading times are a little slow, especially the task 4 link, please have patience!</h2>
        <ul>
            <li><a href="/books/sorted">To view the data for task 1, the array sorting task, click here</a></li>
            <li><a href="/books/uppercase-subjects">To view the data for task 2, the uppercase subjects task, click here</a></li>
            <li><a href="/books/recent-authors">To view the data for task 3, the authors from the last 200 years task, click here</a></li>
            <li><a href="/books/find-the-book">To view the data for task 4, the find "Short Stories" task, click here</a></li>
        </ul>
    </body>
    </html>
    `;
    res.send(pageContent);
});

module.exports = router;