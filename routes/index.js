const { Router } = require('express');
const AuthRouter = require('./auth.route');

const router = Router();

router.get('/', (req, res) => {
  res.send('Server is running!');
});

router.use(AuthRouter)

module.exports = router;