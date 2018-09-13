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

axios.get("http://localhost:1337/letters").then(function (response) {
    console.log(response)
    letterUL.innerHTML = ``
    newLetterOnPage(response)
});

axios.get("http://localhost:1337/letters/").then(function (response) {
    console.log(response)
    letterUL.innerHTML = ``
    newLetterOnPage(response)
});


let newLetterOnPage = function(letters){
    if (letters.data.length === 0){
        letterUL.innerHTML += `<p>There are no letters available. Want to write something?</p>`
    } else {
        console.log(`here are are the letters`, letters)
        letterUL.innerHTML = ``

        letters.data.forEach(function(letter) {
            let newLetterListItem = document.createElement(`li`)
            // let newLetterDiv = document.createElement(`div`)
            let letterLabelDiv = document.createElement(`div`)
            let reactionsDiv = document.createElement(`div`)
            let numberOfLovesSpan = document.createElement(`span`)
            let lovesBtn = document.createElement(`img`)

            lovesBtn.src = "../dist/img/56-3.png";
            reactionsDiv.classList.add(`reaction`)

            lovesBtn.addEventListener("click", function() {
                // /letters/:id/loves
                axios.post(localURL + "/" + letter.id + "/loves")
                    .then((response) => {
                        numberOfLovesSpan.textContent = ``
                        numberOfLovesSpan.textContent = response.data
                    })
            })
            
            // newLetterListItem.classList.add(`letterDiv`)
            letterLabelDiv.classList.add ("label", letter.label)
            letterLabelDiv.addEventListener("click", function() {
                axios.get(`http://localhost:1337/letters/type/${letter.label}`).then(function (response) {
                    // letterUL.innerHTML = ``
                    newLetterOnPage(response);
                });
            })

            letterLabelDiv.textContent = letter.label
            
            newLetterListItem.innerHTML = `<p>${letter.message}.</p> <p class="salutations">Love, ${letter.username}</p>`
            
            reactionsDiv.appendChild(numberOfLovesSpan)
            reactionsDiv.appendChild(lovesBtn)

            
            newLetterListItem.appendChild(reactionsDiv)

            newLetterListItem.appendChild(letterLabelDiv)

            // newLetterListItem.appendChild(newLetterDiv)
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