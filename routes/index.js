const { Router } = require('express');
const AuthRouter = require('./auth.route');
const TariRouter = require('./tari.route');
const UserRouter = require('./user.route');
const PaketRouter = require('./paket.route');
const WorkshopRouter = require('./workshop.route');
const PendaftaranWorkshopRouter = require('./PendaftaranWorkshop.route');
const PredictRouter = require('./predict.route');

const router = Router();

router.get('/', (req, res) => {
  res.send('Server is running!');
});

router.use(PredictRouter)
router.use(AuthRouter)
router.use(TariRouter)
router.use(UserRouter)
router.use(PaketRouter)
router.use(WorkshopRouter)
router.use(PendaftaranWorkshopRouter)

module.exports = router;