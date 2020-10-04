const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn= document.getElementById('new-quote')
let apiQuotes = [];
// show new quote
function newQuote(){
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
   quoteText.textContent = quote.text;
}
// get api quote
async function getQuotes(){
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