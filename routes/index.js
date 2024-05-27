const { Router } = require('express');
const AuthRouter = require('./auth.route');
const TariRouter = require('./tari.route');
const UserRouter = require('./user.route');

const router = Router();

router.get('/', (req, res) => {
  res.send('Server is running!');
});

router.use(AuthRouter)
router.use(TariRouter)
router.use(UserRouter)

module.exports = router;