const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const { Users } = require('../models');
const { Op } = require('sequelize');
const loginMiddleware = require('../middlewares/login-middleware.js');

router.post('/', loginMiddleware, async (req, res) => {
  const { usersId } = res.locals.user;
  const { title, content } = req.body;
  const user = await Users.findOne({
    where: usersId,
  });

  const post = await Posts.create({
    UsersId: user.usersId,
    nickname: user.nickname,
    title,
    content,
  });

  return res.status(201).json({ data: post });
});

router.get('/', async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ['postId', 'title', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({ data: posts });
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: [
      'postId',
      'title',
      'nickname',
      'content',
      'createdAt',
      'updatedAt',
    ],
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

router.put('/:postId', loginMiddleware, async (req, res) => {
  const { usersId } = res.locals.user;
  const { postId } = req.params;
  const { title, content } = req.body;

  const post = await Posts.findOne({
    where: { [Op.and]: [{ postId }, { usersId }] },
  });

  if (!post) {
    return res
      .status(400)
      .json({ errorMessage: '게시물을 수정할 수 없습니다.' });
  }

  await Posts.update(
    { title, content },
    {
      where: {
        [Op.and]: [{ postId }, { usersId }],
      },
    },
  );

  res.status(201).json({ message: '게시물을 수정했습니다.' });
});

router.delete('/:postId', loginMiddleware, async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({ where: { postId } });

  if (!post) {
    return res.status(400).json({
      sucess: false,
      errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.',
    });
  }
  await Posts.destroy({ where: { postId } });

  res.status(200).json({ message: '게시글을 삭제했습니다.' });
});

module.exports = router;
