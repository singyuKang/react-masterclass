import instance from "../customAxios";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

const MovieService = {
  // 영화정보 get now_playing data
  getNewMovies: async () => {
    const response = await instance.get(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
    );
    return response;
  },

  //upcoming movie data
  getUpComingMovie: async () => {
    const response = await instance.get(
      `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`
    );
    return response;
  },

  //popular movie data
  getPopularMovie: async () => {
    const response = await instance.get(
      `${BASE_PATH}/movie/popular?api_key=${API_KEY}`
    );
    return response;
  },

  //TopRated tv data
  getTopRatedTv: async () => {
    const response = await instance.get(
      `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`
    );
    return response;
  },

  //popular tv data
  getPopularTv: async () => {
    const response = await instance.get(
      `${BASE_PATH}/tv/popular?api_key=${API_KEY}`
    );
    return response;
  },

  //airingToday tv data
  getAiringTodayTv: async () => {
    const response = await instance.get(
      `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`
    );
    return response;
  },

  //getTvDetail data
  getTvDetail: async (id: number) => {
    const response = await instance.get(
      `${BASE_PATH}/tv/${id}?api_key=${API_KEY}`
    );
    return response;
  },

  //getTvDetailCredit
  getTvCredit: async (movie_id: number) => {
    const response = await instance.get(
      `${BASE_PATH}/tv/${movie_id}/credits?api_key=${API_KEY}`
    );
    return response;
  },

  //getTvDetailRecomendation data
  getTvRecomendation: async (movie_id: number) => {
    const response = await instance.get(
      `${BASE_PATH}/tv/${movie_id}/recommendations?api_key=${API_KEY}`
    );
    return response;
  },

  //getMovieDetail data
  getMovieDetail: async (movie_id: number) => {
    const response = await instance.get(
      `${BASE_PATH}/movie/${movie_id}?api_key=${API_KEY}`
    );
    return response;
  },

  //getMovieDetailRecomendation data
  getMovieRecomendation: async (movie_id: number) => {
    const response = await instance.get(
      `${BASE_PATH}/movie/${movie_id}/recommendations?api_key=${API_KEY}`
    );
    return response;
  },

  //getMovieDetailCredit
  getMovieCredit: async (movie_id: number) => {
    const response = await instance.get(
      `${BASE_PATH}/movie/${movie_id}/credits?api_key=${API_KEY}`
    );
    return response;
  },

  //getMovieSearch
  getMovieSearch: async (keyword: any) => {
    const response = await instance.get(
      `${BASE_PATH}/search/movie/?api_key=${API_KEY}`,
      { params: { query: encodeURIComponent(keyword) } }
    );
    return response;
  },

  //getTvSearch
  getTvSearch: async (keyword: any) => {
    const response = await instance.get(
      `${BASE_PATH}/search/tv/?api_key=${API_KEY}`,
      { params: { query: encodeURIComponent(keyword) } }
    );
    return response;
  },
};

export default MovieService;
