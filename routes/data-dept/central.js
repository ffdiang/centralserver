const router = require("express").Router();
const pool = require("../../db");

router.get("/", (req, res) => {

    res.send(`Central System`)

});
router.get("/cities/", async (req, res) => {

    try {
        const cities = await pool.query(`
        SELECT * FROM public."City"
        ORDER BY city_id ASC 
        `);

        res.json(cities.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }



});
router.get("/districts/", async (req, res) => {

    try {
        const districts = await pool.query(`
        SELECT * FROM public."District"
        ORDER BY district_id ASC 
        `);

        res.json(districts.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.get("/barangays/", async (req, res) => {

    try {
        const barangays = await pool.query(`
        SELECT * FROM public."Barangay"
        ORDER BY barangay_id ASC 
        `);

        res.json(barangays.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
module.exports = router; 