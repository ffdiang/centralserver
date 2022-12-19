const router = require("express").Router();
const pool = require("../../db");

router.get("/", (req, res) => {

    res.send(`Maternal Systems`)

});


router.post("/add-rec/", async (req, res) => {
    const {
        patient_id
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.maternal_records(
             patient_id, date_created)
            VALUES ($1,  CURRENT_TIMESTAMP);
        `, [patient_id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-rec/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT maternal_rec_id, n.*, date_created
        FROM public.maternal_records m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-rec/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT maternal_rec_id, n.*, date_created
        FROM public.maternal_records m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id
        where maternal_rec_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-rec/:id", async (req, res) => {
    const {
        patient_id
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.maternal_records
        SET patient_id=$2,
        WHERE maternal_rec_id=$1;
        `, [req.params.id,
            patient_id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-rec/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.maternal_records
        WHERE maternal_rec_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
///////////////////////////////////////
router.post("/add-apt/", async (req, res) => {
    const {
        record_id, apt_date, apt_time
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.maternal_apt(
             record_id, apt_date, apt_time)
            VALUES ($1, $2, $3);;
        `, [record_id, apt_date, apt_time]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-apt/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT apt_id, record_id, p.*, apt_date, apt_time
        FROM public.maternal_apt a
        LEFT OUTER JOIN public."maternal_records" n on n.maternal_rec_id = a.record_id
        LEFT OUTER JOIN public."Patient" p on p.patient_id =n.patient_id
        ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-apt/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT apt_id, record_id, p.*, apt_date, apt_time
        FROM public.maternal_apt a
        LEFT OUTER JOIN public."maternal_records" n on n.maternal_rec_id = a.record_id
        LEFT OUTER JOIN public."Patient" p on p.patient_id =n.patient_id
        where apt_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-apt/:id", async (req, res) => {
    const {
        record_id,
        apt_date, apt_time
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.maternal_apt
        SET  record_id=$2, apt_date=$3, apt_time=$4
        WHERE apt_id=$1;
        `, [req.params.id,
            record_id,
            apt_date,
            apt_time]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-apt/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.maternal_apt
        WHERE record_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
////////////////////////
router.post("/add-present-preg/", async (req, res) => {
    const {
        record_id, visit, AOG, BP, temp, PR, FUNDUS, PRESNTATION, POSITION, HT, EXT_EDEMA, HEIGHT, WEIGHT, ABNORMAL_SYMPTOMS, NEXT_VISIT
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.present_preg(
             record_id, visit, date, "AOG", "BP", temp, "PR", "FUNDUS", "PRESNTATION", "POSITION", "FHT", "EXT_EDEMA", "HEIGHT", "WEIGHT", "ABNORMAL_SYMPTOMS", "NEXT_VISIT")
            VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
        `, [record_id, visit, AOG, BP, temp, PR, FUNDUS, PRESNTATION, POSITION, HT, EXT_EDEMA, HEIGHT, WEIGHT, ABNORMAL_SYMPTOMS, NEXT_VISIT]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-present-preg/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT *
        FROM public.present_preg
        ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-present-preg/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT *
        FROM public.present_preg
        where pp_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-present-preg/:id", async (req, res) => {
    const {
        record_id, visit, date, AOG, BP, temp, PR, FUNDUS, PRESNTATION, POSITION, HT, EXT_EDEMA, HEIGHT, WEIGHT, ABNORMAL_SYMPTOMS, NEXT_VISIT
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.present_preg
        SET  record_id=$2, visit=$3, date=$4, "AOG"=$5, "BP"=$6, temp=$7, "PR"=$8, "FUNDUS"=$9, "PRESNTATION"=$10, "POSITION"=$11, "FHT"=$12, "EXT_EDEMA"=$13, "HEIGHT"=$14, "WEIGHT"=$15, "ABNORMAL_SYMPTOMS"=$16, "NEXT_VISIT"=$17
        WHERE pp_id=$1;
        `, [req.params.id,
            record_id, visit, date, AOG, BP, temp, PR, FUNDUS, PRESNTATION, POSITION, HT, EXT_EDEMA, HEIGHT, WEIGHT, ABNORMAL_SYMPTOMS, NEXT_VISIT]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-apt/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.present_preg
        WHERE pp_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});



module.exports = router; 