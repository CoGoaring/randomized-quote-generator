const carousel =document.querySelector('#image-carousel');
let images = Array.from(document.querySelector('#image-carousel').children);

let counter = 0;
let currentQuoteIndex = 0;

// CODE FOR MAKING THE IMAGES SLIDER 
images.forEach((img, index) =>{
    img.style.left  = `${index * 100}%`
    
})
function slideImage () {
    images = Array.from(document.querySelector('#image-carousel').children);
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