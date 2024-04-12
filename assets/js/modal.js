// From the bulma framework
// Function to open the modal
async function openModal(){
    // Add is-active class to the modal
    document.getElementById('modal').classList.add('is-active');
    // We have to await our quote in order to perform more code
    let sentence = await getQuote()
    setTimeout(() => {modalRandomizedQuote.textContent = sentence}, 500);
}

// This function adds the image we want to the gallery section below the modal, saving it to local storage in the process
function addToGallery() {
    const sentence = modalRandomizedQuote.textContent;
    randomizedQuote.textContent = sentence;
    saveStorage(sentence);

    const newImg = document.createElement(`img`);
    newImg.setAttribute(`src`, `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_1280.png&f=1&nofb=1&ipt=2ad91ad2567b6243d67f48f72090b3542e6c93e8b1593285077c1f65f7ca970a&ipo=images`);
    carousel.append(newImg);

    // update
    currentQuoteIndex++;
    counter++;
    slideImage();
    changeQuote();
    closeModal();
}

// Function to swap the text if we didn't like the previous quote
async function changeQuote() {
    let sentence = await getQuote();
    modalRandomizedQuote.textContent = sentence;
}

// From the bulma framework
document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete .modal-card-foot .button').forEach(($el) => {
    const $modal = $el.closest('.modal');

    $el.addEventListener('click', () =>{
        $modal.classList.remove('is-active')
    })
})

// Function to back out of the modal
function closeModal(){
    document.getElementById('modal').classList.remove('is-active')
}