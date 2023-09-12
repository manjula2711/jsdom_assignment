const apiUrl = 'https://type.fit/api/quotes';
const quoteElement = document.querySelector('.quote');
const newQuoteButton = document.getElementById('new-quote-btn');

// Function to fetch a random quote from the API
async function fetchRandomQuote() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      // Get a random quote from the data
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];

      // Update the HTML with the random quote
      quoteElement.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <p>- ${randomQuote.author || 'Unknown'}</p>
      `;
    } else {
      // Handle error cases
      console.error('Error fetching random quote:', data);
      quoteElement.innerHTML = 'Unable to fetch a random quote.';
    }
  } catch (error) {
    console.error('Error:', error);
    quoteElement.innerHTML = 'An error occurred while fetching a random quote.';
  }
}

// Fetch a random quote when the page loads
window.addEventListener('load', fetchRandomQuote);

// Add a click event listener to the "New Quote" button
newQuoteButton.addEventListener('click', fetchRandomQuote);
