const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');
const userRouter = require('./users');
const loginRouter = require('./login');

const defaultRoutes = [
  {
    path: '/posts',
    route: postsRouter,
  },
  {
    path: '/signup',
    route: userRouter,
  },
  {
    path: '/login',
    route: loginRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
