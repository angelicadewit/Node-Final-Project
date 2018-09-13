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




setInterval(function() {
    // hourly maintenance task
    let currentTime = new Date().getTime()
    console.log("purging old letters", letters.length)

    letters = letters.filter(function(letter, i){
        if (letter.timestamp > currentTime - 86400){
            return true
        }
        return false
    })

    console.log("purged old letters", letters.length)
    
}, 60*60*1000  )




app.get('/', function(req, res){
    res.send(`Welcome to them letters API`)
})

app.post('/letters', function(req, res){
    console.log(`letters array:`, letters)
    console.log(`incoming letter data:`, req.body)

    let newLetter = {
        id: idCounter++,
        timestamp: new Date().getTime(),
        username: req.body.username,
        label: req.body.label,
        message: req.body.message,
        love: 0,
        sad: 0,
        surprise: 0,
        replies: [],
        
    }

    letters.unshift(newLetter)

    res.send(letters)

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

// app.post(`/letters/:id/replies`, function(req, res){
//     console.log(req.params.id)

//     let foundRepliesID = req.params.id

//     let foundRepliesIDInArray = letters.find(function(letter) {
//         return letter.id == foundLetterID
//     });

    
//     foundLetterIDInArray

//     res.send(String(foundLetterIDInArray.sad));
// })

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
