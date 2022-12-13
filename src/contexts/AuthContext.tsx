import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../fBase";
import { AuthContext } from "./Auth_Context";

// export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }: any) => {
  const userId = useRef<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // auth.onAuthStateChanged((user) => {
    //   console.log(
    //     "🚀 ~ file: AuthContext.tsx:11 ~ auth.onAuthStateChanged ~ user",
    //     user
    //   );
    //   user ? (userId.current = user.uid) : (userId.current = null);
    // });
    const userId = localStorage.getItem("uid");

    if (!userId) {
      navigate("/");
      Swal.fire({
        icon: "warning",
        // title: "hello",
        text: "로그인을 먼저 해주세요",
        // timer: 2000,
      });
    }

    // return children;
  }, []);

  return (
    <AuthContext.Provider value={{ auth, userId } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
