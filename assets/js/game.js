
// main function ---------------------------------
function playGame() {
    loadStartOutput();
    wordPicker();
    addLetterDivs();
    addHint();
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
        ["Shindig"    , "a dance, party, celebration"],
        ["mudpipes"   , "boots or shoes"],
        ["lickspittle", "one who will stoop to any dirty work"]
    ]
}
let stringObj = {
    lettersGuessed : ["none"],
    activeWord     : [],
    activeHint     : []
}
let count = {
    won       : 0,
    lost      : 0,
    remaining : 10
}
let image = {
    fuseProgress : ["url('assets/images/tnt.png')", "url('assets/images/tnt_1.png')", "url('assets/images/tnt_2.png')", 
                    "url('assets/images/tnt_3.png')", "url('assets/images/tnt_4.png')", "url('assets/images/tnt_5.png')",
                    "url('assets/images/tnt_6.png')", "url('assets/images/tnt_7.png')",, "url('assets/images/tnt_8.png')", 
                    "url('assets/images/tnt_9.png')", "url('assets/images/tnt_10.png')"],
    explosion    : ["url('assets/images/boom.png')"]
}
//------------------------------------------------ 

// game functions --------------------------------
// loadStartOutput() adds the start data for won/lost, guesses, and lights the bomb
function loadStartOutput() {
    // data load
    document.getElementById('wonOutput').innerHTML = count.won;
    document.getElementById('lostOutput').innerHTML = count.lost;
    document.getElementById('iGuessOutput').innerHTML = stringObj.lettersGuessed[0];
    document.getElementById('guessesRemaining').innerHTML = count.remaining;
    // light bomb
    let tntImg = document.getElementById('bombDiv');
    tntImg.style.backgroundImage = image.fuseProgress[1];
}
// selects a word/hint pair and adds them to the stringObj
function wordPicker() {
    let wordPicked = [];
    wordPicked = options.word[Math.floor(Math.random() * options.word.length)];
    stringObj.activeWord = wordPicked[0];
    stringObj.activeHint = wordPicked[1];
    //console.log(stringObj.activeWord);
    //console.log(stringObj.activeHint);
}
//
function addLetterDivs() {
    let numLetters = stringObj.activeWord.length;
    let _hiddenWord = document.getElementById('hiddenWord');
    console.log(stringObj.activeWord);
    console.log("num letters in word " + numLetters);
    _hiddenWord.innerHTML = "";
    for (let i = 0; i < numLetters; i++) {
        _hiddenWord.innerHTML += "<div class='letterBG bloom'></div>";
    }
}
// adds the hint for the user under the hidden word
function addHint() {
    document.getElementById('hiddenWordHint').innerHTML = 
        "Hint: " + stringObj.activeHint;
}

//
function addHiddenWord() {

}