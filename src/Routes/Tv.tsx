// import Header from "../Components/Header";
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
  width: 100%;
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

function Tv() {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const [navHeaderShow, setnavHeaderShow] = useState(true);
  const loadingDispatch = useLoadingDispatch();

  const [topRated, setTopRated] = useState<any>();
  const [popular, setPopular] = useState<any>([]);
  const [airing, setAiring] = useState<any>();

  console.log(topRated);
  console.log(popular);
  console.log(airing);

  useEffect(() => {
    // console.log(
    //   "🚀 ~ file: Header.tsx ~ line 124 ~ scrollY.onChange ~ scrollY",
    //   scrollY.get()
    // );
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        setnavHeaderShow(false);
      } else {
        setnavHeaderShow(true);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    _fetData();
  }, []);
  const _fetData = async () => {
    try {
      showLoading(loadingDispatch);
      const getTopRated = await MovieService.getTopRatedTv();
      setTopRated(getTopRated.data);
      console.log(topRated);
      // setNowPlaying(response.data);

      const getAiringTv = await MovieService.getAiringTodayTv();
      // setUpcoming(upComingRes.data);
      setAiring(getAiringTv.data);

      const popularRes = await MovieService.getPopularTv();
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

  return (
    <>
      <Container>{navHeaderShow ? <Header /> : <></>}</Container>
      <Header />
      <h1>Tv</h1>
    </>
  );
}
export default Tv;
