import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "react";
import { ImageConstants } from "../utils";
import { themegloabalStyle } from "../themegloabalStyle";
import colors from "../colors";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;

  /* flex: 1; */
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

  padding-left: 30px;
  padding-right: 30px;
  padding-top: 40px;
  padding-bottom: 40px;

  /* align-items: center; */
  /* justify-content: center; */
  border-radius: 4px;
  box-sizing: border-box;
  width: 350px;
  height: 560px;
  min-height: 560px;
  min-width: 350px;
  display: flex;
  flex-direction: column;
`;

const LoginInside = styled.div`
  background-color: white;
  flex: 1;
  height: 500px;
`;

const LoginBodyWrapper = styled.div`
  margin-top: 50px;
  justify-content: center;
  /* background-color: brown; */
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
`;

const LoginText = styled.div`
  /* background-color: white; */
  font-size: 25px;
  /* flex: 1; */
  /* height: 50px; */
  /* font-style: normal; */
`;

const LoginContent = styled.div``;

function Login() {
  const dispatch = useDispatch();
  const { value } = useSelector((state: any) => {
    console.log("🚀 ~ file: Login.tsx ~ line 91 ~ Login ~ state", state);
    return state.value;
  });
  const { count } = useSelector((state: any) => state.count);

  const addValue = () => {
    dispatch({ type: "increment" });
  };
  const subValue = () => {
    dispatch({ type: "decrement" });
  };
  const resetValue = () => {
    dispatch({ type: "reset" });
  };
  const pushButton = () => {
    dispatch({ type: "push" });
  };

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
        <LoginBody>
          <LoginText>로그인</LoginText>
          <div>value: {value}</div>
          <button onClick={addValue}> + </button>
          <button onClick={subValue}> - </button>
          <button onClick={resetValue}> reset </button>
          <div>count: {count}</div>
          <button onClick={pushButton}> click </button>
        </LoginBody>
      </LoginBodyWrapper>
    </Container>
  );
}
export default Login;
