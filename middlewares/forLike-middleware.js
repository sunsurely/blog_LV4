const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const likeMiddleware = async (req, res, next) => {
  const { authorization } = req.cookies;
  const [authType, authToken] = (authorization ?? '').split(' ');

  const { usersId } = jwt.verify(authToken, 'costomized-secret-key');

  if (usersId) {
    const user = await Users.findOne({
      where: usersId,
    });
    res.locals.user = user;
    next();
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = likeMiddleware;
