import instance from "../customAxios";

const API_KEY = "04c96827c11e080830f0c0b8d3a94fd6";
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
  getTvDetail: async (id: string) => {
    const response = await instance.get(
      `${BASE_PATH}/tv/${id}/?api_key=${API_KEY}`
    );
  },

  //getMovieDetail data
  getMovieDetail: async (id: string) => {
    const response = await instance.get(
      `${BASE_PATH}/movie/${id}/?api_key=${API_KEY}`
    );
    return response;
  },
};

export default MovieService;
