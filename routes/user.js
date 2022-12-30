const router = require('express').Router();
const userController = require('../controllers/user');


router.get('/:slug', userController.getUserDetails);
router.get('/me/:id', userController.getLoggedInUserDetails);
router.put('/me', userController.updateUser);
router.put('/me/password', userController.updatePassword);


module.exports = router;