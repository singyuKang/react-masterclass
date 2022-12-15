import { useEffect, useState } from "react";
import {
  PathMatch,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import MovieService from "../api/services/MovieService";
import Header from "../Components/Header";
import {
  hideLoading,
  showLoading,
  useLoadingDispatch,
} from "../contexts/LoadingContext";
import { ImageConstants, makeImagePath } from "../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CreditList from "../Components/CreditList";
import { AnimatePresence, motion } from "framer-motion";
import ReactCountryFlag from "react-country-flag";

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
  display: flex;
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
  flex-direction: column;
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

const BoxContainer = styled(motion.div)`
  position: absolute;
  background-color: black;
  opacity: 0.5;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Box = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  z-index: 10000;
  top: 50;
  left: 50;
  width: 90%;
  height: 60%;
  background-color: #110f0f;
  overflow-y: auto;
  overflow-x: hidden;
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
  background-color: #2b2827;
`;

const Item = styled.span`
  line-height: 1.3;
  font-weight: 500;
  display: flex;
  /* background-color: #3a6363f8; */
`;

const ItemOverview = styled.span`
  margin-top: 50px;
  line-height: 1.7;
  font-weight: 400;
`;
const Divider = styled.span`
  margin: 0px 10px;
`;

const Text = styled.div`
  padding-left: 12px;
  color: #e7eded;
  font-size: 18px;
  font-weight: 600;
  line-height: 6px;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  /* position: relative; */
  z-index: 0;
`;

const Dot = styled.div`
  display: flex;
  height: 10px;
  width: 10px;
  border-radius: 7px;
  background: #c9c197;
  opacity: 0.8;
  z-index: 10;
`;

const ContentTitle = styled.div`
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 6px;
  margin-bottom: 20px;
  /* position: relative; */
  display: flex;
  /* flex: 1; */

  z-index: 0;
`;

const Key = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-right: 15px;
  margin-bottom: 40px;
  flex-direction: column;
`;

const MovieDetail = () => {
  const moviePathMatch = useMatch("/movie/:id");
  const movieLocation = useLocation();
  const loadingDispatch = useLoadingDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultData | any>();
  console.log("🚀 ~ file: MovieDetail.tsx:183 ~ MovieDetail ~ result", result);
  const [boxshow, setBoxshow] = useState(false);

  const [recomendation, setRecomendation] = useState();
  const [credit, setCredit] = useState<any>();
  // console.log("🚀 ~ file: MovieDetail.tsx:172 ~ MovieDetail ~ credit", credit);

  const castsettings = {
    // dots: true,
    centerMode: true,
    infinite: true,
    speed: 2000,
    slidesToShow: credit?.cast?.length < 8 ? credit?.cast?.length : 8,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 2000,
    // cssEase: "linear",
    // slidesToScroll: 20,
    // slidesPerRow: 2,
  };

  const crewsettings = {
    // dots: true,
    centerMode: true,
    infinite: true,
    speed: 2000,
    slidesToShow: credit?.crew?.length < 8 ? credit?.crew?.length : 8,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 2000,
    // cssEase: "linear",
    // slidesToScroll: 20,
    // slidesPerRow: 2,
  };
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
      if (movieLocation?.state?.isMovie === true) {
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
      } else {
        showLoading(loadingDispatch);
        const response = await MovieService.getTvDetail(
          parseInt(moviePathMatch?.params?.id as string)
        );
        console.log(
          "🚀 ~ file: MovieDetail.tsx ~ line 222 ~ const_fetData= ~ response",
          response
        );
        // console.log("pass");
        setResult(response.data);

        const recomendationData = await MovieService.getTvRecomendation(
          parseInt(moviePathMatch?.params?.id as string)
        );
        setRecomendation(recomendationData.data);

        const creditData = await MovieService.getTvCredit(
          parseInt(moviePathMatch?.params?.id as string)
        );
        setCredit(creditData.data);
      }
    } catch (error) {
      console.log("error:", error);
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
            <AnimatePresence>
              <BoxContainer key={"boxcontainer"} />
              <Box
                key={"box"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  style={{
                    display: "flex",
                    // backgroundColor: "black",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* <div
                    onClick={() => {
                      setBoxshow(false);
                    }}
                  >
                    x {"    "}
                  </div> */}

                  <img
                    alt="profile"
                    style={{ marginRight: "10px", marginTop: "10px" }}
                    onClick={() => {
                      setBoxshow(false);
                    }}
                    src={ImageConstants.ICON_CLOSE_WH}
                  ></img>
                </div>
                <Text>Cast</Text>
                <Slider {...castsettings}>
                  {credit?.cast?.map((cast: any, id: number) => {
                    return (
                      <CreditList
                        // id={id}
                        key={id}
                        known_for_department={cast.known_for_department}
                        imageUrl={cast.profile_path}
                        name={cast.name}
                      />
                    );
                  })}
                </Slider>
                <Text>Crew</Text>
                <Slider {...crewsettings}>
                  {credit?.crew?.map((cast: any, id: number) => {
                    return (
                      <CreditList
                        key={id}
                        known_for_department={cast.known_for_department}
                        imageUrl={cast.profile_path}
                        name={cast.name}
                      />
                    );
                  })}
                </Slider>
              </Box>
            </AnimatePresence>
          </>
        ) : null}
        <BackDrop bgImage={makeImagePath(result?.backdrop_path)} />
        <LeftImage bgImage={makeImagePath(result?.poster_path)} />
        <ContentBox>
          {movieLocation?.state?.isMovie ? (
            <Title>{result?.original_title}</Title>
          ) : (
            <Title>{result?.original_name}</Title>
          )}
          <ItemContainer>
            <div style={{ display: "flex" }}>
              <Item>
                {result?.release_date
                  ? result?.release_date?.substring(0, 4)
                  : result?.first_air_date?.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result && result?.runtime
                  ? result?.runtime
                  : result?.episode_run_time[0]}{" "}
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
            </div>

            <ItemOverview>
              {" "}
              <Dot />
              <ContentTitle>Overview</ContentTitle>
              {result?.overview}
            </ItemOverview>

            <ItemOverview>
              <Dot />
              <ContentTitle>Production</ContentTitle>
            </ItemOverview>
            {/* key  */}
            <Item>
              <Key>Companies:</Key>
              {result?.production_companies &&
              result?.production_companies.length > 0
                ? result?.production_companies
                    .filter((company: any, index: number) => index < 5)
                    .map((company: any, index: number) =>
                      index === result?.production_companies.length - 1 ||
                      index === 4 ? (
                        <span key={company.id}>{company.name}</span>
                      ) : (
                        <>
                          <span key={index}>{company.name}</span>
                          <Divider key={company.logo_path}>/</Divider>
                        </>
                      )
                    )
                : "None"}
            </Item>
            <Item>
              <Key>Countries:</Key>
              {movieLocation?.state?.isMovie
                ? result?.production_countries &&
                  result?.production_countries.length > 0
                  ? result?.production_countries
                      .filter((country: any, index: number) => index < 5)
                      .map((country: { iso_3166_1: any }, index: number) =>
                        index === result?.production_countries.length - 1 ||
                        index === 4 ? (
                          <>
                            {`${country.iso_3166_1}  `}
                            <ReactCountryFlag
                              countryCode={`${country.iso_3166_1}`}
                              svg
                            />
                          </>
                        ) : (
                          <>
                            {`${country.iso_3166_1}  `}
                            <ReactCountryFlag
                              countryCode={`${country.iso_3166_1}`}
                              svg
                            />
                            <Divider>/</Divider>
                          </>
                        )
                      )
                  : "None"
                : result?.origin_country &&
                  result?.origin_country.length > 0 &&
                  result?.origin_country
                    .filter((country: any, index: number) => index < 5)
                    .map((country: any, index: number) =>
                      index === result.origin_country.length - 1 ||
                      index === 4 ? (
                        <>
                          {`${country}  `}
                          <ReactCountryFlag countryCode={`${country}`} svg />
                        </>
                      ) : (
                        <>
                          {`${country}  `}
                          <ReactCountryFlag countryCode={`${country}`} svg />
                          <Divider>/</Divider>
                        </>
                      )
                    )}
            </Item>
          </ItemContainer>
          <SelectContainer>
            <SelectBox>
              {/* <Select
                onMouseOver={() => {
                  // setBoxshow(true);
                }}
              >
                Trailer
              </Select> */}
              <Select
                onMouseOver={() => {
                  setBoxshow(true);
                }}
              >
                Film
              </Select>
            </SelectBox>
          </SelectContainer>
        </ContentBox>
      </Container>
    </>
  );
};

export default MovieDetail;
