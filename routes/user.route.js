const { Router } = require('express');

const UserController = require('../controllers/UserController');
const { authentication } = require('../middleware/auth.js');
const { imageUpload } = require('../middleware/upload');
const router = Router();

router.use(authentication);
router.get('/user/:email', UserController.show);
// router.put(
//   '/user/:id',
//   userAuthorization,
//   upload.single('photo'),
//   // imageUpload,
//   UserController.update
// );
// router.delete('/user/:id', adminAuthorization, UserController.destroy);

module.exports = router;