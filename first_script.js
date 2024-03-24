console.log('I am connected');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

// Search btn event handler------------------------
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
// search btn event listener ---------------------
// SECTION getPARAMS---------------------------------

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  //pop() in an array will take last element in array and assign 0, 1 as in query and format
  var query = searchParamsArr[0].split('=').pop();
  var limit = searchParamsArr[1].split('=').pop();

  searchApi(query, limit);
}

// SECTION Search API-----------------------------
//IMPORTANT if will use in future fix this secret issue
const APIKey = process.env.APIKey;
function searchApi(query, limit) {
  var locQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${APIKey}`;

  //fo is jason format
  if (limit) {
    locQueryUrl =
      'http://api.openweathermap.org/geo/1.0/direct' + limit + '/?fo=json';
  }

  locQueryUrl = locQueryUrl + '&q=' + query;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        //throw creates an error and retursn to promissed function in catch method
        throw response.json();
      }

      return response.json();
    })
    //promise is followed by a then
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.search.query;

      console.log(locRes);

      if (!locRes.results.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.results.length; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
    //.catch()method
    .catch(function (error) {
      console.error(error);
    });
}

var resultCard = document.getElementById('result-content');
// SECTION printRESULTS
function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content

  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

// SECTION handle search form submit
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(searchInputVal, formatInputVal);
}
getParams();
