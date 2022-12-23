const router = require('express').Router();
const linkController = require('../controllers/link');


router.post('/post', linkController.addLink);
router.put('', linkController.updateLink);
router.delete('/post/:id', linkController.deleteLink);


module.exports = router;