const router = require("express").Router();
const pool = require("../../db");


router.get("/", (req, res) => {

    res.send(`Electronic Medical Records`)

});
router.post("/add-patient", async (req, res) => {
    const {
        first_name,
        last_name,
        birth_date,
        sex,
        mother_name,
        father_name,
        contact_number,
        email,
        address_line1,
        address_line2,
        city,
        district,
        barangay
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public."Patient"(
            first_name, last_name, birth_date, sex, mother_name, father_name, contact_number, email)
           VALUES ( $1, $2, $3, $4, $5, $6, $7, $8) returning *`, [first_name, last_name, birth_date, sex, mother_name, father_name, contact_number, email]);

        const patient_id = user.rows[0].patient_id

        const address = await pool.query(`INSERT INTO public."Address"(
             patient_id, address_line1, address_line2, city, district, barangay)
            VALUES ( $1, $2, $3, $4, $5, $6);`, [patient_id, address_line1, address_line2, city, district, barangay]);

        res.send("Patient Added")
    } catch (error) {
        return res.status(405).json("Error")
    }



});
router.put("/edit-patient/:id", async (req, res) => {
    const {
        first_name,
        last_name,
        birth_date,
        sex,
        mother_name,
        father_name,
        contact_number,
        email,
        address_line1,
        address_line2,
        city,
        district,
        barangay
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public."Patient"
        SET first_name=$2, last_name=$3, sex=$4, mother_name=$5, father_name=$6, contact_number=$7, email=$8, birth_date=$9
        WHERE patient_id=$1;
        `, [req.params.id,
            first_name,
            last_name,
            sex,
            mother_name,
            father_name,
            contact_number,
            email,
            birth_date
        ]);
        const add = await pool.query(`UPDATE public."Address"
            SET  address_line1=$2, address_line2=$3, city=$4, district=$5, barangay=$6
            WHERE patient_id=$1;
            `, [req.params.id,
            address_line1,
            address_line2,
            city,
            district,
            barangay
        ]);





        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.get("/patient/:id", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT p.*, a.address_line1, a.address_line2, c.city_name, d.district_name, b.barangay_name
        FROM public."Patient" p
        LEFT OUTER JOIN public."Address" a on a.patient_id=p.patient_id 
        LEFT OUTER JOIN public."City" c on c.city_id=a.city 
        LEFT OUTER JOIN public."District" d on d.district_id=a.district 
        LEFT OUTER JOIN public."Barangay" b on b.barangay_id=a.barangay
        where p.patient_id = $1`, [req.params.id]);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }



});
router.get("/delete-patient/:id", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT p.*, a.address_line1, a.address_line2, c.city_name, d.district_name, b.barangay_name
        FROM public."Patient" p
        LEFT OUTER JOIN public."Address" a on a.patient_id=p.patient_id 
        LEFT OUTER JOIN public."City" c on c.city_id=a.city 
        LEFT OUTER JOIN public."District" d on d.district_id=a.district 
        LEFT OUTER JOIN public."Barangay" b on b.barangay_id=a.barangay
        where p.patient_id = $1`, [req.params.id]);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.delete("/delete-patient/:id", async (req, res) => {

    try {
        const patient = await pool.query(`DELETE FROM public."Address"
        where patient_id = $1`, [req.params.id]);
        const add = await pool.query(`DELETE FROM public."Patient"
        where patient_id = $1`, [req.params.id]);
        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json("Error")
    }
});
router.get("/patients/", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT p.*, a.address_line1, a.address_line2, c.city_name, d.district_name, b.barangay_name
        FROM public."Patient" p
        LEFT OUTER JOIN public."Address" a on a.patient_id=p.patient_id 
        LEFT OUTER JOIN public."City" c on c.city_id=a.city 
        LEFT OUTER JOIN public."District" d on d.district_id=a.district 
        LEFT OUTER JOIN public."Barangay" b on b.barangay_id=a.barangay
        `);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }



});
router.get("/diagnosis/:id", async (req, res) => {

    try {
        const patient = await pool.query(`SELECT disease_rec1,  a.disease_desc
        FROM public."Disease_records" r
        LEFT OUTER JOIN public."Diseases" a on a.disease_id=r."Disease"
        where disease_rec1 = $1
        `, [req.params.id]);

        res.json(patient.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }



});
module.exports = router; 