const { decodeToken } = require('../helpers/jwt');

function authentication(req, res, next) {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1];
    req.loggedUser = decodeToken(token);
    next();
  } else {
    res.status(400).json({ message: 'Invalid auth' });
  }
}

function adminAuthorization(req, res, next) {
  const loggedUser = req.loggedUser;

  if (loggedUser.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden access' });
  }
}



module.exports = {
  authentication,
  adminAuthorization,
};