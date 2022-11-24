const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

//! UTILS
function createMovies(movies, container) {
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = "#movie=" + movie?.id;
        });

        const imageContainer = document.createElement('img');
        imageContainer.classList.add('movie-img');
        imageContainer.setAttribute('alt', movie?.title);
        imageContainer.setAttribute('src', `${IMAGE + movie?.poster_path}`);

        movieContainer.appendChild(imageContainer);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container) {
    container.innerHTML = "";
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        categoryContainer.addEventListener('click', () => {
            location.hash = `#category=${category?.id}-${category?.name}`
            // getMoviesByCategory(category?.id);
        });

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category?.id}`)
        categoryTitle.innerText = category?.name;

        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

//! IMAGE
const IMAGE = 'https://image.tmdb.org/t/p/w300';
const IMAGE_LARGE = 'https://image.tmdb.org/t/p/w500';

//! APIS
async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id, genre) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres : id
        },
    });
    const movies = data.results;
    headerCategoryTitle.innerText = genre;
    genericSection.innerHTML = "";
    createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query
        }
    });
    let movies = data.results.filter(movie => movie.poster_path);
    createMovies(movies, genericSection);
}

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies, genericSection);
}

async function getMovieById(movieId) {
    const { data: movie } = await api(`movie/${movieId}`);
    const movieImgUrl = IMAGE_LARGE + movie.poster_path;
    headerSection.style.background = `
        linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    createCategories(movie.genres, movieDetailCategoriesList);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results.filter(item => item.poster_path);
    createMovies(relatedMovies, relatedMoviesContainer);
}