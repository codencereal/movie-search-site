// This script fetches movie and tv show data from the OMDB API using the user's input as the search query
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const apiKey = '59bd8244';
const blacklistedCharacters = '#';

const elements = document.getElementById('movie-info').children;
const infoElements = [];

for (const element of elements) infoElements.push(element);

const [
  error,
  title,
  poster,
  plot,
  actors,
  genre,
  runtime,
  rating,
  seasons,
  year
] = infoElements;

function convertMinutesToHoursAndMinutes(numOfMinutes) {
  let hours = Math.floor(numOfMinutes / 60);
  let minutes = numOfMinutes % 60;
  if (!hours) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  else if (!minutes) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  else
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutes} ${
      minutes === 1 ? 'minute' : 'minutes'
    }`;
}

function getAPIData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        console.log('API call was a success');
        return response.json();
      } else {
        console.log('API call failed');
        throw 'API call failed';
      }
    })
    .catch((err) => console.error(err));
}

function displayAPIData(data) {
  const {
    //Destructure the data object that's passed in
    Actors,
    Director,
    Genre,
    imdbID,
    Plot,
    Poster,
    Rated,
    Response,
    Runtime,
    totalSeasons,
    Title,
    Type,
    Year
  } = data;
  let isMovie = Type === 'movie' ? true : false;

  if (Response === 'False' || Genre === 'Adult') {
    for (let i = 1; i < infoElements.length; i++)
      infoElements[i].style.display = 'none';
    error.style.display = 'block';
    error.innerHTML = 'Movie/TV Show not found :(';
    return;
  }

  error.style.display = 'none';
  for (let i = 1; i < infoElements.length; i++)
    infoElements[i].style.display = 'block';
  if (isMovie) seasons.style.display = 'none';
  else seasons.style.display = 'block';

  title.innerHTML = `${Title}`;
  title.href = `https://www.imdb.com/title/${imdbID}`;
  poster.style.display = 'block';
  poster.src = Poster;
  plot.innerHTML = Plot;
  actors.innerHTML = `Starring: ${Actors}`;
  genre.innerHTML = `Genre: ${Genre}`;
  rating.innerHTML = `Rating: ${Rated}`;
  runtime.innerHTML = `${
    isMovie ? 'Runtime:' : 'Episode Runtime:'
  } ${convertMinutesToHoursAndMinutes(
    parseFloat(Runtime.slice(0, Runtime.length - 4)) //Removes ' min' from the end of the string and converts it to a float
  )}`;
  seasons.innerHTML = `Seasons: ${totalSeasons}`;
  year.innerHTML = `Year(s): ${Year}`;
}

async function callAndPrintFromAPI(data, url) {
  data = await getAPIData(url).then((data) => data);
  displayAPIData(data);
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (searchBox.value === '') return;

  let urlToCall = '';
  let movieData = {};
  //Inserts plus signs into the movie or show entered in order to format a valid search query
  let searchQuery = searchBox.value.replaceAll(' ', '+');

  //Removes characters which invalidate the search query
  for (let i = 0; i < blacklistedCharacters.length; i++)
    searchQuery = searchQuery.replaceAll(blacklistedCharacters[i], '');

  urlToCall = `https://omdbapi.com/?t=${searchQuery}&apikey=${apiKey}`;
  console.log(searchQuery);
  console.log(urlToCall);

  callAndPrintFromAPI(movieData, urlToCall);
});

window.addEventListener('load', () => {
  searchForm.reset();
});
