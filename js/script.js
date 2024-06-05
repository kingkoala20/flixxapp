/* Page Routing */
const global = {
  currentPage: window.location.pathname,
};

// Display 20 popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('/movie/popular');
  const popularMoviesContainer = document.querySelector('#popular-movies');
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');

    const posterImg = document.createElement('img');
    posterImg.setAttribute(
      'src',
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/images/no-image.jpg'
    );
    posterImg.classList.add('card-img-top');
    posterImg.setAttribute('alt', movie.title);
    div.appendChild(posterImg);

    const divBody = document.createElement('div');
    divBody.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');

    const title = document.createTextNode(movie.title);
    h5.appendChild(title);
    divBody.appendChild(h5);

    const p = document.createElement('p');
    p.classList.add('card-text');

    const small = document.createElement('small');
    small.classList.add('text-muted');

    const releaseInfoText = document.createTextNode(
      `Release: ${movie.release_date}`
    );
    small.appendChild(releaseInfoText);

    p.appendChild(small);
    divBody.appendChild(p);
    div.appendChild(divBody);

    popularMoviesContainer.appendChild(div);
  });
}

// Display 20 popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('/tv/popular');
  const popularMoviesContainer = document.querySelector('#popular-shows');
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');

    const posterImg = document.createElement('img');
    posterImg.setAttribute(
      'src',
      show.poster_path
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : '/images/no-image.jpg'
    );
    posterImg.classList.add('card-img-top');
    posterImg.setAttribute('alt', show.title);
    div.appendChild(posterImg);

    const divBody = document.createElement('div');
    divBody.classList.add('card-body');

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');

    const title = document.createTextNode(show.name);
    h5.appendChild(title);
    divBody.appendChild(h5);

    const p = document.createElement('p');
    p.classList.add('card-text');

    const small = document.createElement('small');
    small.classList.add('text-muted');

    const releaseInfoText = document.createTextNode(
      `Release: ${show.first_air_date}`
    );
    small.appendChild(releaseInfoText);

    p.appendChild(small);
    divBody.appendChild(p);
    div.appendChild(divBody);

    popularMoviesContainer.appendChild(div);
  });
}

// Fetch data from TMDB API

async function fetchAPIData(endpoint) {
  const API_KEY = '10a44ad78a6b570375648f61a7eb8b8a'; // todo: transfer to backend later
  const API_URL = 'https://api.themoviedb.org/3';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en_US`
  );
  hideSpinner();
  return await response.json();
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.main-header .container .nav-link');

  let targetLink;
  links.forEach((linkElm) => {
    if (linkElm.getAttribute('href') === global.currentPage) {
      linkElm.classList.add('active');
    }
  });
}

/* Init App */
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
