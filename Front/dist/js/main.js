"use strict";

console.log("Hello World from main.js");
var $submitButton = document.querySelector("button.send");
var usernameInput = document.querySelector("[name=\"username\"]");
var labelSelection = document.querySelector("#label_select");
var letterInput = document.querySelector("[name=\"letter\"]");

$submitButton.addEventListener("click", function () {
    var url = "http://localhost:1337/letters";

    if (!usernameInput.value) {
        usernameInput.value = "Me";
    }

    axios.post(url, {
        username: usernameInput.value,
        label: labelSelection.value,
        message: letterInput.value
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
});

axios.get("http://localhost:1337/letters").then(function (response) {
    console.log(response);
    newLetterOnPage(response);
});

var newLetterOnPage = function newLetterOnPage(letters) {
    console.log("here are are the letters", letters);
    var letterUL = document.querySelector("ul.letters");

    letters.data.forEach(function (letter, i) {
        var newLetter = document.createElement("li");

        newLetter.innerHTML = "" + letter.username;

        // let delButton = document.createElement(`button`)
        // delButton.textContent = `delete`

        // delButton.addEventListener(`click`, function() {
        //     axios.delete(`http://localhost:1337/message/`+ i)
        //     .then(function(response) {

        //     })
        //     .catch(function(response) {})
        // })

        // newMessage.appendChild(delButton)
        letterUL.appendChild(newLetter);
    });
};
//# sourceMappingURL=main.js.map
