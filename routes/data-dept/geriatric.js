const router = require("express").Router();
const pool = require("../../db");

router.get("/", (req, res) => {

    res.send(`Geriatric Systems`)

});

///////////// caretaker

router.post("/add-caretaker/", async (req, res) => {
    const {
        last_name, first_name, Address, Gender, Age, Civil_status, birthdate
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.geriatric_caretaker(
            last_name, first_name, "Address", "Gender", "Age", "Civil_status", birthdate)
            VALUES ( $1, $2, $3, $4, $5, $6, $7);
        `, [last_name, first_name, Address, Gender, Age, Civil_status, birthdate]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-caretaker/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT caretaker_id, last_name, first_name, "Address", "Gender", "Age", "Civil_status", birthdate
        FROM public.geriatric_caretaker
        ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-caretaker/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT caretaker_id, last_name, first_name, "Address", "Gender", "Age", "Civil_status", birthdate
        FROM public.geriatric_caretaker
        where caretaker_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-caretaker/:id", async (req, res) => {
    const {
        last_name, first_name, Address, Gender, Age, Civil_status, birthdate
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.geriatric_caretaker
        SET  last_name=$2, first_name=$3, "Address"=$4, "Gender"=$5, "Age"=$6, "Civil_status"=$7, birthdate=$8
        WHERE caretaker_id=$1;
        `, [req.params.id,
            last_name, first_name, Address, Gender, Age, Civil_status, birthdate]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-caretaker/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.geriatric_caretaker
        WHERE caretaker_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
///////////// record
router.post("/add-rec/", async (req, res) => {
    const {
        patient_id, caretaker
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.geriatric_record(
            patient_id, date_created, caretaker)
            VALUES ($1, CURRENT_TIMESTAMP, $2);
        `, [patient_id, caretaker]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-rec/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT r.*, n.*, p.*
        FROM public.geriatric_record r
        LEFT OUTER JOIN public."geriatric_caretaker" n on n.caretaker_id = r.caretaker
        LEFT OUTER JOIN public."Patient" p on p.patient_id =r.patient_id
        ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-rec/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT r.*, n.*, p.*
        FROM public.geriatric_record r
        LEFT OUTER JOIN public."geriatric_caretaker" n on n.caretaker_id = r.caretaker
        LEFT OUTER JOIN public."Patient" p on p.patient_id =r.patient_id
        where geriatric_rec_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-rec/:id", async (req, res) => {
    const {
        patient_id, caretaker
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.geriatric_record
        SET  patient_id=$2, caretaker=$3
        WHERE geriatric_rec_id=$1
        `, [req.params.id,
            patient_id, caretaker]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-rec/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.geriatric_record
        WHERE geriatric_rec_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
/////////// sched
router.post("/add-sched/", async (req, res) => {
    const {
        record, time, date
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.geriatric_schedule(
             record, "time", date)
            VALUES ( $1, $2, $3);
        `, [record, time, date]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-sched/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT r.*, n.*, p.*
        FROM public.geriatric_schedule r
        LEFT OUTER JOIN public."geriatric_record" n on n.geriatric_rec_id = r.record
        LEFT OUTER JOIN public."Patient" p on p.patient_id =n.patient_id

        ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-sched/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT r.*, n.*, p.*
        FROM public.geriatric_schedule r
        LEFT OUTER JOIN public."geriatric_record" n on n.geriatric_rec_id = r.record
        LEFT OUTER JOIN public."Patient" p on p.patient_id =n.patient_id
        where geriatric_sched_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-sched/:id", async (req, res) => {
    const {
        record, time, date
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.geriatric_schedule
        SET  record=$2,"time"=$3, date=$4
        WHERE geriatric_sched_id=$1;
        `, [req.params.id,
            record, time, date]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-rec/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.geriatric_schedule
        WHERE geriatric_sched_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
module.exports = router; 