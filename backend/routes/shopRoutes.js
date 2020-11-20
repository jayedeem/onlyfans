const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');
require('dotenv').config();

router.get('/api/shopify', async (req, res) => {
  try {
    const shopifyData = await axios.request({
      url:
        'https://ultra-swag.myshopify.com/admin/api/2020-10/customers/search.json?query=employee&limit=250',
      method: 'GET',
      // baseUrl: `https://ultra-swag.myshopify.com/admin/api/2020-10`,
      headers: {
        'Content-type': 'application/json',
        authorization: `Basic NjIxN2NkZjdiNzM3NThlNjkyNmUzZjI5ZTZkN2RkYjg6c2hwcGFfMmJlMmJiMmFmYTc3YjdlZWY2OGIyNTQxNWMxZDVhNzM=`,
      },
    });
    const rewardifyToken = await axios.request({
      // url: '/oauth/v2/token',
      method: 'POST',
      url: `https://api.rewardify.ca/oauth/v2/token`,
      headers: {
        'Content-type': 'application/json',
        'access-control-allow-origin': '*',
        'access-control-expose-headers': 'access-control-allow-origin',
      },
      auth: {
        username: '331_10kbq7dakv4g8ccg4gok0gwwcogo4cgk80s8swkck4gss8c080',
        password: '5fmelekfnlogsgg8k0w40ockk80gc4gksgok84woc4wwcs8ko4',
      },
      data: {
        grant_type: 'client_credentials',
      },
    });
    // console.log(rewardifyToken);
    res.send({
      token: rewardifyToken.data,
      shopify: shopifyData.data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/api/shopify/:id', async (req, res) => {
  const { token } = req.headers;
  const { id } = req.params;

  try {
    const data = await axios.get(
      `https://api.rewardify.ca/customer/${id}/account`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    res.send(data.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
