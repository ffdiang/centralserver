const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization')

router.get("/getuser", authorization, async (req, res) => {

    try {

        const user = await pool.query(`select admin_name,admin_id from public."Administrators" where admin_id = $1`, [req.user.admin])

        res.json(user.rows[0])

    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server Error")
    }

})
router.get("/verify", authorization, async (req, res) => {
    try {
        console.log(true);
        res.json(true);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }


});
module.exports = router;