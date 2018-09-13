const colors = require(`colors`)
const express = require(`express`)
const cors = require(`cors`)
const bodyParser = require(`body-parser`)

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let letters = []
let idCounter = 0




app.get('/', function(req, res){
    res.send(`Welcome to them letters API`)
})

app.post('/letters', function(req, res){
    // res.send(`This is how you add letter`)
    console.log(`letters array:`, letters)

    let newLetter = {
        id: idCounter++,
        username: req.body.username,
        label: req.body.label,
        message: req.body.message,
        loves: 0,
        angries: 0,
        surprises: 0,
        replies: []
    }

    letters.unshift(newLetter)

    res.send([letters])

})


// app.get(`/letters/:id`, function(req, res){
//     res.send(letters.filter(function(){

//     })
// })

// app.get(`/letter/:id`, function(req, res){
//     res.send(letters.id)
// })

app.post(`/letters/:id/loves`, function(req, res){
    console.log(req.params.id)

    let foundLetterID = req.params.id

    let foundLetterIDInArray = letters.find(function(letter) {
        return letter.id == foundLetterID
    });
    if (foundLetterIDInArray) {
        foundLetterIDInArray.loves++
        res.sendStatus(200).send(foundLetterIDInArray.loves)
        console.log(foundLetterIDInArray.loves)
    } else {
        res.sendStatus(404).send("AAAAAAHHH")
    }
})

app.get(`/letters`, function(req, res){
    res.send(letters)
})

app.get(`/letters/:id/loves`, function(req, res){
    let foundLetterID = req.params.id
    res.send(letter.love)

})


app.get(`/letters/type/:label`, function(req, res){

    let label = req.params.label 
    
    let filteredLetters = letters.filter(function(letter){
        return letter.label === label
    })
    res.send(filteredLetters)
})

app.listen(1337, function(){
    console.log(`Example app listening on port 1337!`)
})
