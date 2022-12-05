const router = require("express").Router();
const pool = require("../../db");


router.get("/", (req, res) => {

    res.send(`Disease Surveilance System`)

});


module.exports = router; 