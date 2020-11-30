const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');

// Middleware
const dotenv = require('dotenv');
const cors = require('cors');
const verify = require('./middleware/verifyToken');
const cached = require('./middleware/cached');

// Routes
const dashboardRoute = require('./routes/dashboard');
const rewardifyRoute = require('./routes/rewardifyRoutes');
const authRoute = require('./routes/auth');
dotenv.config();
morgan('tiny');

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

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/', cached, dashboardRoute);
app.use('/', cached, rewardifyRoute);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
