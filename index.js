const express = require ('express')
const ejs = require('ejs')
const path = require('path')


const app = express()
app.use(express.json())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const PORT = 3030

//Matkade andmestik
const matk1 = {
    nimetus: "Mägimatk",
    pildiUrl: "./assets/Capture1.png",
    kirjeldus: "Lähme mäe otsa",
    osalejad: ["mati@mail.ee", "kati@mail.ee"]
}
const matk2 = {
    nimetus: "Suusareis",
    pildiUrl: "./assets/Capture1.png",
    kirjeldus: "Lumise mäe reis",
    osalejad: ["mati@mail.ee", "kati@mail.ee", "matikatilaps@mail.ee"]
}

const matkad =[
    matk1,
    matk2, 
    {
    nimetus: "Suusareis 2",
    pildiUrl: "./assets/Capture1.png",
    kirjeldus: "Lumise mäe reis",
    osalejad: ["suusamees@mail.ee"]
    }
]

// Matkade funktsion
function naitaMatkad(req, res) {
    res.render("matkad", {matkad:matkad})
}


app.get('/test', (req, res) => (res.end('All OK')))
app.use('/' , express.static("public"))

app.get('/', (req, res) => {res.render("esileht", {matkad:matkad})})
app.get('/matk/:matkId', (req, res) => {
    const matkaIndex= req.params.matkId
    res.render("matk", {matk:matkad[matkaIndex]})
})

app.listen(PORT)