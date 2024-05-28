const { Router } = require('express');
const multer = require('multer');
const UserController = require('../controllers/UserController');
const { authentication,adminAuthorization } = require('../middleware/auth.js');
const { imageUpload } = require('../middleware/upload');
const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.use(authentication);
router.get('/user/:email', UserController.show);
router.put(
  '/user/:id',
  upload.single('url_gambar'),
  imageUpload,
  UserController.update
);
router.delete('/user/:id', adminAuthorization, UserController.destroy);

module.exports = router;