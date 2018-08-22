"use strict";

console.log("Hello World from main.js");
var $submitButton = document.querySelector("button.send");
var usernameInput = document.querySelector("[name=\"username\"]");
var labelSelection = document.querySelector("#label_select");
var letterInput = document.querySelector("[name=\"letter\"]");
var letterUL = document.querySelector("ul.letters");
var allFilter = document.querySelector(".all");
var workFilter = document.querySelector(".work");
var loveFilter = document.querySelector(".love");
var familyFilter = document.querySelector(".family");
var schoolFilter = document.querySelector(".school");
var miscFilter = document.querySelector(".misc");

$submitButton.addEventListener("click", function () {
    var url = "http://localhost:1337/letters";
    var enteredUsername = usernameInput.value;
    var newUsername = "";

    if (!enteredUsername) {
        newUsername = "Me";
    } else {
        newUsername = enteredUsername.substring(0, 1).toUpperCase();
    }

    if (!labelSelection.value) {
        labelSelection.value = "misc";
    }

    axios.post(url, {
        username: newUsername,
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
    letterUL.innerHTML = "";
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
            // let newLetterDiv = document.createElement(`div`)
            var letterLabelDiv = document.createElement("div");
            var upvoteBtn = document.createElement("button");

            upvoteBtn.innerHTML = "UP";

            upvoteBtn.addEventListener("click", function () {
                // ajax req for /letters/:letterID/upvote
            });

            // newLetterListItem.classList.add(`letterDiv`)
            letterLabelDiv.classList.add("label", letter.label);
            letterLabelDiv.addEventListener("click", function () {
                axios.get("http://localhost:1337/letters/type/" + letter.label).then(function (response) {
                    // letterUL.innerHTML = ``
                    newLetterOnPage(response);
                });
            });

            letterLabelDiv.textContent = letter.label;

            newLetterListItem.innerHTML = "<p>" + letter.message + ".</p> <p class=\"salutations\">Love, " + letter.username + "</p>";

            newLetterListItem.appendChild(upvoteBtn);

            newLetterListItem.appendChild(letterLabelDiv);

            // newLetterListItem.appendChild(newLetterDiv)
            letterUL.appendChild(newLetterListItem);
        });
    }
};

allFilter.addEventListener("click", function () {
    axios.get("http://localhost:1337/letters/").then(function (response) {
        letterUL.innerHTML = "";
        newLetterOnPage(response);
    });
});

workFilter.addEventListener("click", function () {
    axios.get("http://localhost:1337/letters/type/work").then(function (response) {
        letterUL.innerHTML = "";
        newLetterOnPage(response);
    });
});

loveFilter.addEventListener("click", function () {
    axios.get("http://localhost:1337/letters/type/love").then(function (response) {
        letterUL.innerHTML = "";
        newLetterOnPage(response);
    });
});

familyFilter.addEventListener("click", function () {
    axios.get("http://localhost:1337/letters/type/family").then(function (response) {
        letterUL.innerHTML = "";
        newLetterOnPage(response);
    });
});

schoolFilter.addEventListener("click", function () {
    axios.get("http://localhost:1337/letters/type/school").then(function (response) {
        letterUL.innerHTML = "";
        newLetterOnPage(response);
    });
});

miscFilter.addEventListener("click", function () {
    axios.get("http://localhost:1337/letters/type/misc").then(function (response) {
        letterUL.innerHTML = "";
        newLetterOnPage(response);
    });
});
//# sourceMappingURL=main.js.map
