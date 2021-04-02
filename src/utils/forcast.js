const request = require('request')

const forcast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4aa0fa9e3b6ce5d0d294d981705e58cf&query='+ latitude +',' + longitude + '&units=f'

    request({url, json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'It is currently '+response.body.current.temperature+' degreeout. and the feel like '+response.body.current.feelslike)
        }
       
    })
}


module.exports = forcast
