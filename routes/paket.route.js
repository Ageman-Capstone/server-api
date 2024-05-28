const { Router } = require('express');
const { authentication,adminAuthorization } = require('../middleware/auth.js');
const PaketController = require('../controllers/PaketController.js');
const router = Router();

router.use(authentication);
router.get('/paket', PaketController.list);
router.get('/paket/:id', PaketController.show);
router.use(adminAuthorization);
router.post('/paket',PaketController.create);
router.put('/paket/:id',PaketController.update);
router.delete('/paket/:id', PaketController.destroy);

module.exports = router;