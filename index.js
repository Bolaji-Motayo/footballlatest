const PORT = process.env.PORT || 4000;
const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');

const app = express()

const newspapers = [
    {
        name: "Skysports",
        address: "https://www.skysports.com/football/news",
        base: ''
    },
    {
        name: "Newsnow",
        address: "https://www.newsnow.com/ng/Sport/Football/World+Football",
        base: ''
    },
    {
        name: "BeSoccer",
        address: "https://www.besoccer.com/news",
        base: ''
    },
    {
        name: "MetroUk",
        address: "https://metro.co.uk/sport/football/",
        base: ''
    },
    {
        name: "talksport",
        address: "https://talksport.com/football/",
        base: ''
    },
    {
        name: "Eurosport",
        address: "https://www.eurosport.com/football/",
        base: ''
    },
    {
        name: "TheSunSport",
        address: "https://www.thesun.co.uk/sport/football/",
        base: ''
    },
    {
        name: "BBC",
        address: "https://www.bbc.com/sport/football",
        base: ''
    }
    
]

const articles = []

newspapers.forEach((newspaper) => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("football")', html).each(function (){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })

        })


    }).catch((err) => console.log(err))
})


app.get('/', (req, res) => {
    res.json('Welcome to Football News!')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress).then((response)=> {
        const html = response.data
        const $ = cheerio.load(html)
        const specificArticles = []

        $('a:contains("football")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')
            someArticles.push({
                title,
                url: newspaperBase + url,
                source: newspaperId
            })
            res.json(someArticles)
        }).catch(err => console.log(err))
    })
})

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))