const express = require('express');
const router = express.Router();

const {checkIndex} = require('../middleware/checkIndex.js');
const commonController = require('../controller/commonController.js');

router.post('/:indexName', commonController.insert);
router.get('/:indexName/:id', commonController.findOne);

router.get('/:indexName', commonController.find);



module.exports = router;



