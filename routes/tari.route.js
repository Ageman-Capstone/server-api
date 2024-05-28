const { Router } = require('express');
const { imageUpload } = require('../middleware/upload');
const { authentication, adminAuthorization} = require('../middleware/auth');
const multer = require('multer');

const TariController = require('../controllers/TariController');
const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.use(authentication);
router.get('/tari', TariController.list);
router.get('/tari/:slug', TariController.show);
router.use(adminAuthorization);
router.post('/tari/store', upload.single('url_gambar'), imageUpload,TariController.create);
router.put('/tari/:id', upload.single('url_gambar'), imageUpload,TariController.update);
router.delete('/tari/:id', TariController.destroy);

module.exports = router;