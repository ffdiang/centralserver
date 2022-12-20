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
        SET patient_id=$2, first_name=$3, last_name=$4, sex=$5, mother_name=$6, father_name=$7, contact_number=$8, email=$9, birth_date=$10
        WHERE patient_id=$1;
        `, [req.params.id,
            first_name,
            last_name,
            birth_date,
            sex,
            mother_name,
            father_name,
            contact_number,
            email
        ]);
        const add = await pool.query(`UPDATE public."Address"
            SET address_id=$1, patient_id=$2, address_line1=$3, address_line2=$4, city=$5, district=$6, barangay=$7
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

module.exports = router; 