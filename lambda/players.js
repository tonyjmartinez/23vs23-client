const axios = require('axios')
const btoa = require('btoa')

const config = {
  key: '9e90f2b2-a543-4008-8b0f-97dfde',
  pword: 'tobyjuanginobili20',
}

module.exports.handler = async function (event, context) {
  const season = event.queryStringParameters.season
  console.log('in here =====')
  // const season = '2020-2021-regular'
  const url =
    'https://api.mysportsfeeds.com/v1.2/pull/nba/' +
    season +
    '/roster_players.json'
  let data = null
  try {
    data = await axios({
      url: url,
      type: 'GET',
      headers: {
        Authorization: 'Basic ' + btoa(config.key + ':' + config.pword),
      },
    })
  } catch (err) {
    // console.log(err)
  }

  return {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      data: data.data.rosterplayers,
    }),
  }
}