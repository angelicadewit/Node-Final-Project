"use strict";

console.log("Hello World from main.js");
var $submitButton = document.querySelector("button.send");
var usernameInput = document.querySelector("[name=\"username\"]");
var labelSelection = document.querySelector("#label_select");
var letterInput = document.querySelector("[name=\"letter\"]");
var letterUL = document.querySelector("ul.letters");
var allFilter = document.querySelector(".all");

// let loveBtn = document.querySelector(`.loveBtn`)
// let numberOfLoveSpan = document.querySelector(`.loveReactions`)

var localURL = "http://localhost:1337/";
var liveURL = "http://206.189.78.79:1337/";

$submitButton.addEventListener("click", function () {
    event.preventDefault();
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

    axios.post(liveURL + "letters", {
        username: newUsername,
        label: labelSelection.value,
        message: letterInput.value
    }).then(function (response) {
        console.log(response);
        newLetterOnPage(response);
    }).catch(function (error) {
        console.log(error);
    });
});

axios.get(liveURL + "letters").then(function (response) {
    console.log(response);
    letterUL.innerHTML = "";
    newLetterOnPage(response);
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
            var reactionsDiv = document.createElement("div");
            var reactionsBtnDiv = document.createElement("div");

            var numberOfLoveSpan = document.createElement("span");
            var loveBtn = document.createElement("img");

            var numberOfSurpriseSpan = document.createElement("span");
            var surpriseBtn = document.createElement("img");

            var numberOfSadSpan = document.createElement("span");
            var sadBtn = document.createElement("img");

            // let repliesDiv = document.createElement(`div`)
            // let repliesSpan = document.createElement(`span`)

            newLetterListItem.classList.add(letter.label);

            numberOfLoveSpan.textContent = letter.love;
            numberOfLoveSpan.classList.add("loveReactions");
            loveBtn.src = "dist/img/56-3.png";

            numberOfSurpriseSpan.textContent = letter.surprise;
            surpriseBtn.src = "dist/img/56-1.png";
            numberOfSurpriseSpan.classList.add("surpriseReactions");

            numberOfSadSpan.textContent = letter.sad;
            sadBtn.src = "dist/img/56-2.png";
            numberOfSadSpan.classList.add("sadReactions");

            reactionsBtnDiv.classList.add("reactionBtn");
            reactionsDiv.classList.add("reaction");
            newLetterDiv.classList.add("letter");

            loveBtn.addEventListener("click", function () {
                axios.post(liveURL + "letters/" + letter.id + "/love").then(function (response) {
                    // addingAReaction(response)
                    event.preventDefault();
                    numberOfLoveSpan.textContent = "";
                    numberOfLoveSpan.textContent = response.data;
                });
            });

            surpriseBtn.addEventListener("click", function () {
                axios.post(liveURL + "letters/" + letter.id + "/surprise").then(function (response) {
                    event.preventDefault();
                    numberOfSurpriseSpan.textContent = "";
                    numberOfSurpriseSpan.textContent = response.data;
                });
            });

            sadBtn.addEventListener("click", function () {
                axios.post(liveURL + "letters/" + letter.id + "/sad").then(function (response) {
                    event.preventDefault();
                    numberOfSadSpan.textContent = "";
                    numberOfSadSpan.textContent = response.data;
                });
            });

            letterLabelDiv.classList.add("label", letter.label);
            letterLabelDiv.addEventListener("click", function () {
                axios.get(liveURL + ("letters/type/" + letter.label)).then(function (response) {
                    // letterUL.innerHTML = ``
                    newLetterOnPage(response);
                });
            });

            letterLabelDiv.textContent = letter.label;

            // repliesDiv.classList.add ("replies")
            // repliesDiv.addEventListener("click", showingReplies)

            // repliesDiv.textContent = `${letter.replies.length} replies`

            newLetterDiv.innerHTML = "<p>" + letter.message + ".</p> <p class=\"salutations\">Love, " + letter.username + "</p>";

            reactionsDiv.appendChild(letterLabelDiv);

            reactionsBtnDiv.appendChild(numberOfLoveSpan);
            reactionsBtnDiv.appendChild(loveBtn);

            reactionsBtnDiv.appendChild(numberOfSurpriseSpan);
            reactionsBtnDiv.appendChild(surpriseBtn);

            reactionsBtnDiv.appendChild(numberOfSadSpan);
            reactionsBtnDiv.appendChild(sadBtn);

            reactionsDiv.appendChild(reactionsBtnDiv);

            newLetterListItem.appendChild(newLetterDiv);
            newLetterListItem.appendChild(reactionsDiv);

            letterUL.appendChild(newLetterListItem);
        });
    }
};

allFilter.addEventListener("click", function () {
    axios.get(liveURL + "letters").then(function (response) {
        console.log(response);
        letterUL.innerHTML = "";
        newLetterOnPage(response);
    });
});

var filters = ["work", "love", "family", "school", "misc"];

filters.forEach(function (filter) {
    var filterBtn = document.querySelector(".label." + filter);

    filterBtn.addEventListener("click", function () {
        axios.get(liveURL + ("letters/type/" + filter)).then(function (response) {
            letterUL.innerHTML = "";
            newLetterOnPage(response);
        });
    });
});
//# sourceMappingURL=main.js.map
