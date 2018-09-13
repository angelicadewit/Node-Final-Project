console.log(`Hello World from main.js`)
let $submitButton = document.querySelector(`button.send`)
let usernameInput = document.querySelector(`[name="username"]`)
let labelSelection = document.querySelector(`#label_select`)
let letterInput = document.querySelector(`[name="letter"]`)
let letterUL = document.querySelector(`ul.letters`)
let allFilter = document.querySelector(`.all`)
let workFilter = document.querySelector(`.work`)
let loveFilter = document.querySelector(`.love`)
let familyFilter = document.querySelector(`.family`)
let schoolFilter = document.querySelector(`.school`)
let miscFilter = document.querySelector(`.misc`)
let refreshBtn = document.querySelector(`.refresh`)
// let loveBtn = document.querySelector(`.loveBtn`)
// let numberOfLoveSpan = document.querySelector(`.loveReactions`)

let localURL = `http://localhost:1337/letters`
let liveURL = `http://206.189.78.79:1337`



$submitButton.addEventListener(`click`, function() {
    let enteredUsername = usernameInput.value
    let newUsername = ``

    if (!enteredUsername) {
        newUsername = `Me`
    } else {
        newUsername = enteredUsername.substring(0,1).toUpperCase()
    }

    if (!labelSelection.value) {
        labelSelection.value = `misc`
    }

	axios.post(localURL, {
        username: newUsername,
        label: labelSelection.value,
        message: letterInput.value,
	})
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    });
})


axios
    .get("http://localhost:1337/letters")
    .then(function (response) {
        console.log(response)
        letterUL.innerHTML = ``
        newLetterOnPage(response)
    });



let showingReplies = function(){

    let repliesDiv = document.querySelectorAll(`.replies`)
    
    repliesDiv.forEach(function(reply){
        let serverReplyDiv = document.createElement('div')

        serverReplyDiv.classList.add(`reply`)
        
        serverReplyDiv.style.left = reply.getBoundingClientRect().right + window.scrollX + "px";
        serverReplyDiv.style.top = reply.getBoundingClientRect().top + window.scrollY + "px";
        reply.appendChild(serverReplyDiv)
    })
		
}



let newLetterOnPage = function(letters){
    if (letters.data.length === 0){
        letterUL.innerHTML += `<p>There are no letters available. Want to write something?</p>`
    } else {
        console.log(`here are are the letters`, letters)
        letterUL.innerHTML = ``

        letters.data.forEach(function(letter) {
            let newLetterListItem = document.createElement(`li`)

            let newLetterDiv = document.createElement(`div`)
            let letterLabelDiv = document.createElement(`div`)
            let reactionsDiv = document.createElement(`div`)

            let numberOfLoveSpan = document.createElement(`span`)
            let loveBtn = document.createElement(`img`)

            let numberOfSurpriseSpan = document.createElement(`span`)
            let surpriseBtn = document.createElement(`img`)

            let numberOfSadSpan = document.createElement(`span`)
            let sadBtn = document.createElement(`img`)

            // let repliesDiv = document.createElement(`div`)
            // let repliesSpan = document.createElement(`span`)

            numberOfLoveSpan.textContent = letter.love
            numberOfLoveSpan.classList.add(`loveReactions`)
            loveBtn.src = "../dist/img/56-3.png"

            numberOfSurpriseSpan.textContent = letter.surprise
            surpriseBtn.src = "../dist/img/56-1.png"
            numberOfSurpriseSpan.classList.add(`surpriseReactions`)

            numberOfSadSpan.textContent = letter.sad
            sadBtn.src = "../dist/img/56-2.png"
            numberOfSadSpan.classList.add(`sadReactions`)
            

            reactionsDiv.classList.add(`reaction`)


            loveBtn.addEventListener("click", function() {
                axios.post(localURL + "/" + letter.id + "/love")
                    .then((response) => {
                        // addingAReaction(response)
                        numberOfLoveSpan.textContent = ``
                        numberOfLoveSpan.textContent = response.data
                    })
            })

            surpriseBtn.addEventListener("click", function() {
                axios.post(localURL + "/" + letter.id + "/surprise")
                    .then((response) => {
                        numberOfSurpriseSpan.textContent = ``
                        numberOfSurpriseSpan.textContent = response.data
                    })
            })

            sadBtn.addEventListener("click", function() {
                axios.post(localURL + "/" + letter.id + "/sad")
                    .then((response) => {
                        numberOfSadSpan.textContent = ``
                        numberOfSadSpan.textContent = response.data
                    })
            })
            
            letterLabelDiv.classList.add ("label", letter.label)
            letterLabelDiv.addEventListener("click", function() {
                axios.get(`http://localhost:1337/letters/type/${letter.label}`).then(function (response) {
                    // letterUL.innerHTML = ``
                    newLetterOnPage(response);
                });
            })


            letterLabelDiv.textContent = letter.label

            // repliesDiv.classList.add ("replies")
            // repliesDiv.addEventListener("click", showingReplies)

            // repliesDiv.textContent = `${letter.replies.length} replies`
            
            newLetterDiv.innerHTML = `<p>${letter.message}.</p> <p class="salutations">Love, ${letter.username}</p>`

            
            
            reactionsDiv.appendChild(numberOfLoveSpan)
            reactionsDiv.appendChild(loveBtn)

            reactionsDiv.appendChild(numberOfSurpriseSpan)
            reactionsDiv.appendChild(surpriseBtn)

            reactionsDiv.appendChild(numberOfSadSpan)
            reactionsDiv.appendChild(sadBtn)

            // reactionsDiv.appendChild(repliesDiv)
            
            reactionsDiv.appendChild(letterLabelDiv)
    
            newLetterListItem.appendChild(newLetterDiv)
            newLetterListItem.appendChild(reactionsDiv)


            letterUL.appendChild(newLetterListItem)
        })
    }
}

allFilter.addEventListener("click", function() {
    axios.get(`http://localhost:1337/letters/`).then(function (response) { 
    letterUL.innerHTML = ``  
    newLetterOnPage(response);
    });
})

workFilter.addEventListener("click", function() {
    axios.get(`http://localhost:1337/letters/type/work`).then(function (response) {
    letterUL.innerHTML = ``    
    newLetterOnPage(response);
    });
})

loveFilter.addEventListener("click", function() {
    axios.get(`http://localhost:1337/letters/type/love`).then(function (response) {
    letterUL.innerHTML = ``    
    newLetterOnPage(response);
    });
})

familyFilter.addEventListener("click", function() {
    axios.get(`http://localhost:1337/letters/type/family`).then(function (response) {
    letterUL.innerHTML = ``    
    newLetterOnPage(response);
    });
})

schoolFilter.addEventListener("click", function() {
    axios.get(`http://localhost:1337/letters/type/school`).then(function (response) {
    letterUL.innerHTML = ``    
    newLetterOnPage(response);
    });
})

miscFilter.addEventListener("click", function() {
    axios.get(`http://localhost:1337/letters/type/misc`).then(function (response) {
    letterUL.innerHTML = ``    
    newLetterOnPage(response);
    });
})

