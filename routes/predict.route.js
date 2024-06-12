const { Router } = require('express');
const { authentication,adminAuthorization } = require('../middleware/auth.js');
const PredictController = require('../controllers/PredictController.js');
const multer = require('multer');
const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// router.use(authentication);
router.post('/predict', upload.single('image'), PredictController.predict);

module.exports = router;