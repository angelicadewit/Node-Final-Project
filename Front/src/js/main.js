console.log(`Hello World from main.js`)
let $submitButton = document.querySelector(`button.send`)
let usernameInput = document.querySelector(`[name="username"]`)
let labelSelection = document.querySelector(`#label_select`)
let letterInput = document.querySelector(`[name="letter"]`)
let letterUL = document.querySelector(`ul.letters`)

$submitButton.addEventListener(`click`, function() {
    let url = `http://localhost:1337/letters`

    if (!usernameInput.value) {
        usernameInput.value = `Me`
    }

    if (!labelSelection.value) {
        labelSelection.value = `misc`
    }


	axios.post(url, {
        username: usernameInput.value.substring(0, 1).toUpperCase(),
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
            let newLetterDiv = document.createElement(`div`)
            let letterLabelDiv = document.createElement(`div`)

            
            newLetterDiv.classList.add(`letterDiv`)
            letterLabelDiv.classList.add ("label", letter.label)

            letterLabelDiv.textContent = letter.label
            
            newLetterDiv.innerHTML = `<p>${letter.message}.</p> <p class="salutations">Love, ${letter.username}</p>`

            newLetterDiv.appendChild(letterLabelDiv)

            newLetterListItem.appendChild(newLetterDiv)
            letterUL.appendChild(newLetterListItem)

        })
    }
}
