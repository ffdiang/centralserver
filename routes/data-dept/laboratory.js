const router = require("express").Router();
const pool = require("../../db");



router.get("/", (req, res) => {

    res.send(`Laboratory Systems`)

});


// req
router.post("/add-req/", async (req, res) => {
    const {
        patient_id, test, test_type, physician, phlebotomist, date_time_collected, date_time_recieved, other, status
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.lab_req(
             patient_id, test, test_type, physician, phlebotomist, date_time_collected, date_time_recieved, other, status)
            VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9);
        `, [patient_id, test, test_type, physician, phlebotomist, date_time_collected, date_time_recieved, other, status]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-req/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_req m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-req/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_req m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id 
        where req_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-req/:id", async (req, res) => {
    const {
        patient_id, test, test_type, physician, phlebotomist, date_time_collected, date_time_recieved, other, status
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.lab_req
        SET patient_id=$2, test=$3, test_type=$4, physician=$5, phlebotomist=$6, date_time_collected=$7, date_time_recieved=$8, other=$9, status=$10
        WHERE req_id=$1;
        `, [req.params.id,
            patient_id, test, test_type, physician, phlebotomist, date_time_collected, date_time_recieved, other, status
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-req/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.lab_req
        WHERE req_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
//////////////////////////////////////// uniral

router.post("/add-urinal/", async (req, res) => {
    const {
        patient_id, req_physician, med_tech, pathologist, color, clarity, ph, sp_gr, glucose, albumin, pus, rbc, renal_cell, epithelial_cell, mucus_threads, bacteria, yeast_cells, amorphus, coarse_gran_cast, fine_gran_cast, hyaline_cast, uric_acid, calcum_oxalate, triple_phosphate, others
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.lab_urinal(
             patient_id, req_physician, med_tech, pathologist, color, clarity, ph, sp_gr, glucose, albumin, pus, rbc, renal_cell, epithelial_cell, mucus_threads, bacteria, yeast_cells, amorphus, coarse_gran_cast, fine_gran_cast, hyaline_cast, uric_acid, calcum_oxalate, triple_phosphate, others)
            VALUES ($1,$2,$3,$4, $5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25);
        `, [patient_id, req_physician, med_tech, pathologist, color, clarity, ph, sp_gr, glucose, albumin, pus, rbc, renal_cell, epithelial_cell, mucus_threads, bacteria, yeast_cells, amorphus, coarse_gran_cast, fine_gran_cast, hyaline_cast, uric_acid, calcum_oxalate, triple_phosphate, others
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-urinal/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_urinal m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-urinal/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_urinal m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id
        where urinal_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-urinal/:id", async (req, res) => {
    const {
        patient_id, req_physician, med_tech, pathologist, color, clarity, ph, sp_gr, glucose, albumin, pus, rbc, renal_cell, epithelial_cell, mucus_threads, bacteria, yeast_cells, amorphus, coarse_gran_cast, fine_gran_cast, hyaline_cast, uric_acid, calcum_oxalate, triple_phosphate, others

    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.lab_urinal
        SET  patient_id=$2, req_physician=$3, med_tech=$4, pathologist=$5, color=$6, clarity=$7, ph=$8, sp_gr=$9, glucose=$10, albumin=$11, pus=$12, rbc=$13, renal_cell=$14, epithelial_cell=$15, mucus_threads=$16, bacteria=$17, yeast_cells=$18, amorphus=$19, coarse_gran_cast=$20, fine_gran_cast=$21, hyaline_cast=$22, uric_acid=$23, calcum_oxalate=$24, triple_phosphate=$25, others=$26
        WHERE urinal_id=$1;
        `, [req.params.id,
            patient_id, req_physician, med_tech, pathologist, color, clarity, ph, sp_gr, glucose, albumin, pus, rbc, renal_cell, epithelial_cell, mucus_threads, bacteria, yeast_cells, amorphus, coarse_gran_cast, fine_gran_cast, hyaline_cast, uric_acid, calcum_oxalate, triple_phosphate, others
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-urinal/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.lab_urinal
        WHERE req_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
////////////////hema
router.post("/add-hema/", async (req, res) => {
    const {
        patient_id, wbc_count, segmenter, band, lymphocyte, monocyte, eosinophil, basophil, rbc_count, hemoglobin, hematocrit, mcv, mch, mchc, rdw, platelet, mpv, bleeding_time, clotting_time, esr, reticulocyte_count, bloodtype, req_phycisian, med_tech, pathologist } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.lab_hema(
            patient_id, wbc_count, segmenter, band, lymphocyte, monocyte, eosinophil, basophil, rbc_count, hemoglobin, hematocrit, mcv, mch, mchc, rdw, platelet, mpv, bleeding_time, clotting_time, esr, reticulocyte_count, bloodtype, req_phycisian, med_tech, pathologist)
            VALUES ($1,$2,$3,$4, $5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25);
        `, [patient_id, wbc_count, segmenter, band, lymphocyte, monocyte, eosinophil, basophil, rbc_count, hemoglobin, hematocrit, mcv, mch, mchc, rdw, platelet, mpv, bleeding_time, clotting_time, esr, reticulocyte_count, bloodtype, req_phycisian, med_tech, pathologist
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-hema/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_hema m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id ;
        `);

        
        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-hema/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_hema m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id 
        where hema_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});


router.put("/edit-hema/:id", async (req, res) => {
    const {
        patient_id, wbc_count, segmenter, band, lymphocyte, monocyte, eosinophil, basophil, rbc_count, hemoglobin, hematocrit, mcv, mch, mchc, rdw, platelet, mpv, bleeding_time, clotting_time, esr, reticulocyte_count, bloodtype, req_phycisian, med_tech, pathologist
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.lab_hema
        SET patient_id=$2, wbc_count=$3, segmenter=$4, band=$5, lymphocyte=$6, monocyte=$7, eosinophil=$8, basophil=$9, rbc_count=$10, hemoglobin=$11, hematocrit=$12, mcv=$13, mch=$14, mchc=$15, rdw=$16, platelet=$17, mpv=$18, bleeding_time=$19, clotting_time=$20, esr=$21, reticulocyte_count=$22, bloodtype=$23, req_phycisian=$24, med_tech=$25, pathologist=$26
        WHERE hema_id=$1;
        `, [req.params.id,
            patient_id, wbc_count, segmenter, band, lymphocyte, monocyte, eosinophil, basophil, rbc_count, hemoglobin, hematocrit, mcv, mch, mchc, rdw, platelet, mpv, bleeding_time, clotting_time, esr, reticulocyte_count, bloodtype, req_phycisian, med_tech, pathologist]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-hema/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.lab_hema
        WHERE hema_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
///////////////////////////////////////fecal
router.post("/add-fecal/", async (req, res) => {
    const {
        patient_id, req_physician, med_tech, pathologist, color, consistency, occ_blood, pus_cells, rbc, yeast_cells, fat_globules, ascaris, trichiuris, cyst_enta, troph_enta, cyst_lamb, troph_lamb, others
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.lab_fecalycis(
            patient_id, req_physician, med_tech, pathologist, color, consistency, occ_blood, pus_cells, rbc, yeast_cells, fat_globules, ascaris, trichiuris, cyst_enta, troph_enta, cyst_lamb, troph_lamb, others)
            VALUES ($1,$2,$3,$4, $5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);
        `, [
            patient_id, req_physician, med_tech, pathologist, color, consistency, occ_blood, pus_cells, rbc, yeast_cells, fat_globules, ascaris, trichiuris, cyst_enta, troph_enta, cyst_lamb, troph_lamb, others
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-fecal/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_fecalycis m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-fecal/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_fecalycis m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id 
        where feacal_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.put("/edit-fecal/:id", async (req, res) => {
    const {
        patient_id, req_physician, med_tech, pathologist, color, consistency, occ_blood, pus_cells, rbc, yeast_cells, fat_globules, ascaris, trichiuris, cyst_enta, troph_enta, cyst_lamb, troph_lamb, others
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.lab_fecalycis
        SET   patient_id=$2, req_physician=$3, med_tech=$4, pathologist=$5, color=$6, consistency=$7, occ_blood=$8, pus_cells=$9, rbc=$10, yeast_cells=$11, fat_globules=$12, ascaris=$13, trichiuris=$14, cyst_enta=$15, troph_enta=$16, cyst_lamb=$17, troph_lamb=$18, others=$19
        WHERE feacal_id=$1
        `, [req.params.id,
            patient_id, req_physician, med_tech, pathologist, color, consistency, occ_blood, pus_cells, rbc, yeast_cells, fat_globules, ascaris, trichiuris, cyst_enta, troph_enta, cyst_lamb, troph_lamb, others
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-fecal/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.lab_fecalycis
        WHERE feacal_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
////////////////////////////////////////////////////////////clinical
router.post("/add-clinical/", async (req, res) => {
    const {
        patient_id, req_physician, med_tech, pathologist, glucose, uric_acid, creatinine, total_cholesterol, triglycerides, hdl, ldl, alt
    } = req.body;
    try {
        const user = await pool.query(`INSERT INTO public.lab_clinical(
            patient_id, req_physician, med_tech, pathologist, glucose, uric_acid, creatinine, total_cholesterol, triglycerides, hdl, ldl, alt)
               VALUES ($1,$2,$3,$4, $5,$6,$7,$8,$9,$10,$11,$12);
        `, [
            patient_id, req_physician, med_tech, pathologist, glucose, uric_acid, creatinine, total_cholesterol, triglycerides, hdl, ldl, alt
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-clinical/", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_clinical m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id ;
        `);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.get("/get-clinical/:id", async (req, res) => {

    try {
        const user = await pool.query(`SELECT n.*, m.*
        FROM public.lab_clinical m
        LEFT OUTER JOIN public."Patient" n on n.patient_id = m.patient_id 
        where clinical_id = $1 ;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.put("/edit-clinical/:id", async (req, res) => {
    const {
        patient_id, req_physician, med_tech, pathologist, glucose, uric_acid, creatinine, total_cholesterol, triglycerides, hdl, ldl, alt
    } = req.body;
    try {
        const user = await pool.query(`UPDATE public.lab_clinical
        SET  patient_id=$2, req_physician=$3, med_tech=$4, pathologist=$5, glucose=$6, uric_acid=$7, creatinine=$8, total_cholesterol=$9, triglycerides=$10, hdl=$11, ldl=$12, alt=$13
        WHERE clinical_id=$1;
        `, [req.params.id,
            patient_id, req_physician, med_tech, pathologist, glucose, uric_acid, creatinine, total_cholesterol, triglycerides, hdl, ldl, alt
        ]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});
router.delete("/delete-clinical/:id", async (req, res) => {

    try {
        const user = await pool.query(`DELETE FROM public.lab_fecalycis
        WHERE clinical_id=$1;
        `, [req.params.id]);

        res.send(user.rows)
    } catch (error) {
        return res.status(405).json(error.message)
    }
});



module.exports = router; 