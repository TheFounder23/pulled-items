const express = require('express');
const router = express.Router();
const recipecontroller = require('../controllers/recipecontroller');

router.get('/', recipecontroller.homepage);
module.export = router;