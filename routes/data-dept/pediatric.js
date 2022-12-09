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
router.get("/get-all-vac/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT vac_id, vac_name, vac_desc, vac_remarks
        FROM public."Vaccination";
        `,);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.get("/get-vac/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT vac_id, vac_name, vac_desc, vac_remarks
        FROM public."Vaccination";
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.post("/add-vac/", async (req, res) => {
    const {
        vac_name,
        vac_desc,
        vac_remarks
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public."Vaccination"(
             vac_name, vac_desc, vac_remarks)
            VALUES ( $1, $2, $3)
        `, [vac_name,
            vac_desc,
            vac_remarks]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.put("/edit-vac/:id", async (req, res) => {
    const {
        vac_name,
        vac_desc,
        vac_remarks
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public."Vaccination"
        SET  vac_name=$2, vac_desc=$3, vac_remarks=$4
        WHERE vac_id=$1;
        `, [req.params.id,
            vac_name,
            vac_desc,
            vac_remarks]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.delete("/delete-vac/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public."Vaccination"
        WHERE vac_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.get("/get-program/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT vax_prog_id, prog_name, prog_start, prog_end, barangay
        FROM public.vax_program;
        `,);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.get("/get-program/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT vax_prog_id, prog_name, prog_start, prog_end, barangay
        FROM public.vax_program
        where vax_prog_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.post("/add-program/", async (req, res) => {
    const {
        prog_name, prog_start, prog_end, barangay
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.vax_program(
             prog_name, prog_start, prog_end, barangay)
            VALUES ( $1, $2, $3, $4)
        `, [prog_name, prog_start, prog_end, barangay]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.put("/edit-program/:id", async (req, res) => {
    const {
        prog_name, prog_start, prog_end, barangay
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.vax_program
        SET prog_name=$2, prog_start=$3, prog_end=$4, barangay=$5
        WHERE vax_prog_id=$1;
        `, [req.params.id, prog_name, prog_start, prog_end, barangay]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.delete("/delete-program/:id", async (req, res) => {
    const {
        prog_name, prog_start, prog_end, barangay
    } = req.body;
    try {
        const user = await pool.query(`DELETE FROM public.vax_program
        WHERE vax_prog_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
module.exports = router; 