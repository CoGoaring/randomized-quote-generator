const div = document.querySelector(`#click`);
const quotesURL = `https://api.quotable.io/quotes/random?maxLength=35`;
const wordsURL = `https://random-word-api.herokuapp.com/word`;
const obj = {
    method: `GET`,
}

let randomQuote =``;

function generatePromises(quoteArray) {
    // this becomes an array of functions -->
    let promises = [];

    for (let i=0; i<quoteArray.length; i++) {
        if (quoteArray[i].length > 4) {
            quoteArray[i] = `randomize`;
            // <-- here we pass the function we want to run (but its time consuming)
            promises.push(getWord());
        } 
    }

    // here when we return the Promise.all we run the array of functions, running the function
    // we passed as many indexes as are in the array of functions above.
    return Promise.all(promises);
}

function randomizeQuote(randomQuote) {
    console.log(randomQuote);

    const quoteArray = randomQuote.split(" ");
    // here we are grabbing said data from the promise, similar to how you would a fetch because
    // a fetch is technically a promise.
    generatePromises(quoteArray).then(newWords => {
        let newWordCount = 0;
        for (let i=0; i<quoteArray.length; i++) {
            if (quoteArray[i] === `randomize`) {
                quoteArray[i] = newWords[newWordCount];
                newWordCount++;
            }
        }
        console.log(quoteArray);

        reCreateString(quoteArray);
    });
}

function reCreateString(quoteArray) {
    let sentence = "";
    for (let i=0; i<quoteArray.length; i++) {
        sentence += `${quoteArray[i]} `;
    }
    console.log(sentence);

    return sentence;
}

function getQuote() {
    fetch(quotesURL, obj).then(response => response.json()).then(function (data) {
        randomizeQuote(data[0].content);
      });
}

function getWord() {
    let word;
    return fetch(wordsURL, obj).then(response => response.json()).then(function (data) {
        // word(data[0]);
        word = data[0];
        // console.log(word);
        return word;
      });
}

div.addEventListener(`click`, getQuote);
// MORE JAVASCRIPT GOES HERE 
