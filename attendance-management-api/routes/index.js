const express = require('express')
const router = express.Router();

router.use('/user', require('./user'));
router.use('/candidate', require('./candidate'));
router.use('/candidatetype', require('./candidate_type'));
router.use('/department', require('./Department'));
router.use('/departmentoption', require('./Departmentoption'));
router.use('/student', require('./student'));
router.use('/attendance', require('./attendance'));
router.use('/chart', require('./chart'));
router.use('/report', require('./Report'));
router.use('/payment', require('./Payment'));
router.use('/book', require('./Book'));
router.use('/location', require('./Location'));
router.use('/bookdepartment', require('./BookDeparment'));
router.use('/auth', require('./auth'));

module.exports = router;