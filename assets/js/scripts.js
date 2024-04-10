const wrapper =document.querySelector('#wrapper');
const carousel =document.querySelector('#image-carousel');
let images = document.querySelectorAll('img');

const createdDiv = document.querySelectorAll(`div`);
const randomizedQuote = document.querySelector(`#randomized-quote`);

const btn = document.querySelectorAll('button');
const previous = document.querySelector('#prev');
const nxt =document.querySelector('#next');
const div = document.querySelector('#click');
const quotesURL = `https://api.quotable.io/quotes/random?maxLength=35`;
const wordsURL = `https://random-word-api.herokuapp.com/word`;
const obj = {
    method: `GET`,
}

let counter = 0;
let currentQuoteIndex = 0;

// localStorage, will return empty [] if there are no sentences generated yet
const sentences = JSON.parse(localStorage.getItem(`sentences`) || `["Randomized quote of the day"]`);
// localStorage ----------
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
    // localStorage ----------
    saveStorage(sentence);
    // localStorage ----------
    display(sentence);
}

// Get API values ----------
function getQuote() {
    fetch(quotesURL, obj).then(response => response.json()).then(function (data) {
        randomizeQuote(data[0].content);
      });
}
// might not need the async or await anymore? but it doesn't harm our code
async function getWord() {
    let word;
    return await fetch(wordsURL, obj).then(response => response.json()).then(function (data) {
        word = data[0];
        return word;
      });
}
// Get API values ----------

function display (sentence) {
    const newImg = document.createElement(`img`);

    newImg.setAttribute(`src`, `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_1280.png&f=1&nofb=1&ipt=2ad91ad2567b6243d67f48f72090b3542e6c93e8b1593285077c1f65f7ca970a&ipo=images`);
    carousel.appendChild(newImg);

    /*TODO: Make a conditional and a function that can pull the user from any position to the front, that way
            they can generate quotes from any quote they are currently on.*/
    // if (counter !== images.length) {
    //     counter = 
    // }
    // update
    currentQuoteIndex++;
    counter++;
    slideImage();
    setTimeout(() => {randomizedQuote.textContent = sentence}, 500);
}

// localStorage ----------
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
// localStorage ----------

div.addEventListener(`click`, getQuote);
// MORE JAVASCRIPT GOES HERE 

// CODE FOR MAKING THE IMAGES SLIDER 
images.forEach((img, index) =>{
    img.style.left  = `${index * 100}%`
    
})

function slideImage () {
    images = document.querySelectorAll('img');
    images.forEach((img, index) =>{
        img.style.left  = `${index * 100}%`
        
    })
    images.forEach(
        (e) => {
            e.style.transform = `translateX(-${counter*100}%)`
        }
    )
}

const prev = ()=>{
    if(counter > 0){

        counter--;
        slideImage();
        currentQuoteIndex--;
        randomizedQuote.textContent = "";
        setTimeout(() => {randomizedQuote.textContent = sentences[currentQuoteIndex]}, 1000);
    }
}

const next = ()=>{
    if(counter <= (images.length - 2)){

        counter++;
        slideImage();
        // console.log(counter);
        currentQuoteIndex++;
        randomizedQuote.textContent = "";
        setTimeout(() => {randomizedQuote.textContent = sentences[currentQuoteIndex]}, 1000);
    }

}