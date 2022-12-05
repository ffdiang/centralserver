const router = require("express").Router();
const pool = require("../../db");


router.get("/", (req, res) => {

    res.send(`Pediatric Systems`)

});

router.post("/add-pedia-record", async (req, res) => {
    const {
        patient,
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public."Pediatric_record"(
             date_created, patient)
            VALUES (CURRENT_TIMESTAMP,$1) returning *`, [patient]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.post("/add-pedia-record-vacc", async (req, res) => {
    const {
        vacc,
        pedia_id
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public."onVaccination"(
            pedia_id, vac_id,  date_created)
            VALUES ($1, $2, CURRENT_TIMESTAMP);`, [pedia_id, vacc]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.get("/get-pedia-record-vacc/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT o.pedia_id, v.vac_name,n.patient_id, n.first_name,n.last_name, o.date_created
        FROM public."onVaccination" o
        LEFT OUTER JOIN public."Vaccination" v on v.vac_id = o.vac_id
        LEFT OUTER JOIN public."Pediatric_record" p on p.pedia_id = o.pedia_id
        LEFT OUTER JOIN public."Patient" n on n.patient_id = p.patient
        where o.pedia_id = $1`, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.get("/get-pedia-record-vacc/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT o.pedia_id, v.vac_name,n.patient_id, n.first_name,n.last_name, o.date_created
        FROM public."onVaccination" o
        LEFT OUTER JOIN public."Vaccination" v on v.vac_id = o.vac_id
        LEFT OUTER JOIN public."Pediatric_record" p on p.pedia_id = o.pedia_id
        LEFT OUTER JOIN public."Patient" n on n.patient_id = p.patient
        `, []);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
module.exports = router;
router.get("/get-pedia-record-vacc-patient/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT o.pedia_id, v.vac_name,p.patient, n.first_name,n.last_name, o.date_created
        FROM public."onVaccination" o
        LEFT OUTER JOIN public."Vaccination" v on v.vac_id = o.vac_id
        LEFT OUTER JOIN public."Pediatric_record" p on p.pedia_id = o.pedia_id
        LEFT OUTER JOIN public."Patient" n on n.patient_id = p.patient
        where p.patient = $1
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
module.exports = router; 