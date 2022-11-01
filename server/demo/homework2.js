const express = require("express")
const app = express()
const cors = require("cors")

app.cors()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use()

app.listen(3300, () => {
    console.log("http://localhost:3300")
})