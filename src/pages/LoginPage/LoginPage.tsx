import { Toast } from "components";
import { useEffect, useRef, useState, useMemo } from "react";
import Lottie from "react-lottie";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "misc/api";
import { AuthActionTypes } from "misc/context";
import { useToast, useUserData } from "misc/hooks";
import { useAuth } from "misc/hooks/useAuth";
import * as heartAnim from "../../assets/lottie/heart.json";

const heartOptions = {
  loop: false,
  autoplay: false,
  animationData: heartAnim,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { createToast } = useToast();
  const { authState, authDispatch } = useAuth();
  const { refetch: fetchUserData } = useUserData();

  const api = useMemo(() => (isLogin ? loginApi : registerApi), [isLogin]);

  const { mutate, status, data, isSuccess } = useMutation(api);

  const handleLogin = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    if (data.username === "" || data.password === "") {
      createToast({
        message: "Please Fill All Inputs",
        emoji: {
          name: "!",
          icon: "❗️",
          size: 30,
        },
      });
      return;
    }

    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.status === 200 || data?.status === 201) {
        const payload = {
          token: data.data.token,
          info: {
            username: data.data.user.username,
            id: data.data.user.id,
          },
        };

        authDispatch({
          type: AuthActionTypes.SetAuth,
          payload,
        });

        localStorage.setItem("user-data", JSON.stringify(payload));

        fetchUserData();

        navigate("/");
      } else if (data.status === 400) {
        createToast({
          message: data?.data?.errors[0]?.message || "Operation not completed",
          emoji: {
            name: "!",
            icon: "❗️",
            size: 30,
          },
        });
      }
    }
  }, [status]);

  return (
    <>
      <div className="login">
        <div className="login__logo">
          <div className="login__logo__lottie">
            {/* ❤️ */}
            <Lottie options={heartOptions} width={"50%"} height={"50%"} />
          </div>
        </div>

        <div className="login__form">
          <div className="input-wrapper">
            <input
              type="text"
              ref={usernameRef}
              onChange={(e) => {
                usernameRef.current.value = e.target.value;
              }}
              placeholder="Username"
            />
          </div>

          <div className="input-wrapper">
            <input
              type="Password"
              ref={passwordRef}
              onChange={(e) => {
                passwordRef.current.value = e.target.value;
              }}
              placeholder="password"
            />
          </div>

          <div
            className="submit-button"
            onClick={() => {
              handleLogin();
            }}
          >
            {isLogin ? "Login" : "Register"}
          </div>
        </div>

        <div
          className="show-register"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? "Register" : "Login"}
        </div>
      </div>
      <Toast />
    </>
  );
};

export default LoginPage;
