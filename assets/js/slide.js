const carousel =document.querySelector('#image-carousel');
let images = Array.from(document.querySelector('#image-carousel').children);

let counter = 0;
let currentQuoteIndex = 0;

// CODE FOR MAKING THE IMAGES SLIDER 
images.forEach((img, index) =>{
    img.style.left  = `${index * 100}%`
    
})
//Function to translate the image 
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
//slides the image to the left 
const prev = ()=>{
    if(counter > 0){

        counter--;
        slideImage();
        currentQuoteIndex--;
        randomizedQuote.textContent = "";
        setTimeout(() => {randomizedQuote.textContent = sentences[currentQuoteIndex]}, 1000);
    }
}
// slides the image to the right
const next = ()=>{
    if(counter <= (images.length - 2)){

        counter++;
        slideImage();
        currentQuoteIndex++;
        randomizedQuote.textContent = "";
        setTimeout(() => {randomizedQuote.textContent = sentences[currentQuoteIndex]}, 1000);
    }

}