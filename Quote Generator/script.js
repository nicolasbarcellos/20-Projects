const quoteContainer = document.querySelector("[data-js='quote-container']");
const quoteText = document.querySelector("[data-js='quote']");
const authorText = document.querySelector("[data-js='author']");
const twitterBtn = document.querySelector("[data-js='twitter']");
const newQuoteBtn = document.querySelector("[data-js='new-quote']");
const loader = document.querySelector("[data-js='loader']");
let counter = 0;

const apiUrl =
  "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function getQuote() {
  try {
    loading();
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data.quoteAuthor) {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    complete();
  } catch (error) {
    counter++;
    if (counter > 10) return;
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
