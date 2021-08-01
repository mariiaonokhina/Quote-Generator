$(document).ready(function() {

    const quoteContainer = document.getElementById("quoteContainer");

    const quoteText = document.getElementById("quoteText");

    const quoteAuthor = document.getElementById("author");

    const twitterBtn = document.getElementById("twitter");

    const newQuoteBtn = document.getElementById("newQuote");

    const loader = document.getElementById("loader");

    // It is an empty array because its value will be changed later. We should set up constants when the value is NEVER CHANGING
    let apiQuotes = []

    // Show loading
    function loading() {

      loader.hidden = false;

      quoteContainer.hidden = true;

    }

    // Hide loading
    function complete() {

      quoteContainer.hidden = false;

      loader.hidden = true;

    }


    // Show new quote
    function newQuote() {

      loading();

      // Pick a random quote from apiQuotes array
      const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

      // Set the value of text content.
      quoteText.textContent = quote.text;

      // Check if author field is blank and replace it with "unknown"
      if (!quote.author) {
      
        quoteAuthor.textContent = "Unknown";

      }   else {

        quoteAuthor.textContent = quote.author;

      }

      // Check if the quote is too long and apply class longQuote
      if (quote.text.length > 120) {

        quoteText.classList.add("longQuote");

      }   else {

        quoteText.classList.remove("longQuote");

      }

      // Set quote, hide loader
      quoteText.textContent = quote.text;

      complete();

    }

    // Get Quotes from API
    // async function works indepently anytime, it won't stop the browser from completing the loading of a page

    async function getQuotes() {

      loading();

      // API URL link
      const apiUrl = "https://type.fit/api/quotes";

      // Try-catch request allows to try and complete a function, but if it doesn't work, we can set up an error message and do something about it
      try {

        // The constant will not be populated until it has some data fetched from api
        const response = await fetch(apiUrl);

        // We are getting json response from api and turning that response into a global variable
        apiQuotes = await response.json();

        newQuote();

      } catch (error) {

        // Catch Error Here

      }

    }

    // On Load - Run function as soon as the page loads
    getQuotes();

    // Tweet Quote
    function tweetQuote() {

      // Template String uses backward ticks
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;

      // Open a window in a new tab
      window.open(twitterUrl, '_blank');

    }

    // Event Listeners
    newQuoteBtn.addEventListener("click", newQuote);

    twitterBtn.addEventListener("click", tweetQuote);

  });