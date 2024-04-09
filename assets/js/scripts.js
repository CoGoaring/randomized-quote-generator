const div = document.querySelector(`#click`);
const quotesURL = `https://api.quotable.io/quotes/random?maxLength=35`;
const wordsURL = `https://random-word-api.herokuapp.com/word`;
const obj = {
    method: `GET`,
}

let randomQuote =``;

function getContent() {
    fetch(quotesURL, obj).then(response => response.json().then(function (data) {
        randomizeQuote(data[0].content);
      }));
}

function randomizeQuote(randomQuote) {
    console.log(randomQuote);
    // console.log(randomQuote.length);

    //for loop that grabs every word
    const quoteArray = randomQuote.split(" ");
    // console.log(quoteArray);
    let iterations = 0;
    // this should be reworked we dont need an else 
    // actually this whole for loop is deprecated, im leaving it in for now though since its part of the logic technically
    for (let i=0; i<quoteArray.length; i++) {
        if (quoteArray[i].length <= 4) {
            // nothing
        } else {
            iterations++;
        }
    }

    let randomPercent = randomInt(iterations + 1);

    const placeholder = [];
    for (let i=0; i<quoteArray.length; i++) {
        if (quoteArray[i].length > 4) {
            placeholder.push(getWordContent());
        } 
    }
    console.log(placeholder);
    // this is no random now
    // i think the issue is here, watch what happens when i run the code and notice how slowly the new words load 
    // it might not be able to apply them fast enough? so we might need some sort of buffer, but im unsure
    for (let i=0; i<quoteArray.length; i++) {
        if (quoteArray[i].length > 4) {
            quoteArray[i] = `${getWordContent()}`;

        } 
    }

    console.log(quoteArray);
    // console.log(randomPercent);
}

function getWordContent() {
    fetch(wordsURL, obj).then(response => response.json().then(function (data) {
        word(data[0]);
      }));
}

function word(word) {
    console.log(word); //yes
    // this would be returning a string at this point
    return word;
}

function randomInt(n) { 
    return Math.floor(Math.random() * n)
}

// take content and clean the data, trim() need number of words


// random % chance to select random number of words --> words >4 



// random chance will be based on the number of larger words that we can replace



// decide which words will be randomized in a few different ways 













div.addEventListener(`click`, getContent);