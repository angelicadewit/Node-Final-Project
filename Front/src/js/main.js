console.log(`Hello World from main.js`)
let $submitButton = document.querySelector(`button.send`)
let usernameInput = document.querySelector(`[name="username"]`)
let labelSelection = document.querySelector(`#label_select`)
let letterInput = document.querySelector(`[name="letter"]`)
let letterUL = document.querySelector(`ul.letters`)
let allFilter = document.querySelector(`.all`)

// let loveBtn = document.querySelector(`.loveBtn`)
// let numberOfLoveSpan = document.querySelector(`.loveReactions`)

let localURL = `http://localhost:1337/`
let liveURL = `http://206.189.78.79:1337/`



$submitButton.addEventListener(`click`, function() {
    event.preventDefault();
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

	axios.post(liveURL+"letters", {
        username: newUsername,
        label: labelSelection.value,
        message: letterInput.value,
	})
    .then(function (response) {
        console.log(response)
        newLetterOnPage(response)
    })
    .catch(function (error) {
        console.log(error)
    });
})


axios
    .get(liveURL + "letters")
    .then(function (response) {
        console.log(response)
        letterUL.innerHTML = ``
        newLetterOnPage(response)
    });


// let showingReplies = function(){

//     let repliesDiv = document.querySelectorAll(`.replies`)
    
//     repliesDiv.forEach(function(reply){
//         let serverReplyDiv = document.createElement('div')

//         serverReplyDiv.classList.add(`reply`)
        
//         serverReplyDiv.style.left = reply.getBoundingClientRect().right + window.scrollX + "px";
//         serverReplyDiv.style.top = reply.getBoundingClientRect().top + window.scrollY + "px";
//         reply.appendChild(serverReplyDiv)
//     })
		
// }



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
            let reactionsBtnDiv = document.createElement(`div`)

            let numberOfLoveSpan = document.createElement(`span`)
            let loveBtnDiv = document.createElement(`div`)
            let loveBtn = document.createElement(`img`)

            let numberOfSurpriseSpan = document.createElement(`span`)
            let surpriseBtnDiv = document.createElement(`div`)
            let surpriseBtn = document.createElement(`img`)

            let numberOfSadSpan = document.createElement(`span`)
            let sadBtnDiv = document.createElement(`div`)
            let sadBtn = document.createElement(`img`)

            // let repliesDiv = document.createElement(`div`)
            // let repliesSpan = document.createElement(`span`)

            newLetterListItem.classList.add (letter.label)

            numberOfLoveSpan.textContent = letter.love
            numberOfLoveSpan.classList.add(`loveReactions`)
            loveBtn.src = "dist/img/56-3.png"
            loveBtnDiv.classList.add(`reaction-button`)

            numberOfSurpriseSpan.textContent = letter.surprise
            surpriseBtn.src = "dist/img/56-1.png"
            surpriseBtnDiv.classList.add(`reaction-button`)
            numberOfSurpriseSpan.classList.add(`surpriseReactions`)

            numberOfSadSpan.textContent = letter.sad
            sadBtn.src = "dist/img/56-2.png"
            sadBtnDiv.classList.add(`reaction-button`)
            numberOfSadSpan.classList.add(`sadReactions`)
            

            reactionsBtnDiv.classList.add(`reaction-btns`)
            reactionsDiv.classList.add(`reaction`)
            newLetterDiv.classList.add(`letter`)


            loveBtn.addEventListener("click", function() {
                axios.post(liveURL + "letters/" + letter.id + "/love")
                    .then((response) => {
                        // addingAReaction(response)
                        event.preventDefault();
                        numberOfLoveSpan.textContent = ``
                        numberOfLoveSpan.textContent = response.data
                    })
            })

            surpriseBtn.addEventListener("click", function() {
                axios.post(liveURL + "letters/" + letter.id + "/surprise")
                    .then((response) => {
                        event.preventDefault();
                        numberOfSurpriseSpan.textContent = ``
                        numberOfSurpriseSpan.textContent = response.data
                    })
            })

            sadBtn.addEventListener("click", function() {
                axios.post(liveURL + "letters/" + letter.id + "/sad")
                    .then((response) => {
                        event.preventDefault();
                        numberOfSadSpan.textContent = ``
                        numberOfSadSpan.textContent = response.data
                    })
            })
            
            letterLabelDiv.classList.add ("label", letter.label)
            letterLabelDiv.addEventListener("click", function() {
                axios.get(liveURL+`letters/type/${letter.label}`).then(function (response) {
                    // letterUL.innerHTML = ``
                    newLetterOnPage(response);
                });
            })


            letterLabelDiv.textContent = letter.label

            // repliesDiv.classList.add ("replies")
            // repliesDiv.addEventListener("click", showingReplies)

            // repliesDiv.textContent = `${letter.replies.length} replies`
            
            newLetterDiv.innerHTML = `<p>${letter.message}.</p> <p class="salutations">Love, ${letter.username}</p>`

            reactionsDiv.appendChild(letterLabelDiv)

            loveBtnDiv.appendChild(numberOfLoveSpan)
            loveBtnDiv.appendChild(loveBtn)

            surpriseBtnDiv.appendChild(numberOfSurpriseSpan)
            surpriseBtnDiv.appendChild(surpriseBtn)

            sadBtnDiv.appendChild(numberOfSadSpan)
            sadBtnDiv.appendChild(sadBtn)

            reactionsBtnDiv.appendChild(loveBtnDiv)
            reactionsBtnDiv.appendChild(surpriseBtnDiv)
            reactionsBtnDiv.appendChild(sadBtnDiv)

            reactionsDiv.appendChild(reactionsBtnDiv)
    
            newLetterListItem.appendChild(newLetterDiv)
            newLetterListItem.appendChild(reactionsDiv)


            letterUL.appendChild(newLetterListItem)
        })
    }
}



allFilter.addEventListener("click", function() {
    axios.get(liveURL + "letters")
    .then(function (response) {
        console.log(response)
        letterUL.innerHTML = ``
        newLetterOnPage(response)
    });
})

let filters = [
    `work`,
    `love`,
    `family`,
    `school`,
    `misc`
]

filters.forEach(function(filter){
    let filterBtn = document.querySelector(`.label.${filter}`)

    filterBtn.addEventListener("click", function() {
        axios.get(liveURL+`letters/type/${filter}`)
        .then(function (response) {
            letterUL.innerHTML = ``    
            newLetterOnPage(response);
        });
    
    })
})

