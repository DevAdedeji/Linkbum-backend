const router = require('express').Router();
const userController = require('../controllers/user');


router.get('/:slug', userController.getUserDetails);
router.get('/me/:id', userController.getLoggedInUserDetails);


module.exports = router;