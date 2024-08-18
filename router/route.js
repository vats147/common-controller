const express = require('express');
const router = express.Router();

const {checkIndex} = require('../middleware/checkIndex.js');
const commonController = require('../controller/commonController.js');


router.post('/gernateQR', [checkIndex, commonController.insert]);


router.post('/:indexName', [checkIndex, commonController.insert]);
// router.post('/blog/:count', [checkIndex, commonController.insert]);


module.exports = router;


