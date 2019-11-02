
// main function ---------------------------------
function takeAction(event) {
    userInput(activeStringObj, event.key);
}

function playGame() {
    // reset all active strings back to empty arrays
    activeStringObj = {i_lettersGuessed:[],
        c_lettersGuessed:[], activeWord:[], activeHint:[]};
    // resets counts
    count.remaining = 10;
    count.c_letters = 0;
    // clears displayed incorrectly guessed letters
    document.getElementById('iGuessOutput').innerText = activeStringObj.i_lettersGuessed;
    //resets oldWest title
    $("#oldWest").removeClass("youWon youLost").addClass("oldWest").text("The Old West");

    loadStartOutput();
    wordPicker(activeStringObj);
    addLetterDivs(activeStringObj); 
    addHint(activeStringObj);

    document.addEventListener('keyup', takeAction);
}

// objects ---------------------------------------
let options = {
    word  :  [
        ["angelicas"  , "young unmarried women"],
        ["bamboozle"  , "to deceive, impose upon, confound"],
        ["copperhead" , "northern person with Southern, anti-Union sympathies"],
        ["firewater"  , "liquor"],
        ["gallnipper" , "a large mosquito"],
        ["hardfisted" , "covetous, close-handed, miserly."],
        ["lambasting" , "a beating, a thrashing"],
        ["maverick"   , "An unbranded calf"],
        ["unshucked"  , "cowboy talk for naked"],
        ["hornswoggle", "to cheat or trick"],
        ["wabble"     , "make free use of one’s tongue"],
        ["hellabaloo" , "riotous noise, confusion"],
        ["shindig"    , "a dance, party, celebration"],
        ["mudpipes"   , "boots or shoes"],
        ["lickspittle", "one who will stoop to any dirty work"]
    ]
}
let activeStringObj = {
    i_lettersGuessed : [],
    c_lettersGuessed : [],
    activeWord       : [],
    activeHint       : []
}
let count = {
    won       : 0,
    lost      : 0,
    remaining : 10,
    c_letters : 0
}
let image = {
    fuseProgress : ["url('assets/images/tnt.png')", "url('assets/images/tnt_1.png')", "url('assets/images/tnt_2.png')", 
                    "url('assets/images/tnt_3.png')", "url('assets/images/tnt_4.png')", "url('assets/images/tnt_5.png')",
                    "url('assets/images/tnt_6.png')", "url('assets/images/tnt_7.png')",, "url('assets/images/tnt_8.png')", 
                    "url('assets/images/tnt_9.png')", "url('assets/images/tnt_10.png')", "url('assets/images/tnt_11.png')"],
    tntImg       : document.getElementById('bombDiv')
}
let state = {
    allLettersCorrect : false
}
//------------------------------------------------ 

// game functions --------------------------------
// loadStartOutput() adds the start data for won/lost, guesses, and lights the bomb
function loadStartOutput() {
    // data load
    document.getElementById('wonOutput').innerHTML = count.won;
    document.getElementById('lostOutput').innerHTML = count.lost;
    // resets count remaining for each game
    document.getElementById('guessesRemaining').innerHTML = count.remaining;
}
// selects a word/hint pair and adds them to the activeStringObj
function wordPicker(activeStringObj) {
    let wordPicked = [];
    wordPicked = options.word[Math.floor(Math.random() * options.word.length)];
    activeStringObj.activeWord = wordPicked[0];
    activeStringObj.activeHint = wordPicked[1];
}
// adds the divs with letters, but letters are hidden 
function addLetterDivs(activeStringObj) {
    let numLetters = activeStringObj.activeWord.length;
    let _hiddenWord = document.getElementById('hiddenWord');
    _hiddenWord.innerHTML = "";
    for (let i = 0; i < numLetters; i++) {
        _hiddenWord.innerHTML += 
            "<div class='letterBG bloom'>" + 
                "<span class='letterText hidden' id='letter-" + i + "'>" + 
                    activeStringObj.activeWord[i] + 
                "</span></div>";
    }
    // to help out the struggling guesser
    console.log("hidden word: " + activeStringObj.activeWord);
}

// adds the hint for the user under the hidden word
function addHint(activeStringObj) {
    document.getElementById('hiddenWordHint').innerHTML = 
        "Hint: " + activeStringObj.activeHint;
}

// gets input from user and sorts it
function userInput(activeStringObj, passed_key) {
    // make user input lower case
    let passed = passed_key;
    let key    = passed.toLowerCase();
    // ensures user input is a valid letter or a space (might add phrases later)
    if (key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122 && key.length === 1) {
        // if the key is in the hidden word, and has not been guessed already, show the letter
        if (activeStringObj.activeWord.indexOf(key) > -1 && activeStringObj.c_lettersGuessed.indexOf(key) === -1) {
            for (let i = 0; i < activeStringObj.activeWord.length; i++) {
                if (activeStringObj.activeWord[i] === key) {
                    var abc = document.getElementById('letter-' + i);
                    $(abc).removeClass("hidden");
                    count.c_letters += 1;
                }
            }
            activeStringObj.c_lettersGuessed.push(key);
            // if the letter is not in the word, add it to the i_lettersGuessed
        } else if (activeStringObj.i_lettersGuessed.indexOf(key) === -1 && activeStringObj.c_lettersGuessed.indexOf(key) === -1) {
            activeStringObj.i_lettersGuessed.push(key);
            // clears incorrect letters guessed and re-adds array
            document.getElementById('iGuessOutput').innerText = activeStringObj.i_lettersGuessed;
            // decrements incorrect letters guesses count and displays it
            count.remaining -= 1;
            document.getElementById('guessesRemaining').innerHTML = count.remaining;
        }
        // do check for endRound conditions 
        endRound();
    }  
}

function endRound() {
    // --- lost conditions ---
    if (count.remaining === 0) {
        count.lost += 1;
        document.getElementById('lostOutput').innerHTML = count.lost;
        // updates the text on the page with 'you lost'
        $("#oldWest").removeClass("oldWest").addClass("youLost").text("Sorry, You Lost");
        // should remove event listener from previous game
        document.removeEventListener('keyup', takeAction);
        // burns the wick based on lost count
        image.tntImg.style.backgroundImage = image.fuseProgress[count.lost + 1];
        if (count.lost === 11) {
            setTimeout(function(){ alert(
                "You are reading this as a ghost.\n" +  
                "The bomb exploded and you are now dead.\n" + 
                "Feel free to continue playing the game as a ghost.");}, 1200);
        }

    // --- won conditions ---
    } else if (count.c_letters >= activeStringObj.activeWord.length) {
        count.won += 1;
        document.getElementById('wonOutput').innerHTML = count.won;
        $("#oldWest").removeClass("oldWest").addClass("youWon").text("Yay, You Won!");
        // should remove event listener from previous game
        document.removeEventListener('keyup', takeAction);
    }
}
