/* Page Routing */
const global = {
  currentPage: window.location.pathname,
};

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.main-header .container .nav-link')

    let targetLink;
    links.forEach((linkElm) => {
        if (linkElm.getAttribute('href') === global.currentPage){
            linkElm.classList.add('active')
        }
    })
}

/* Init App */
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home');
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/search.html':
        console.log('Search');
        break
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
