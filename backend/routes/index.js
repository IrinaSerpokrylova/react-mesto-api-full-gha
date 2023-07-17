const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

const { createUser, login } = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/not-found-error');

// роуты, не требующие авторизации (регистрация и логин)

// Краш-тест сервера
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.get('/signout', (req, res) => {
  res.clearCookie('token').send({ message: 'Signed out' });
});

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;
