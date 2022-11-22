const TRENDING_MOVIE_DAY = 'https://api.themoviedb.org/3/trending/movie/day';
const IMAGE = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
    const request = await fetch(`${TRENDING_MOVIE_DAY}?api_key=${API_KEY}`);
    const data = await request.json();
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

getTrendingMoviesPreview()