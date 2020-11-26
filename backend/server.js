const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const getToken = require('./utlls');
const morgan = require('morgan');
const CronJob = require('cron').CronJob;
const axios = require('axios');

const cors = require('cors');
const dotenv = require('dotenv');
const verify = require('./verifyToken');
const client = require('./db/redis');
const shopRoute = require('./routes/shopRoutes');
const dashboardRoute = require('./routes/dashboard');
const rewardifyRoute = require('./routes/rewardifyRoutes');
const authRoute = require('./routes/auth');
dotenv.config();
const app = express();

app.set(getToken);

dotenv.config();
mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    try {
      console.log('connected to db');
    } catch (error) {
      console.log(error);
    }
  }
);

app.use(express.json());
app.use(cors());
morgan('tiny');

app.use('/auth', authRoute);
app.use('/', verify, shopRoute);
app.use('/', verify, dashboardRoute);
app.use('/', verify, rewardifyRoute);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
