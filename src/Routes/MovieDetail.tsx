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

interface Genres {
  id: number;
  name: string;
}

interface ResultData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genres[];
  poster_path: string;
  original_title: string;
}

const BackDrop = styled.div<{ bgImage: string }>`
  position: absolute;
  z-index: -100;
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

const LeftImage = styled.div<{ bgImage: string }>`
  width: 50%;
  height: 100%;
  border-radius: 5px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  /* display: flex; */
  /* z-index: 100; */
`;

const Container = styled.div`
  /* position: relative; */
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 100px 50px 50px 50px;
`;

const ContentBox = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  opacity: 0.7;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;

  width: 90%;
  height: 100%;
  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: 1.7rem;
  margin-bottom: 10px;
  font-weight: bold;
  color: white;
  /* opacity: 0.9; */
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* background-color: #6d4c4c; */
`;

const SelectContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  flex-wrap: wrap;
  /* background-color: #802929; */
`;

const SelectBox = styled.div`
  display: flex;
`;

const BoxContainer = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0.5;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  position: absolute;
  border-radius: 5px;
  z-index: 10000;
  top: 50;
  left: 50;
  width: 90%;
  height: 60%;
  background-color: white;
`;

const Select = styled.div`
  display: flex;
  margin-right: 50px;
  justify-content: center;
  align-items: center;
  width: 100px;
  font-weight: 500;
  border-radius: 5px;
  height: 50px;
  background-color: #371608;
`;

const Item = styled.span`
  line-height: 1.3;
  font-weight: 500;
`;

const ItemOverview = styled.span`
  margin-top: 50px;
  line-height: 1.7;
  font-weight: 400;
`;
const Divider = styled.span`
  margin: 0px 10px;
`;

const MovieDetail = () => {
  const moviePathMatch = useMatch("/movie/:id");
  const loadingDispatch = useLoadingDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultData | any>();
  const [boxshow, setBoxshow] = useState(false);

  const [recomendation, setRecomendation] = useState();
  const [credit, setCredit] = useState();

  const API_KEY = "04c96827c11e080830f0c0b8d3a94fd6";
  const BASE_PATH = "https://api.themoviedb.org/3";
  // console.log(
  //   "🚀 ~ file: MovieDetail.tsx ~ line 15 ~ MovieDetail ~ result",
  //   result
  // );

  // console.log(
  //   "🚀 ~ file: MovieDetail.tsx ~ line 20 ~ MovieDetail ~ moviePathMatch",
  //   parseInt(moviePathMatch?.params?.id as any)
  // );
  // console.log(
  //   "🚀 ~ file: MovieDetail.tsx ~ line 6 ~ MovieDetail ~ moviePathMatch",
  //   moviePathMatch
  // );
  // console.log(
  //   "🚀 ~ file: MovieDetail.tsx ~ line 6 ~ MovieDetail ~ moviePathMatch",
  //   moviePathMatch?.params.id
  // );

  useEffect(() => {
    // console.log("movie detail");
    _fetData();
  }, []);

  const _fetData = async () => {
    try {
      showLoading(loadingDispatch);
      const response = await MovieService.getMovieDetail(
        parseInt(moviePathMatch?.params?.id as string)
      );
      // console.log("pass");
      setResult(response.data);

      const recomendationData = await MovieService.getMovieRecomendation(
        parseInt(moviePathMatch?.params?.id as string)
      );
      setRecomendation(recomendationData.data);

      const creditData = await MovieService.getMovieCredit(
        parseInt(moviePathMatch?.params?.id as string)
      );
      setCredit(creditData.data);
    } catch (error) {
      console.log("error:", error);
      const response = fetch(
        `${BASE_PATH}/movie/${parseInt(
          moviePathMatch?.params?.id as string
        )}?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setResult(data);
        });

      fetch(
        `${BASE_PATH}/movie/${parseInt(
          moviePathMatch?.params?.id as string
        )}/recommendations?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setRecomendation(data);
          // setResult(data);
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
        {boxshow ? (
          <>
            <BoxContainer />
            <Box></Box>
          </>
        ) : null}
        <BackDrop bgImage={makeImagePath(result?.backdrop_path)} />
        <LeftImage bgImage={makeImagePath(result?.poster_path)} />
        <ContentBox>
          <Title>{result?.original_title}</Title>
          <ItemContainer>
            <Item>
              {result?.release_date
                ? result?.release_date.substring(0, 4)
                : result?.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result?.runtime ? result?.runtime : result?.episode_run_time[0]}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result?.genres &&
                result?.genres?.map((genre: Genres, index: number) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <ItemOverview>{result?.overview}</ItemOverview>
          </ItemContainer>
          <SelectContainer>
            <SelectBox>
              <Select
                onMouseOver={() => {
                  setBoxshow(true);
                }}
              >
                Trailer
              </Select>
              <Select>Film</Select>
            </SelectBox>
          </SelectContainer>
        </ContentBox>
      </Container>
    </>
  );
};

export default MovieDetail;
