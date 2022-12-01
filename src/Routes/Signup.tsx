import { motion } from "framer-motion";
import styled from "styled-components";
import Image, { useEffect, useState } from "react";
import { ImageConstants } from "../utils";
import { themegloabalStyle } from "../themegloabalStyle";
import colors from "../colors";
import { useSelector, useDispatch } from "react-redux";
import { loginEmail, sendEmail, signupEmail } from "../fBase";
import { useNavigate } from "react-router-dom";
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

  background-color: #e1caca;

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
  background-color: black;
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
  margin-bottom: 30px;

  /* flex: 1; */
  /* height: 50px; */
  /* font-style: normal; */
`;

const LoginContent = styled.div``;

function SignUp() {
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
  const [checkpassword, setCheckPassword] = useState("");

  const [validateword, setValidateWord] = useState("");
  const [validatepassword, setValidatePassword] = useState(false);

  const loadingDispatch = useLoadingDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    _validatePassword();
  }, [checkpassword, password]);

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
    } else if (name === "validatepassword") {
      setCheckPassword(value);
    }
  };

  const _validatePassword = () => {
    if (password === checkpassword) {
      setValidatePassword(true);
      setValidateWord("비밀번호가 일치합니다");
    } else if (password !== checkpassword) {
      setValidatePassword(false);
      setValidateWord("비밀번호가 일치하지않습니다");
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      showLoading(loadingDispatch);
      if (validatepassword === true) {
        let data = await signupEmail(email, password);
        console.log("🚀 ~ file: Signup.tsx ~ line 132 ~ onSubmit ~ data", data);
        Swal.fire({
          // icon: "warning",
          // title: "hello",
          text: "회원가입 완료되었습니다 이메일 인증을 진행해주세요",
          // timer: 2000,
        });

        navigate("/");
      } else {
        Swal.fire({
          // icon: "warning",
          // title: "hello",
          text: "비밀번호를 다시한번 확인해주세요",
          // timer: 2000,
        });
      }
    } catch (error: any) {
      var errorCode = (error as any).code;
      if (error.code == "auth/weak-password") {
        Swal.fire({
          icon: "warning",
          // title: "hello",
          text: "비밀번호를 다시 설정해주십시오. ",
          // timer: 2000,
        });
      }
      if (error.code == "auth/email-already-in-use") {
        // sendEmail();
        Swal.fire({
          icon: "warning",
          // title: "hello",
          text: "이미 가입된 이메일입니다. 다른 이메일을 사용해주십시오 ",
          // timer: 2000,
        });
      }

      console.log(
        "🚀 ~ file: Signup.tsx ~ line 135 ~ onSubmit ~ error",
        error.code
      );
    } finally {
      hideLoading(loadingDispatch);
    }
  };

  return (
    <Container>
      {/* <LoginWapper>
        <img src={ImageConstants.LOGIN} alßt="Login.logo" />
      </LoginWapper> */}
      <Col>
        <Link to="/">
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <path d={ImageConstants.LOGIN_LOGO} fill="#d81f26" />
          </Logo>
        </Link>
      </Col>
      <LoginBodyWrapper>
        <LoginBody>
          <LoginText>회원가입</LoginText>
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
                  // backgroundColor: "tomato",
                }}
                name="email"
                value={email}
                type="email"
                placeholder="회원가입 이메일 주소"
                onChange={onChange}
                required
              />
            </div>
            <input
              style={{
                display: "flex",
                // flex: 1,
                height: 50,
                borderRadius: 10,
                marginBottom: 20,
                // backgroundColor: "tomato",
              }}
              name="password"
              value={password}
              type="password"
              placeholder="회원가입 비밀번호"
              onChange={onChange}
              required
            />
            <input
              style={{
                display: "flex",
                // flex: 1,
                height: 50,
                borderRadius: 10,
                marginBottom: 20,
                // backgroundColor: "tomato",
              }}
              name="validatepassword"
              value={checkpassword}
              type="password"
              placeholder="회원가입 확인"
              onChange={onChange}
              required
            />
            {checkpassword && (
              <span
                style={{
                  display: "flex",
                  // flex: 1,

                  marginBottom: 30,
                  // backgroundColor: "tomato",
                }}
              >
                {validateword}
              </span>
            )}
            <input style={styles.base} type="submit" value={"회원가입"} />
          </form>
          {/* <span>
            회원이 아니신가요?{" "}
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              지금 가입하세요.
            </span>
          </span> */}

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
export default SignUp;

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
