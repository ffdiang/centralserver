const router = require("express").Router();
const pool = require("../../db");

router.get("/", (req, res) => {

    res.send(`Maternal Systems`)

});



module.exports = router; 