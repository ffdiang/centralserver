const express = require("express");
const app = express();
//const pool = require("./db");
const pool = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    res.send(`<h1>Central server/h1>`)

});



app.use("/dept-auth", require("./routes/deptAuth"));
app.use("/dept-data", require("./routes/deptData"));
app.use("/administrator", require("./routes/administrator"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Central Server Running at PORT: ${PORT}`)
}) 