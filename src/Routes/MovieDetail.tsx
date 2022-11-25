import { useEffect, useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MovieService from "../api/services/MovieService";
import Header from "../Components/Header";
import {
  hideLoading,
  showLoading,
  useLoadingDispatch,
} from "../contexts/LoadingContext";
import { makeImagePath } from "../utils";

const BackDrop = styled.div<{ bgImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  /* background-color: black; */
  filter: blur(3px);
  opacity: 0.5;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 100px 50px 50px 50px;
`;

const MovieDetail = () => {
  const moviePathMatch = useMatch("/movie/:id");
  const loadingDispatch = useLoadingDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState<any>();

  const API_KEY = "04c96827c11e080830f0c0b8d3a94fd6";
  const BASE_PATH = "https://api.themoviedb.org/3";
  console.log(
    "🚀 ~ file: MovieDetail.tsx ~ line 15 ~ MovieDetail ~ result",
    result?.backdrop_path
  );

  console.log(
    "🚀 ~ file: MovieDetail.tsx ~ line 20 ~ MovieDetail ~ moviePathMatch",
    parseInt(moviePathMatch?.params?.id as any)
  );
  console.log(
    "🚀 ~ file: MovieDetail.tsx ~ line 6 ~ MovieDetail ~ moviePathMatch",
    moviePathMatch
  );
  console.log(
    "🚀 ~ file: MovieDetail.tsx ~ line 6 ~ MovieDetail ~ moviePathMatch",
    moviePathMatch?.params.id
  );

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

      setResult(response.data);
    } catch (error) {
      console.log("error:", error);
      const response = fetch(
        `${BASE_PATH}/movie/${parseInt(
          moviePathMatch?.params?.id as any
        )}?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResult(data);
        });
      // setResult(response.data);
    } finally {
      hideLoading(loadingDispatch);
    }
  };

  return (
    <>
      <Header />

      <Container>
        <BackDrop bgImage={makeImagePath(result?.backdrop_path)} />
      </Container>
    </>
  );
};

export default MovieDetail;
