const express = require ('express')
const ejs = require('ejs')
const path = require('path')

const {lisaMatk, loeMatkad} = require("./model")


const app = express()
app.use(express.urlencoded())
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



function registreeruMatkale(matkaIndex, nimi, email) {
    if (matkaIndex > matkad.length) {
        console.log("Vale matka index")
        return
    }
    const matk = matkad[matkaIndex]
    const uusMatkaja = {
        nimi: nimi,
        email: email,
        registreerumisAeg: new Date()
    }
    matk.osalejad.push(uusMatkaja)
    console.log(matkad)
    
}


//Matkaklubi kontakti lehe sõnumid
const messages =[]

function msgKinnitus(nimi, email, msg) {
    const uusMsg = {
        nimi: nimi,
        email: email,
        msg: msg,
        saatmisAeg: new Date()
    }
    messages.push(uusMsg)
    console.log(messages)
}

// Matkade funktsion
function naitaMatkad(req, res) {
    res.render("matkad", {matkad:matkad})
}


app.get('/test', (req, res) => (res.end('All OK')))
app.use('/' , express.static("public"))

// Matkade kuvamine esilehel
app.get('/', (req, res) => {res.render("esileht", {matkad:matkad})})

// 1 matka kuvamine
app.get('/matk/:matkId', (req, res) => {
    const matkaIndex= req.params.matkId
    res.render("matk", {matk:matkad[matkaIndex], id: matkaIndex})
})

// UUDISED alamleht
const jsonData = require('./data.json')
app.get('/uudised', (req, res) => {res.render("uudised", {uudised: jsonData.uudis})})

// 1 UUDISE kuvamine
app.get('/uudised/:uudisId', (req, res) => {
    const uudisIndex= req.params.uudisId
    res.render("uudis", {uudis: jsonData.uudis[uudisIndex]})
})

// Registreerumine <form method="GET"> (req.query) - saadetavad andmed URL-is. 
app.get('/registreerumine', (req, res) => {
   registreeruMatkale(
    req.query.matkaIndex,
    req.query.nimi,
    req.query.email
   )
   res.render('reg_kinnitus', {matk: matkad[req.query.matkaIndex], nimi: req.query.nimi})
})

// Registreerumine <form method="POST"> (req.body) - saadetavad andmed peidetud
app.post('/registreerumine', (req, res) => {
    registreeruMatkale(
     req.body.matkaIndex,
     req.body.nimi,
     req.body.email
    )
    res.render('reg_kinnitus', {matk: matkad[req.body.matkaIndex], nimi: req.body.nimi})
 })

 app.get('/kontakt', (req, res) => {res.render("kontakt")})
 app.post('/kontakt', (req, res) => {
    msgKinnitus(     
     req.body.nimi,
     req.body.email,
     req.body.msg
    )
    res.render('msg_kinnitus', {nimi: req.body.nimi})
    
 })

 app.get('/api/lisaMatk', (req, res)=>{
    const uusMatk = {
        nimetus: req.query.nimetus
    }
    lisaMatk(uusMatk);
    res.end("Lisatud")
 })

 app.get('/admin', (req,res ) => (res.render("admin")))

 // API endpoint matkade nimekirja laadimiseks
app.get('/api/matk', async (req, res) => {
    const matkad = await loeMatkad()
    res.json(matkad)
})

 // API endpoint 1 matka andmete laadimiseks
app.get('/api/matk/:matkaIndex')

// API endpoint 1 matka lisamiseks
app.post('/api/matk', (req, res) => {
    const uusMatk = req.body
    console.log(uusMatk)
    res.end("Kõik OK")
})

// API endpoint 1 matka kustutamiseks
app.delete('/api/matk/:matkaIndex')

// API endpoint 1 matka andmete muutmiseks
app.patch('/api/matk/:matkaIndex')

// API endpoint 1 matka osalejate laadimiseks
app.get('/api/matk/:matkaIndex/osaleja')

// API endpoint matka 1 osaleja andmete laadimiseks
app.get('/api/matk/:matkaIndex/osaleja/:osalejaIndex')




 app.listen(PORT)