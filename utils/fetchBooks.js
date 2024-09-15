const axios = require("axios") 

const gutenAPI = axios.create({
    baseURL: "https://gutendex.com/books/"
})

async function fetchBooks(page = 1) {
    try {
        const response = await gutenAPI.get(`?page=${page}`)
        return response.data
    } catch (error) {
        console.error("Error fetching data from Gutenberg API:", error)
        return null
    }
}

module.exports = fetchBooks