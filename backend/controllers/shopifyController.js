const { SHOPIFY_TOKEN_ACCESS_URL } = process.env
const axios = require('axios')
const { resolve } = require('url')

const sToken = Buffer.from(
  `${process.env.SHOPIFY_KEY}:${process.env.SHOPIFY_PASSWORD}`,
  'utf8'
).toString('base64')

// Create User

/*
POST /admin/api/2020-10/customers.json
{
  "customer": {
    "first_name": "Steve",
    "last_name": "Lastnameson",
    "email": "steve.lastnameson@example.com",
    "phone": "+15142546011",
    "verified_email": true,
    "send_email_invite": true,
    "tags": "employee"
    "addresses": [
      {
        "address1": "123 Oak St",
        "city": "Ottawa",
        "province": "ON",
        "phone": "555-1212",
        "zip": "123 ABC",
        "last_name": "Lastnameson",
        "first_name": "Mother",
        "country": "CA"
      }
    ]
  }
}
{
  "customer": {
    "email": null,
    "first_name": null,
    "last_name": null
  }
}

*/

exports.createUser = async (req, res, next) => {
  const { email, first_name, last_name } = req.body

  try {
    const { data } = await axios.request({
      url: `https://ultra-swag.myshopify.com/admin/api/2020-10/customers.json`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: 'Basic ' + sToken
      },
      data: {
        customer: {
          first_name,
          last_name,
          email,
          verified_email: true,
          tags: 'employee',
          tax_exempt: true
        }
      }
    })
    if (!data) {
      return res.json({
        status: {
          msg: 'Something went wrong'
        }
      })
    } else {
      return res.json({
        status: {
          msg: 'User Created'
        }
      })
    }
  } catch (error) {
    console.log('error status', error.response.status)
    if (error.response.status === 422) {
      return res.json({
        status: {
          msg: 'User Already Created'
        }
      })
    }
  }
}

// Read User

/**
 * GET /admin/api/2020-10/customers/207119551.json
 */

// Update User
/**
 * PUT /admin/api/2020-10/customers/207119551.json
{
  "customer": {
    "id": 207119551,
    "email": "changed@email.address.com",
    "note": "Customer is a great guy"
  }
}

 */
// Delete A user

/**
 * There is no disable user in API
 * DELETE /admin/api/2020-10/customers/207119551.json
 */
exports.deleteUser = (req, res, next) => {}
