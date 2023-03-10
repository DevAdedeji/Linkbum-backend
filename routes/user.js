const router = require('express').Router();
const userController = require('../controllers/user');
const upload = require('../multer');


router.get('/:slug', userController.getUserDetails);
router.get('/me/details', userController.getLoggedInUserDetails);
router.put('/me', userController.updateUser);
router.put('/me/password', userController.updatePassword);
router.put('/me/profile-picture', upload.single('file') ,userController.updateProfilePicture);


module.exports = router;