import { motion } from "framer-motion";
import styled from "styled-components";
import Image, { useState } from "react";
import { ImageConstants } from "../utils";
import { themegloabalStyle } from "../themegloabalStyle";
import colors from "../colors";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin, loginEmail, signupEmail } from "../fBase";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  hideLoading,
  showLoading,
  useLoadingDispatch,
} from "../contexts/LoadingContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
  font-weight: normal;
  /* flex: 1; */
  /* height: 50px; */
  /* font-style: normal; */
  margin-bottom: 30px;
`;

const LoginContent = styled.div``;

function Login() {
  // const dispatch = useDispatch();
  // const { value } = useSelector((state: any) => {
  //   console.log("🚀 ~ file: Login.tsx ~ line 91 ~ Login ~ state", state);
  //   return state.value;
  // });
  // const { count } = useSelector((state: any) => state.count);

  // const addValue = () => {
  //   dispatch({ type: "increment" });
  // };
  // const subValue = () => {
  //   dispatch({ type: "decrement" });
  // };
  // const resetValue = () => {
  //   dispatch({ type: "reset" });
  // };
  // const pushButton = () => {
  //   dispatch({ type: "push" });
  // };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loadingDispatch = useLoadingDispatch();

  useEffect(() => {
    showLoading(loadingDispatch);

    hideLoading(loadingDispatch);
  }, []);

  const onChange = (event: any) => {
    // console.log(event.target.value);
    // console.log(event);
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // console.log("hello");
    try {
      let data;

      //Log in
      showLoading(loadingDispatch);
      // checkLogin();
      data = await loginEmail(email, password);
      // checkLogin();
      hideLoading(loadingDispatch);
      console.log("data : : : :: ", data);
      console.log(
        "🚀 ~ file: Login.tsx ~ line 157 ~ onSubmit ~ data",
        data.user.uid
      );
      localStorage.setItem("uid", data.user.uid);

      navigate("/home");
    } catch (error: any) {
      console.log("🚀 ~ file: Login.tsx ~ line 158 ~ onSubmit ~ error", error);
      // console.log(error, error.code);
      if (error.code == "auth/invalid-email") {
        Swal.fire({
          icon: "warning",
          // title: "hello",
          text: "아이디 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.",
          // timer: 2000,
        });
      }
      if (error.code == "auth/user-not-found") {
        Swal.fire({
          icon: "warning",
          // title: "hello",
          text: "회원가입되지 않은 아이디입니다. 회원가입후 이용해 주세요",
          // timer: 2000,
        });
      }
      if (error.code == "auth/wrong-password") {
        Swal.fire({
          icon: "warning",
          // title: "hello",
          text: "아이디 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.",
          // timer: 2000,
        });
      }

      if (error.code == "auth/too-many-requests") {
        Swal.fire({
          icon: "warning",
          // title: "hello",
          text: "잠시만 기다려주세요.",
          // timer: 2000,
        });
      }

      if (error == "auth/emailVerified") {
        Swal.fire({
          icon: "warning",
          // title: "hello",
          text: "회원가입하신 이메일 인증을 진행해주세요.",
          // timer: 2000,
        });
      }

      // setError(error.message);
    } finally {
      hideLoading(loadingDispatch);
    }
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
          <form
            onSubmit={onSubmit}
            style={{
              backgroundColor: "",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                height: 50,
                borderRadius: 10,
                backgroundColor: "tomato",
                // padding: 5,
                marginBottom: 20,
              }}
            >
              <input
                style={{
                  display: "flex",
                  flex: 1,
                  borderRadius: 10,
                  height: 50,

                  // height: 100,
                  // backgroundColor: "tomato",
                }}
                name="email"
                value={email}
                type="email"
                placeholder="이메일 주소"
                onChange={onChange}
                required
              />
            </div>
            <input
              style={{
                // placeholder {
                //   color: red;
                //   font-style: italic;
                // },
                display: "flex",
                // flex: 1,
                height: 50,
                borderRadius: 10,
                marginBottom: 50,
                // backgroundColor: "tomato",
              }}
              name="password"
              value={password}
              type="password"
              placeholder="비밀번호"
              onChange={onChange}
              required
            />
            <input style={styles.base} type="submit" value={"로 그 인"} />
          </form>
          <div>
            <span style={{ opacity: 0.5 }}>회원이 아니신가요? </span>
            <Link to="/signup">
              <span
                style={{ opacity: 1, textDecoration: "underline" }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                지금 가입하세요.
              </span>
            </Link>
          </div>

          {/* <div>value: {value}</div>
          <button onClick={addValue}> + </button>
          <button onClick={subValue}> - </button>
          <button onClick={resetValue}> reset </button>
          <div>count: {count}</div>
          <button onClick={pushButton}> click </button> */}
        </LoginBody>
      </LoginBodyWrapper>
    </Container>
  );
}
export default Login;

var styles = {
  base: {
    backgroundColor: "red",
    color: "white",
    height: 50,
    borderRadius: 10,
    marginBottom: 50,
    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    "::hover": {
      background: "tomato",
    },
    "::inputPlaceholder": {
      color: "blue",
    },
  },

  primary: {
    background: "#0074D9",
  },

  warning: {
    background: "#FF4136",
  },
};
