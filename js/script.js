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

    const anchorElm = document.createElement('a');
    anchorElm.setAttribute('href', `/movie-details.html?id=${movie.id}`)

    const posterImg = document.createElement('img');
    posterImg.setAttribute(
      'src',
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/images/no-image.jpg'
    );
    posterImg.classList.add('card-img-top');
    posterImg.setAttribute('alt', movie.title);
    anchorElm.appendChild(posterImg);
    div.appendChild(anchorElm)

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

// Display Movie Details
async function dispayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`/movie/${movieId}`);
  const movieDetailsContainer = document.querySelector('#movie-details');

  console.log(movie);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);
  // ! I can use innerHTML here, but I want to practice element creation
  // in javascript
  const divTop = document.createElement('div');
  divTop.classList.add('details-top');
  const divBottom = document.createElement('div');
  divBottom.classList.add('details-bottom');

  // Div Top
  const divImg = document.createElement('div');
  const img = document.createElement('img');
  img.classList.add('card-img-top');
  img.setAttribute(
    'src',
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/images/no-image.jpg'
  );
  img.setAttribute('alt', movie.title);
  divImg.appendChild(img);
  divTop.appendChild(divImg);

  const divDetails = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode(movie.title));

  divDetails.appendChild(h2);

  const pRating = document.createElement('p');
  const starIcon = document.createElement('i');

  starIcon.classList.add('fas');
  starIcon.classList.add('fa-star');
  starIcon.classList.add('text-primary');
  const ratingText = document.createTextNode(
    `${movie.vote_average.toFixed(1)} / 10`
  );
  pRating.appendChild(starIcon);
  pRating.appendChild(ratingText);
  divDetails.appendChild(pRating);

  const pRelease = document.createElement('p');
  pRelease.classList.add('text-muted');
  const releaseText = document.createTextNode(
    `Release Date: ${movie.release_date}`
  );

  pRelease.appendChild(releaseText);
  divDetails.appendChild(pRelease);

  const pSynopsis = document.createElement('p');
  const synopsisText = document.createTextNode(movie.overview);
  pSynopsis.appendChild(synopsisText);
  divDetails.appendChild(pSynopsis);

  const h5 = document.createElement('h5');
  const genreTitle = document.createTextNode('Genres');
  h5.appendChild(genreTitle);
  divDetails.appendChild(h5);

  const ul = document.createElement('ul');
  ul.classList.add('list-group');

  movie.genres.forEach((_, index) => {
    const li = document.createElement('li');
    const liText = document.createTextNode(`${movie.genres[index].name}`);
    li.appendChild(liText);
    ul.appendChild(li);
  });
  divDetails.appendChild(ul);

  const homePageLink = document.createElement('a');
  homePageLink.classList.add('btn');
  homePageLink.setAttribute('href', movie.homepage);
  const homePageText = document.createTextNode('Visit Movie Homepage');
  homePageLink.appendChild(homePageText);
  divDetails.appendChild(homePageLink);

  // Div Bottom
  const h2Bottom = document.createElement('h2');
  const infoText = document.createTextNode('Movie Info');
  h2Bottom.appendChild(infoText);
  divBottom.append(h2Bottom);

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const ulBottom = document.createElement('ul');

  const liBottom1 = document.createElement('li');
  const liBottomHeading1 = document.createElement('span');
  liBottomHeading1.textContent = 'BUDGET: ';
  liBottomHeading1.classList.add('text-secondary');
  liBottom1.appendChild(liBottomHeading1);
  const liBottomText1 = document.createTextNode(
    `${USDollar.format(movie.budget)}`
  );
  liBottom1.appendChild(liBottomText1);
  ulBottom.appendChild(liBottom1);

  const liBottom2 = document.createElement('li');
  const liBottomHeading2 = document.createElement('span');
  liBottomHeading2.textContent = 'REVENUE: ';
  liBottomHeading2.classList.add('text-secondary');
  liBottom2.appendChild(liBottomHeading2);
  const liBottomText2 = document.createTextNode(
    `${USDollar.format(movie.revenue)}`
  );
  liBottom2.appendChild(liBottomText2);
  ulBottom.appendChild(liBottom2);

  const liBottom3 = document.createElement('li');
  const liBottomHeading3 = document.createElement('span');
  liBottomHeading3.textContent = 'RUNTIME: ';
  liBottomHeading3.classList.add('text-secondary');
  liBottom3.appendChild(liBottomHeading3);
  const liBottomText3 = document.createTextNode(
    `${USDollar.format(movie.runtime)}`
  );
  liBottom3.appendChild(liBottomText3);
  ulBottom.appendChild(liBottom3);

  const liBottom4 = document.createElement('li');
  const liBottomHeading4 = document.createElement('span');
  liBottomHeading4.textContent = 'STATUS: ';
  liBottomHeading4.classList.add('text-secondary');
  liBottom4.appendChild(liBottomHeading4);
  const liBottomText4 = document.createTextNode(movie.status);
  liBottom4.appendChild(liBottomText4);
  ulBottom.appendChild(liBottom4);

  divBottom.append(ulBottom);

  const h4 = document.createElement('h4');
  const h4Heading = document.createTextNode('Production Companies');
  h4.appendChild(h4Heading);
  divBottom.append(h4);

  const divCompanies = document.createElement('div');
  divCompanies.classList.add('list-group');

  let companyList = [];
  movie.production_companies.forEach((_, index) => {
    companyList.push(movie.production_companies[index].name);
  });

  divCompanies.textContent = companyList.join(', ');
  divBottom.appendChild(divCompanies);

  divTop.appendChild(divDetails);
  movieDetailsContainer.appendChild(divTop);
  movieDetailsContainer.appendChild(divBottom);
}

// Display Backdrop on Details Pages
function displayBackgroundImage(type, path) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  switch (type) {
    case 'movie':
      document.querySelector('#movie-details').appendChild(overlayDiv);
      break;
    default:
      document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

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
      dispayMovieDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
