// Define the API endpoint
const apiUrl = 'https://restcountries.com/v3/all';

// Function to fetch country data from the API
async function fetchCountryData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      // Process the data and display information for one or more countries
      displayCountryInfo(data);
    } else {
      // Handle error cases
      console.error('Error fetching country data:', data);
      const countryInfoElement = document.querySelector('.country-info');
      countryInfoElement.innerHTML = 'Unable to fetch country data.';
    }
  } catch (error) {
    console.error('Error:', error);
    const countryInfoElement = document.querySelector('.country-info');
    countryInfoElement.innerHTML = 'An error occurred while fetching country data.';
  }
}

// Function to display country information on the webpage
function displayCountryInfo(countries) {
  const countryInfoElement = document.querySelector('.country-info');
  
  // Create a select element to choose a country
  const select = document.createElement('select');

  // Add an option for each country
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.cca2; // Use the country code as the value
    option.textContent = country.name.common;
    select.appendChild(option);
  });

  // Create an empty div to display country information
  const countryDetail = document.createElement('div');
  countryDetail.classList.add('country-detail');

  // Add event listener to the select element
  select.addEventListener('change', () => {
    const selectedCountryCode = select.value;
    const selectedCountry = countries.find(country => country.cca2 === selectedCountryCode);

    if (selectedCountry) {
      // Display selected country information
      countryDetail.innerHTML = `
        <h2>${selectedCountry.name.common}</h2>
        <p>Capital: ${selectedCountry.capital[0]}</p>
        <p>Population: ${selectedCountry.population}</p>
        <p>Region: ${selectedCountry.region}</p>
      `;
    }
  });

  // Append the select and country detail to the container
  countryInfoElement.innerHTML = '';
  countryInfoElement.appendChild(select);
  countryInfoElement.appendChild(countryDetail);
}

// Call the fetchCountryData function when the page loads
window.addEventListener('load', fetchCountryData);
