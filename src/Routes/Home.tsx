import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useViewportScroll } from "framer-motion";
import { useForm } from "react-hook-form";
import Header from "../Components/Header";
import {
  hideLoading,
  showLoading,
  useLoadingDispatch,
} from "../contexts/LoadingContext";
import MovieService from "../api/services/MovieService";
import axios from "axios";
import Section from "../Components/Section";
import SectionList from "../Components/SectionList";

interface MovieFetchData {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieFetchDataResult[];
  total_pages: number;
  total_results: number;
}

interface MovieFetchDataResult {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

const Container = styled.div`
  /* width: 100%; */
  height: 100%;
  background-color: black;
  /* padding: 20px; */
`;

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  position: absolute;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 65px;
  background-size: cover;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    color: wheat;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const BigCover = styled.div`
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  text-align: center;
  font-size: 15px;
  position: relative;
  padding: 20pxx;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  top: -80px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    y: -50,
    scale: 1.3,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");
  const loadingDispatch = useLoadingDispatch();
  const [nowPlaying, setNowPlaying] = useState<any>();
  const [upcoming, setUpcoming] = useState<any>();
  const [popular, setPopular] = useState<any>([]);

  // console.log(moviePathMatch);
  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "nowPlay"],
  //   getMovies
  // );
  // console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    navigate(`/`);
  };

  const increaseIndex = () => {
    if (nowPlaying) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlaying.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const clickedMovie =
    moviePathMatch?.params.id &&
    nowPlaying?.results.find(
      (movie: any) => movie.id + "" === moviePathMatch.params.id
    );
  /* console.log(clickedMovie) */

  // console.log(nowPlaying);

  useEffect(() => {
    _fetData();
  }, []);

  const _fetData = async () => {
    try {
      showLoading(loadingDispatch);
      const response = await MovieService.getNewMovies();
      setNowPlaying(response.data);

      const upComingRes = await MovieService.getUpComingMovie();
      setUpcoming(upComingRes.data);

      const popularRes = await MovieService.getPopularMovie();
      setPopular(popularRes.data);

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
  // console.log("data : ", data);

  return (
    <Wrapper>
      {0 ? (
        <></>
      ) : (
        <>
          <Container>
            <Header />

            {/* <Banner
              onClick={increaseIndex}
              bgPhoto={makeImagePath(
                nowPlaying?.results[0].backdrop_path || ""
              )}
            >
              <Title>{nowPlaying?.results[0].title}</Title>
              <Overview>{nowPlaying?.results[0].overview}</Overview>
            </Banner> */}
            <Section title="Now Playing ">
              {nowPlaying?.results?.map((movie: any) => {
                return (
                  <SectionList
                    key={movie.id}
                    id={movie.id}
                    title={movie.original_title}
                    imageUrl={movie.poster_path}
                    rating={movie.vote_average}
                    isMovie={true}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                  />
                );
              })}
            </Section>
            <Section title="UpComing ">
              {upcoming?.results?.map((movie: any) => {
                return (
                  <SectionList
                    key={movie.id}
                    id={movie.id}
                    title={movie.original_title}
                    imageUrl={movie.poster_path}
                    rating={movie.vote_average}
                    isMovie={true}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                  />
                );
              })}
            </Section>
            <Section title="Popular ">
              {popular?.results?.map((movie: any) => {
                return (
                  <SectionList
                    key={movie.id}
                    id={movie.id}
                    title={movie.original_title}
                    imageUrl={movie.poster_path}
                    rating={movie.vote_average}
                    isMovie={true}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                  />
                );
              })}
            </Section>
          </Container>

          {/* <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                transition={{ type: "tween", duration: 1 }}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      transition={{ type: "tween" }}
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      whileHover="hover"
                      initial="normal"
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      key={movie.id}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <AnimatePresence>
              {moviePathMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <BigMovie
                    style={{
                      top: scrollY.get() - 450,
                    }}
                    layoutId={moviePathMatch.params.id + ""}
                  >
                    {clickedMovie && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `url(${makeImagePath(
                              clickedMovie.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        ></BigCover>
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.title}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          </Slider> */}
        </>
      )}
    </Wrapper>
  );
}
export default Home;
