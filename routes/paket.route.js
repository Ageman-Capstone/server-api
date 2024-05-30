const { Router } = require('express');
const { authentication,adminAuthorization } = require('../middleware/auth.js');
const PaketController = require('../controllers/PaketController.js');
const router = Router();

router.use(authentication);
router.get('/paket', PaketController.list);
router.get('/paket/:id', PaketController.show);
router.post('/paket',adminAuthorization,PaketController.create);
router.put('/paket/:id',adminAuthorization,PaketController.update);
router.delete('/paket/:id',adminAuthorization, PaketController.destroy);

module.exports = router;