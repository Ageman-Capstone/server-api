const { Router } = require('express');
const { authentication,adminAuthorization } = require('../middleware/auth.js');
const PendaftaranWorkshopController = require('../controllers/PendaftaranWorkshopController.js');

const router = Router();

router.use(authentication);
router.get('/pendaftaran-workshop', PendaftaranWorkshopController.list);
router.get('/pendaftaran-workshop/:id', PendaftaranWorkshopController.show);
router.post('/pendaftaran-workshop', PendaftaranWorkshopController.create);
router.put('/pendaftaran-workshop/:id', adminAuthorization ,PendaftaranWorkshopController.update);
router.delete('/pendaftaran-workshop/:id',adminAuthorization, PendaftaranWorkshopController.destroy);

module.exports = router;