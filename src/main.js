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
    //
    const trendingPreviewListContainer = document.querySelector('.trendingPreview-movieList');
    //
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const imageContainer = document.createElement('img');
        imageContainer.classList.add('movie-img');
        imageContainer.setAttribute('alt', movie?.title);
        console.log(IMAGE + movie?.poster_path);
        imageContainer.setAttribute('src', `${IMAGE + movie?.poster_path}`);

        movieContainer.appendChild(imageContainer);
        trendingPreviewListContainer.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    //
    const categoriesPreviewListContainer = document.querySelector('.categoriesPreview-list');
    //
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category?.id}`)
        categoryTitle.innerText = category?.name;

        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewListContainer.appendChild(categoryContainer);
    });
}

getTrendingMoviesPreview()
getCategoriesPreview()