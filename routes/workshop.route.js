const { Router } = require('express');
const multer = require('multer');
const { authentication,adminAuthorization } = require('../middleware/auth.js');
const { imageMultipleUpload,imageUpload } = require('../middleware/upload');
const WorkshopController = require('../controllers/WorkshopController.js');

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.use(authentication);
router.get('/workshop', WorkshopController.list);
router.get('/workshop/:id', WorkshopController.show);
router.post('/workshop', 
  upload.fields([{name:'url_gambar', maxCount: 1}, {name:'bukti_pembayaran', maxCount: 1}]), 
  imageMultipleUpload, 
  WorkshopController.create);

// router.use(adminAuthorization);
router.put(
  '/workshop/:id',
  adminAuthorization,
  upload.fields([{name:'url_gambar', maxCount: 1}, {name:'bukti_pembayaran', maxCount: 1}]), 
  imageMultipleUpload,
  WorkshopController.update
);
router.delete('/workshop/:id', adminAuthorization,WorkshopController.destroy);

module.exports = router;