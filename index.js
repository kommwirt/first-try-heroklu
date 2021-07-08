//Express importieren
const express = require('express')

// Server erstellen installieren
const app = express()

//Port festlegen lokal
// So sehen wir, ob wir live sind, wenn ja, kommt die PORT Variable vom Liveserver, falls nicht lokal
const PORT = process.env.PORT || 3005

// Statische Dateien servieren
app.use(express.static('public'))

// Wir definieren, mit welcher Methode die Anfrage kommt: get
// Aufbau (PFAD, CALLBACK)
app.get('/', (req, res) => {
    // res.send("Hello from express")
    // sendFile nur für HTML 
    // (PFAD, {OPTIONENKEY: OPTIONENVALUE, ....})
    res.sendFile('./views/index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname})
})
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

const heros = [
{name: "Superman", age:22},
{name: "Batman", age:42}
]
app.get('/api', (req,res) => {
    // res.json([
    //     {name: "Superman", age:22},
    //     {name: "Batman", age:42}
    // ])
    res.json(heros)
})

app.get('/api/:egal', (req, res) => {
    console.log(req.params.egal)
    res.json(heros[req.params.egal])
})

app.use((req, res) => {
    //Status setzen
    // res.status(404)
    // Verketten von Methoden
    res.status(404).res.sendFile('./views/404.html', {root: __dirname})
})

app.listen(PORT, () =>console.log(`Running on http://localhost:${PORT}`))