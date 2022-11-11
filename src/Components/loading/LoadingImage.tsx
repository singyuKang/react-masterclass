import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";

const Container = styled.div`
  /* display: flex; */
  /* flex: 1; */
  /* background-color: white; */
  /* width: 100%;
  height: 100%; */
  /* width: 150px;
  height: 150px; */
  /* width: 50px;
  height: 50px; */
  /* transform: translate(-50%, -50%); */
`;

const NoMore = styled.div`
  /* background-color: black; */
  /* transform: translate(-50%, -50%); */
  /* display: flex;
  flex: 1; */

  /* left: 50%;
  top: 50%; */
  /* transform: translate(-50%, -50%); */
  /* align-self: center; */
  /* justify-content: center;
  align-items: center; */
  /* margin: 0 auto; */
  /* position: absolute; */
  /* margin: 0 auto; */
  /* padding: 100px; */
  /* z-index: 1000; */
`;

const LoadingImage = () => {
  const container = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current as any,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/animations/loading2.json"),
    });
  }, []);

  return (
    <Container>
      <NoMore ref={container as any} />
    </Container>
  );
};

export default LoadingImage;
