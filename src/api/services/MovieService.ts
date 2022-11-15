import instance from "../customAxios";

const API_KEY = "04c96827c11e080830f0c0b8d3a94fd6";
const BASE_PATH = "https://api.themoviedb.org/3";

const MovieService = {
  // 영화정보 get
  getNewMovies: async () => {
    const response = await instance.get(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
    );
    return response;
  },
};

export default MovieService;
