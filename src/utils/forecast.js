const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3c934931b0debaaa0cc9090c2deb80f6&query='+ latitude +','+ longitude +'&units=m'
    //request({url: url, json: true},(error,response) => {
    //Use the short hand property and destructuring
    request({url, json: true}, (error, { body }) => {    
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        //} else if (response.body.error) {
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //callback(undefined, response.body.current.weather_descriptions[0] + '. The temperature outside is ' + response.body.current.temperature + ' and it feels like ' + response.body.current.feelslike + ' with humidity ' + response.body.current.humidity + '.'
            callback(undefined, body.current.weather_descriptions[0] + '. The temperature outside is ' + body.current.temperature + ' and it feels like ' + body.current.feelslike + ' with humidity ' + body.current.humidity + '.'
            )
        }
    })
}

module.exports = forecast