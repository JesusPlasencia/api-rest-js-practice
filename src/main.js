const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

const IMAGE = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    trendingMoviesPreviewList.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const imageContainer = document.createElement('img');
        imageContainer.classList.add('movie-img');
        imageContainer.setAttribute('alt', movie?.title);
        imageContainer.setAttribute('src', `${IMAGE + movie?.poster_path}`);

        movieContainer.appendChild(imageContainer);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    //
    categoriesPreviewList.innerHTML = "";
    //
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
        categoriesPreviewList.appendChild(categoryContainer);
    });
}

async function getMoviesByCategory(id, genre) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres : id
        },
    });
    const movies = data.results;
    genericSection.innerHTML = "";
    headerCategoryTitle.innerText = genre;
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const imageContainer = document.createElement('img');
        imageContainer.classList.add('movie-img');
        imageContainer.setAttribute('alt', movie?.title);
        imageContainer.setAttribute('src', `${IMAGE + movie?.poster_path}`);

        movieContainer.appendChild(imageContainer);
        genericSection.appendChild(movieContainer);
    });
}