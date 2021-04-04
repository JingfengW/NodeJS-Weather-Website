const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const publicDirecoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirecoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Jeffrey'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some hlep info',
        name:'Adam'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Jinze'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        console.log(latitude, longitude,location)

        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            console.log('i am here')
            console.log(forcastData, location)
            res.send({
                forecast:forcastData,
                location,
                address:req.query.address
            })
        })

    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jeff',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jeff',
        errorMessage:'Page not found'

    })
})



//app.com
//app.com/help
//app.com/about
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})