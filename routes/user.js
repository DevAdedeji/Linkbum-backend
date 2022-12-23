const router = require('express').Router();
const userController = require('../controllers/user');


router.get('/:slug', userController.getUserDetails);


module.exports = router;