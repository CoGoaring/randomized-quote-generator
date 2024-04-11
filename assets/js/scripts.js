const randomizedQuote = document.querySelector(`#randomized-quote`);
const modalRandomizedQuote = document.querySelector(`#modal-randomized-quote`);
const quotesURL = `https://api.quotable.io/quotes/random?maxLength=35`;
const wordsURL = `https://random-word-api.herokuapp.com/word`;
const obj = {
    method: `GET`,
}


// localStorage, will return empty [] if there are no sentences generated yet -------------------------
const sentences = JSON.parse(localStorage.getItem(`sentences`) || `["Randomized quote of the day"]`);
// localStorage ---------------------------------------------------------------------------------------


// Our code will call getQuote to start the chain that will lead to returning a sentence 
// Get API values -------------------------------------------------------------------------------------
let randomQuote =``;
async function getQuote() {
    return await fetch(quotesURL, obj).then(response => response.json()).then(function (data) {
        return randomizeQuote(data[0].content);
      });
}
async function getWord() {
    let word;
    return await fetch(wordsURL, obj).then(response => response.json()).then(function (data) {
        word = data[0];
        return word;
      });
}
// Get API values -------------------------------------------------------------------------------------


// Generate Quote -------------------------------------------------------------------------------------
async function randomizeQuote(randomQuote) {
    const quoteArray = randomQuote.split(" ");
    // here we are grabbing said data from the promise, similar to how you would a fetch because
    // a fetch is technically a promise.
     return await generatePromises(quoteArray).then(newWords => {
        let newWordCount = 0;
        for (let i=0; i<quoteArray.length; i++) {
            if (quoteArray[i] === `randomize`) {
                quoteArray[i] = newWords[newWordCount];
                newWordCount++;
            }
        }

        return reCreateString(quoteArray);
    });
}
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
// This is where the sentence is returned from
function reCreateString(quoteArray) {
    let sentence = "";
    for (let i=0; i<quoteArray.length; i++) {
        sentence += `${quoteArray[i]} `;
    }

    return sentence;
}
// Generate Quote -------------------------------------------------------------------------------------


// localStorage ---------------------------------------------------------------------------------------
function saveStorage(sentence) {
    console.log(sentences);
    sentences.push(sentence);
    localStorage.setItem(`sentences`, JSON.stringify(sentences));
}
function deleteStorage() {
    localStorage.setItem(`sentences`, `[]`);
}
function deleteStorageItem(index) {
    const removed = sentences.splice(index, 1)
    localStorage.setItem(`sentences`, JSON.stringify(sentences));
}
// localStorage ---------------------------------------------------------------------------------------