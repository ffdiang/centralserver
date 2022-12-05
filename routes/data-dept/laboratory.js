const router = require("express").Router();
const pool = require("../../db");



router.get("/", (req, res) => {

    res.send(`Laboratory Systems`)

});



module.exports = router; 