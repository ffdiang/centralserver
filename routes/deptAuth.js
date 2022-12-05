const router = require("express").Router();
const pool = require("../db");

router.use("/central", require("./auth-dept/central"));//1
router.use("/geriatric", require("./auth-dept/geriatric"));//2
router.use("/maternal", require("./auth-dept/maternal"));//3
router.use("/pediatric", require("./auth-dept/pediatric"));//4
router.use("/diseasesurv", require("./auth-dept/diseaseSurv"));//5
router.use("/laboratory", require("./auth-dept/laboratory"));//6
router.use("/emr", require("./auth-dept/emr"));//7

module.exports = router;