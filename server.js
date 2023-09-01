const express = require("express")
const dotenv = require("dotenv").config()


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use("/user", require('./routes/userRoutes'))
app.use("/table", require('./routes/tableRoutes'))
app.use("/column", require('./routes/columnRoutes'))
app.use("/card", require('./routes/cardRoutes'))

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})