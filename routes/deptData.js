const router = require("express").Router();
const pool = require("../db");


router.use("/central", require("./data-dept/central"));//1
router.use("/geriatric", require("./data-dept/geriatric"));//2
router.use("/maternal", require("./data-dept/maternal"));//3
router.use("/pediatric", require("./data-dept/pediatric"));//4
router.use("/diseasesurv", require("./data-dept/diseaseSurv"));//5
router.use("/laboratory", require("./data-dept/laboratory"));//6
router.use("/emr", require("./data-dept/emr"));//7



module.exports = router;