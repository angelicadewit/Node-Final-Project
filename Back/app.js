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
        love: 0,
        sad: 0,
        surprise: 0,
        // reactions: [{loves: 0, sad: 0, surprises: 0}]
        replies: []
    }

    letters.unshift(newLetter)

    res.send([letters])

})

// app.post(`/letters/:id/reactions/:???`, function(req, res){
// idk
// })


app.post(`/letters/:id/love`, function(req, res){
    console.log(req.params.id)

    let foundLetterID = req.params.id

    let foundLetterIDInArray = letters.find(function(letter) {
        return letter.id == foundLetterID
    });

    
    foundLetterIDInArray.love++

    res.send(String(foundLetterIDInArray.love));
})

app.post(`/letters/:id/sad`, function(req, res){
    console.log(req.params.id)

    let foundLetterID = req.params.id

    let foundLetterIDInArray = letters.find(function(letter) {
        return letter.id == foundLetterID
    });

    
    foundLetterIDInArray.sad++

    res.send(String(foundLetterIDInArray.sad));
})

app.post(`/letters/:id/replies`, function(req, res){
    console.log(req.params.id)

    let foundRepliesID = req.params.id

    let foundRepliesIDInArray = letters.find(function(letter) {
        return letter.id == foundLetterID
    });

    
    foundLetterIDInArray

    res.send(String(foundLetterIDInArray.sad));
})

app.post(`/letters/:id/surprise`, function(req, res){
    console.log(req.params.id)

    let foundLetterID = req.params.id

    let foundLetterIDInArray = letters.find(function(letter) {
        return letter.id == foundLetterID
    });

    
    foundLetterIDInArray.surprise++

    res.send(String(foundLetterIDInArray.surprise));
})

app.get(`/letters`, function(req, res){
    res.send(letters)
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
