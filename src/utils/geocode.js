const request = require('request')


const geocode = (address, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoid2pmY29tcHV0ZXIiLCJhIjoiY2ttand6Y3Q0MHZqdTMwbWl4MmsyMDc2bCJ9.eeySg0kjF6bCgMfa5_DE2Q&limit=1'

    request({url, json:true},(error, response)=>{
        if(error){
            console.log('i am 1')
            callback('Unable to connect to location services!',undefined)
        }else if(response.body.features.length === 0){
            console.log('i am 2')
            callback('Unable to find location. Try another search.',undefined)
        }else{
            console.log(response.body)
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
        })


}



module.exports= geocode