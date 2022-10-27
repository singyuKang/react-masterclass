import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "react";
import { ImageConstants } from "../utils";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;

  flex: 1;
`;

const Logo = styled(motion.svg)`
  margin-left: 30px;
  width: 150px;
  height: 100px;

  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Col = styled.div`
  display: flex;
`;

const LoginWapper = styled.div`
  display: flex;

  min-height: 100vh;

  position: absolute;

  z-index: -2;
`;

const LoginBody = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  /* background-color:; */
  /* align-self: center; */
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-sizing: border-box;
  /* display: flex; */
  width: 450px;
  height: 660px;
  min-height: 660px;
  min-width: 450px;
`;

const LoginBodyWrapper = styled.div`
  margin-top: 50px;
  justify-content: center;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
`;

const LoginContent = styled.div``;

function Login() {
  return (
    <Container>
      <LoginWapper>
        <img src={ImageConstants.LOGIN} alt="Login.logo" />
      </LoginWapper>
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path d={ImageConstants.LOGIN_LOGO} fill="#d81f26" />
        </Logo>
      </Col>
      <LoginBodyWrapper>
        <LoginBody />
      </LoginBodyWrapper>
    </Container>
  );
}
export default Login;
