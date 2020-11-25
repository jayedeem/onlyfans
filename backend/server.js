const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

const shopRoute = require('./routes/shopRoutes');
const dashboardRoute = require('./routes/dashboard');
const rewardifyRoute = require('./routes/rewardifyRoutes');
const authRoute = require('./routes/auth');

dotenv.config();
mongoose.connect(
  'mongodb+srv://jayedeem:b9wK8zpo2NG45wRf@cms.faye2.mongodb.net/cms?retryWrites=true&w=majority',
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

morgan('tiny');

app.use('/auth', cors(), authRoute);
app.use('/', cors(), shopRoute);
app.use('/', cors(), dashboardRoute);
app.use('/', cors(), rewardifyRoute);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
