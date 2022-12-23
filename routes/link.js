const router = require('express').Router();
const linkController = require('../controllers/link');


router.post('', linkController.addLink);
router.put('', linkController.updateLink);
router.delete('', linkController.deleteLink);


module.exports = router;