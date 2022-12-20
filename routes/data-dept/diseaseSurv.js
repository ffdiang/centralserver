const router = require("express").Router();
const pool = require("../../db");


router.get("/", (req, res) => {

    res.send(`Disease Surveilance System`)

});



router.get("/disease-cases/", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT * FROM public."Disease_records"
        `);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }

});
router.get("/diseases/", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT * FROM public."Diseases"
        `);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }

});
router.get("/get-map-data/:id", async (req, res) => {
    var result = []
    try {
        const all = await pool.query(`SELECT  "Disease", COUNT("Disease")
        FROM public."Disease_records"
        where "Disease" = $1
        GROUP BY
       "Disease"
       ORDER BY "Disease"`, [req.params.id]);
        const iso = await pool.query(`SELECT  "District", COUNT("Disease")
        FROM public."Disease_records"
        where "Disease" =$1
        GROUP BY
       "District"
       ORDER BY "District"`, [req.params.id]);


        iso.rows.map((value, index) => {
            all.rows.map((value1, index1) => {
                var percent = (value.count / value1.count) + .20
                result.push({ district: value.District, percent: percent, total: value1.count, local: value.count })
            })
        })


        res.json(result)
    } catch (error) {
        return res.status(405).json(error.message)
    }

});
router.get("/get-map-top/:id", async (req, res) => {
    var result = 0;
    try {
        const top = await pool.query(`SELECT  "District", COUNT("Disease")
        FROM public."Disease_records"
        where "Disease" =$1
        GROUP BY
       "District"
       ORDER BY "District"`, [req.params.id]);

        result = (Math.max(top.rows[0].count))
        top.rows.map((value, index) => {
            if (value.count == result) {
                res.json({ disesase: value.District, cases: value.count })
            }
        })


    } catch (error) {
        return res.status(405).json(error.message)
    }

});
router.get("/districts/", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT * FROM public."District"
        ORDER BY district_id ASC 
        `);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }

});
router.get("/all-chart-data/", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT  d.district_name, COUNT("Disease")
        FROM public."Disease_records" r
        LEFT OUTER JOIN public."District" d on r."District" = d.district_id
        GROUP BY
        "District",
       d.district_name
       ORDER BY "District",d.district_name
        `);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }

});
module.exports = router; 