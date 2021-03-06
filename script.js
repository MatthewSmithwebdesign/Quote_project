const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn= document.getElementById('new-quote')
const loader =document.getElementById('loader');
let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// show new quote
function newQuote(){
    loading();
  // pick a random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];  
  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
  // check if author is Blank and replace it with Unknown
  if(!quote.author){
      authorText.textContent='Unknown';
} else{
    authorText.textContent = quote.author;
}
  // check quote length to determine styling
  if (quote.text.length > 120){
      quoteText.classList.add('long-quote');
   }else{
       quoteText.classList.remove('long-quote');
   }
   // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}
// get api quote
async function getQuotes(){
    loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try{
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      
      newQuote();
  } catch (error) {
    getQuotes();
      
 }
}
// Tweet Quote
function tweetQuote(){
    const TwitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(TwitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//on load
getQuotes();