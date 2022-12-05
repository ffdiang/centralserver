const router = require("express").Router();
const pool = require("../../db");
const validator = require("../../middleware/validator")
const tokenGenerator = require("../../utilities/tokenGenerator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const department = 3;


router.post("/register", validator, async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const user = await pool.query(`select * from public."Administrators" where admin_email = $1`, [email]);
        if (user.rows.length !== 0) {
            return res.status(401).json("Admin already exist")
        }
        const round = 10;
        const salt = await bcrypt.genSalt(round);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(`INSERT INTO public."Administrators"(
            department_id, admin_name, admin_email, admin_password)
               VALUES ( $1,$2,$3,$4) returning *`,
            [department, name, email, encryptedPassword]);

        // generate token

        const access = tokenGenerator(newUser.rows[0].admin_id);


        res.json({ access })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }


});

router.post("/login", validator, async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await pool.query(`select * from public."Administrators"where admin_email = $1`, [email])

        if (user.rows.length === 0) {
            return res.status(401).json("User Not found");
        }
        if (user.rows[0].department_id != department) {
            return res.status(401).json("Unauthorized")
        }


        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].admin_password);

        if (!validPassword) {
            return res.status(401).json("Invalid Password");
        }

        // give token
        console.log(user.rows[0].admin_id);
        const access = tokenGenerator(user.rows[0].admin_id);




        res.json({ access })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }


});


module.exports = router; 