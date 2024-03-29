import logo from './logo.svg';
import './App.css';
import './script';

function App() {
  return (
    <div className='App'>
      <header>
        <h1 id='title'>Movie and TV Search</h1>
        <form id='search-form'>
          <input
            type='text'
            id='search-box'
            placeholder='Enter a tv show or movie to search for and press enter'
          />
        </form>
      </header>
      <div id='container'>
        <div id='movie-info'>
          <p id='error'>Error</p>
          <a id='title'>Title</a>
          <img id='poster' />
          <p id='plot'>Plot</p>
          <p id='actors'>Actors</p>
          <p id='genre'>Genre</p>
          <p id='runtime'>Runtime</p>
          <p id='rating'>Rating</p>
          <p id='total-seasons'>Total Seasons</p>
          <p id='year'>Year</p>
        </div>
      </div>
      <footer>
        <p>
          Powered using the OMDB API -
          <a href='https://omdbapi.com/'>https://omdbapi.com/</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
