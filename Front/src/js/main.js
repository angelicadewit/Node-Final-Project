console.log(`Hello World from main.js`)
let $submitButton = document.querySelector(`button.send`)
let usernameInput = document.querySelector(`[name="username"]`)
let labelSelection = document.querySelector(`#label_select`)
let letterInput = document.querySelector(`[name="letter"]`)

$submitButton.addEventListener(`click`, function() {
    let url = `http://localhost:1337/letters`

    if (!usernameInput.value) {
        usernameInput.value = `Me`
    }

	axios.post(url, {
        username: usernameInput.value.substring(0, 1),
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
    console.log(`here are are the letters`, letters)
    let letterUL = document.querySelector(`ul.letters`)

    letters.data.forEach(function(letter) {
        let newLetterListItem = document.createElement(`li`)
        let newLetterDiv = document.createElement(`div`)
        let letterLabelDiv = document.createElement(`div`)

        
        newLetterDiv.classList.add(`letterDiv`)
        letterLabelDiv.classList.add ("label", letter.label)

        letterLabelDiv.textContent = letter.label
        
        newLetterDiv.innerHTML = `${letter.message}. Love, ${letter.username}`

        newLetterDiv.appendChild(letterLabelDiv)

        newLetterListItem.appendChild(newLetterDiv)
        letterUL.appendChild(newLetterListItem)

    })
}
