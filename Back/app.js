const colors = require(`colors`)
const express = require(`express`)
const cors = require(`cors`)
const bodyParser = require(`body-parser`)

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let letters = []


app.get('/', function(req, res){
    res.send(`Welcome to them letters API`)
})

app.post('/letters', function(req, res){
    res.send(`This is how you add letter`)
    letters.unshift(req.body)
    console.log(`letters array:`, letters)
})

app.get(`/letters/:id`, function(req, res){
    res.send(req.param.id)
})

app.get(`/letters`, function(req, res){
    res.send(letters)
})


app.listen(1337, function(){
    console.log(`Example app listening on port 1337!`)
})