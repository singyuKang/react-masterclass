import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MovieService from "../api/services/MovieService";
import Header from "../Components/Header";
import Section from "../Components/Section";
import SectionList from "../Components/SectionList";
import {
  hideLoading,
  showLoading,
  useLoadingDispatch,
} from "../contexts/LoadingContext";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  /* display: flex; */
  /* paddin
  g: 20px; */
`;
const Wrapper = styled.div`
  background-color: black;
`;

function Search() {
  const location = useLocation();
  const loadingDispatch = useLoadingDispatch();

  const keyword = new URLSearchParams(location.search).get("keyword") as any;
  // console.log("🚀 ~ file: Search.tsx:15 ~ Search ~ keyword", keyword);
  // console.log(location);

  const [moviesearchData, setMovieSearchData] = useState<any>();
  const [tvsearchData, setTvSearchData] = useState<any>();

  useEffect(() => {
    _fetData();
  }, []);

  const _fetData = async () => {
    try {
      showLoading(loadingDispatch);
      const moviesearch = await MovieService.getMovieSearch(
        encodeURIComponent(keyword)
      );
      console.log(
        "🚀 ~ file: Search.tsx:33 ~ const_fetData= ~ moviesearch",
        moviesearch
      );
      setMovieSearchData(moviesearch.data);
      // setNowPlaying(response.data);

      const tvsearch = await MovieService.getTvSearch(
        encodeURIComponent(keyword)
      );
      console.log(
        "🚀 ~ file: Search.tsx:49 ~ const_fetData= ~ tvsearch",
        tvsearch
      );
      setTvSearchData(tvsearch.data);
      // setUpcoming(upComingRes.data);

      // setPopular(popularRes.data);

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
    <Wrapper>
      <Container>
        <Header />
        {moviesearchData?.results.length > 1 ||
        tvsearchData?.results.length > 1 ? (
          <>
            <div style={{ backgroundColor: "black" }}>
              <Section title="Movie">
                {moviesearchData?.results?.map((movie: any) => {
                  return (
                    <SectionList
                      isMovie={true}
                      rating={movie.popularity}
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      imageUrl={movie.backdrop_path}
                      year={
                        movie.first_air_date &&
                        movie.first_air_date.substring(0, 4)
                      }
                    />
                  );
                })}
              </Section>
              <Section title="Tv">
                {tvsearchData?.results?.map((movie: any) => {
                  return (
                    <SectionList
                      isMovie={true}
                      rating={movie.popularity}
                      key={movie.id}
                      id={movie.id}
                      title={movie.name}
                      imageUrl={movie.backdrop_path}
                      year={
                        movie.first_air_date &&
                        movie.first_air_date.substring(0, 4)
                      }
                    />
                  );
                })}
              </Section>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flex: 1,
              backgroundColor: "black",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 40 }}>Nothing Found</span>
          </div>
        )}
      </Container>
    </Wrapper>
  );
  //api 요청 fetch 해서 결과 알려주도록
}
export default Search;
