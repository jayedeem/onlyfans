const express = require('express');
const mongoose = require('mongoose');

const { getToken } = require('./utlls');
const morgan = require('morgan');

const cors = require('cors');
const dotenv = require('dotenv');
const verify = require('./verifyToken');
const cached = require('./middleware/cached');

const shopRoute = require('./routes/shopRoutes');
const dashboardRoute = require('./routes/dashboard');
const rewardifyRoute = require('./routes/rewardifyRoutes');
const authRoute = require('./routes/auth');
dotenv.config();
morgan('tiny');
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

app.use('/auth', authRoute);
app.use('/', verify, cached, dashboardRoute);
// app.use('/', shopRoute);

app.use('/', verify, cached, rewardifyRoute);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
