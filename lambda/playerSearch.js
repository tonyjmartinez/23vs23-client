const axios = require('axios')
const btoa = require('btoa')

module.exports.handler = async function (event, context) {
  console.log('inside player search')
  const player = event.queryStringParameters.player
  const season = event.queryStringParameters.season

  // const season = '2020-2021-regular'
  const url =
    'https://api.mysportsfeeds.com/v1.2/pull/nba/' +
    season +
    '/cumulative_player_stats.json?player=' +
    player
  let data = null
  try {
    data = await axios({
      url: url,
      type: 'GET',
      headers: {
        Authorization:
          'Basic ' + btoa(process.env.MSF_KEY + ':' + process.env.MSF_PASSWORD),
      },
    })

    console.log('data????', data.data)
  } catch (err) {
    console.log('error???', err)
    // console.log(err)
  }

  return {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      data: data.data.cumulativeplayerstats.playerstatsentry,
    }),
  }
}
