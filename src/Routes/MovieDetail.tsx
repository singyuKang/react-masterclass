import { useEffect, useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import MovieService from "../api/services/MovieService";
import {
  hideLoading,
  showLoading,
  useLoadingDispatch,
} from "../contexts/LoadingContext";

const MovieDetail = () => {
  const moviePathMatch = useMatch("/movie/:id");
  const loadingDispatch = useLoadingDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState();
  console.log(
    "🚀 ~ file: MovieDetail.tsx ~ line 15 ~ MovieDetail ~ result",
    result
  );

  console.log(
    "🚀 ~ file: MovieDetail.tsx ~ line 20 ~ MovieDetail ~ moviePathMatch",
    parseInt(moviePathMatch?.params?.id as any)
  );
  //   console.log(
  //     "🚀 ~ file: MovieDetail.tsx ~ line 6 ~ MovieDetail ~ moviePathMatch",
  //     moviePathMatch
  //   );
  //   console.log(
  //     "🚀 ~ file: MovieDetail.tsx ~ line 6 ~ MovieDetail ~ moviePathMatch",
  //     moviePathMatch?.params.id
  //   );

  useEffect(() => {
    // console.log("movie detail");
    _fetData();
  }, []);

  const _fetData = async () => {
    try {
      showLoading(loadingDispatch);
      const response = await MovieService.getMovieDetail(
        parseInt(moviePathMatch?.params?.id as any)
      );

      //    MovieService.getPopularMovie();
      //   setNowPlaying(response.data);
      setResult(response.data);

      //   const upComingRes = await MovieService.getUpComingMovie();
      //   setUpcoming(upComingRes.data);

      //   const popularRes = await MovieService.getPopularMovie();
      //   setPopular(popularRes.data);

      // console.log(data);
      // await axios
      //   .get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
      //   .then((res) => {
      //     setData(res.data);
      //   });
    } catch (error) {
      console.log("error:", error);
    } finally {
      hideLoading(loadingDispatch);
    }
  };

  return (
    <>
      <span>movie Detail</span>
    </>
  );
};

export default MovieDetail;
