const axios = require("axios")

const gutenAPI = axios.create({
    baseURL: "https://gutendex.com/books/"
})

async function fetchBooks(page = 1) {
    try {
        const response = await gutenAPI.get(`?page=${page}`)

        if (response.status === 200) {
            return response.data
        } else {
            console.error(`Error: Received status code ${response.status}`)
            return {
                error: true,
                status: response.status,
                message: `Unexpected status code: ${response.status}`
            }
        }
    } catch (error) {
        if (error.response) {
            console.error(`Error: ${error.message}, Status: ${error.response.status}`)
            return {
                error: true,
                status: error.response.status,
                message: `Server error: ${error.response.status}`
            };
        } else if (error.request) {
            console.error("Error: No response received from server")
            return {
                error: true,
                status: null,
                message: "No response received from server"
            }
        } else {
            console.error("Error:", error.message)
            return {
                error: true,
                status: null,
                message: "Unknown error occurred"
            }
        }
    }
}

module.exports = fetchBooks
