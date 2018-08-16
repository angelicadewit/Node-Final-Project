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
        username: usernameInput.value.substring(0, 1),
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

    letters.data.forEach(function (letter) {
        var newLetterListItem = document.createElement("li");
        var newLetterDiv = document.createElement("div");
        var letterLabelDiv = document.createElement("div");

        newLetterDiv.classList.add("letterDiv");
        letterLabelDiv.classList.add("label", letter.label);

        letterLabelDiv.textContent = letter.label;

        newLetterDiv.innerHTML = letter.message + ". Love, " + letter.username;

        newLetterDiv.appendChild(letterLabelDiv);

        newLetterListItem.appendChild(newLetterDiv);
        letterUL.appendChild(newLetterListItem);
    });
};
//# sourceMappingURL=main.js.map
