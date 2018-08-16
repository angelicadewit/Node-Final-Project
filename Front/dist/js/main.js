"use strict";

console.log("Hello World from main.js");
var $submitButton = document.querySelector("button.send");
var usernameInput = document.querySelector("[name=\"username\"]");
var labelSelection = document.querySelector("#label_select");
var letterInput = document.querySelector("[name=\"letter\"]");
var letterUL = document.querySelector("ul.letters");

$submitButton.addEventListener("click", function () {
    var url = "http://localhost:1337/letters";

    if (!usernameInput.value) {
        usernameInput.value = "Me";
    }

    axios.post(url, {
        username: usernameInput.value.substring(0, 1).toUpperCase(),
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

    if (letters.data.length === 0) {
        letterUL.innerHTML += "<p>There are no letters available. Want to write something?</p>";
    } else {
        console.log("here are are the letters", letters);
        letterUL.innerHTML = "";

        letters.data.forEach(function (letter) {
            var newLetterListItem = document.createElement("li");
            var newLetterDiv = document.createElement("div");
            var letterLabelDiv = document.createElement("div");

            newLetterDiv.classList.add("letterDiv");
            letterLabelDiv.classList.add("label", letter.label);

            letterLabelDiv.textContent = letter.label;

            newLetterDiv.innerHTML = "<p>" + letter.message + ".</p> <p class=\"salutations\">Love, " + letter.username + "</p>";

            newLetterDiv.appendChild(letterLabelDiv);

            newLetterListItem.appendChild(newLetterDiv);
            letterUL.appendChild(newLetterListItem);
        });
    }
};
//# sourceMappingURL=main.js.map
