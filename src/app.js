const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// const { dir } = require('console')
// const { dirname } = require('path')
//const { response } = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app =  express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Surbhi Sachdeva',
        pageno: 1
    })
})

app.get('/about', (req,res) => {
    res.render('about' , {
        title: 'About me',
        name: 'Surbhi Sachdeva' ,
        pageno: 1
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        example: 'This is a help page. You can get all the info you want here.',
        name: 'Surbhi Sachdeva',
        title: 'Help',
        pageno: 1
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'Please provide an address'
        })
    }
    const address = req.query.address
    geocode(req.query.address, (error,{longitude,latitude,location} = {}) => {    
        if (error) {
            return res.send({
                error:error
            })
        }
        //forecast(data.longitude,data.latitude,(error,forecastData) => {
        forecast(longitude,latitude,(error,forecastData) => {
            if (error) {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
   
})

app.get('/help/*', (req,res) => {
    res.render('error' , {
        title: '404',
        name: 'Surbhi Sachdeva' ,
        error: 'Help article not found'
    })
})
app.get('*', (req,res) => {
    res.render('error' , {
        title: '404',
        name: 'Surbhi Sachdeva',
        error: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})



// app.get('', (req,res) => {
//     res.send('Hello Express!!')
// })

// app.get('/help', (req,res) => {
//     res.send('Hello page!!')
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>This is the about page!!</h1>')
// })
