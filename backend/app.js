require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/error-handler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const NotFoundError = require('./utils/errors/not-found-error');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

const limiter = rateLimit({
  max: 100, // лимит в 100 запросов в минуту (дефолт для windowMs)
});

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log('connected to db');
  });

const app = express();

app.use(cors({ origin: 'api.melomori.nomoredomains.xyz', credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
