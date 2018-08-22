console.log(`Hello World from main.js`)
let $submitButton = document.querySelector(`button.send`)
let usernameInput = document.querySelector(`[name="username"]`)
let labelSelection = document.querySelector(`#label_select`)
let letterInput = document.querySelector(`[name="letter"]`)
let letterUL = document.querySelector(`ul.letters`)
let idCounter = 0

$submitButton.addEventListener(`click`, function() {
    let url = `http://localhost:1337/letters`
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


	axios.post(url, {
        id: idCounter++,
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
    console.log(response);
    newLetterOnPage(response);
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
            let upvoteBtn = document.createElement(`button`)

            upvoteBtn.innerHTML = "UP";

            upvoteBtn.addEventListener("click", function() {
                // ajax req for /letters/:letterID/upvote
            })
            
            // newLetterListItem.classList.add(`letterDiv`)
            letterLabelDiv.classList.add ("label", letter.label)
            letterLabelDiv.addEventListener("click", function() {
                axios.get(`http://localhost:1337/letters/${letter.label}`).then(function (response) {
                    newLetterOnPage(response);
                });
            })

            letterLabelDiv.textContent = letter.label
            
            newLetterListItem.innerHTML = `<p>${letter.message}.</p> <p class="salutations">Love, ${letter.username}</p>`
            
            newLetterListItem.appendChild(upvoteBtn)

            newLetterListItem.appendChild(letterLabelDiv)

            // newLetterListItem.appendChild(newLetterDiv)
            letterUL.appendChild(newLetterListItem)

        })
    }
}
