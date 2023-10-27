import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setupUser, user } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginRegister = (type) => {
    const obj = {
      name: name,
      email: email,
      password: password,
    };
    setupUser(obj, type);
  };
  useEffect(() => {
    if (user) {
      navigate("/my-todo");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="loginTo">{isLogin ? "Login" : "Register"} to play</div>
      <div>
        {!isLogin && (
          <>
            <input
              type="text"
              value={name}
              placeholder="Full Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="underline"></div>
          </>
        )}
      </div>
      <div>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="underline"></div>
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="underline"></div>
        <div className={isLogin ? "isRegister" : "isLogin"}>
          {isLogin ? (
            <div>
              Not yet registered?{" "}
              <span
                onClick={() => {
                  setIsLogin(false);
                }}
                className="register"
              >
                Register
              </span>
            </div>
          ) : (
            <div>
              Already a member?{" "}
              <span
                onClick={() => {
                  setIsLogin(true);
                }}
                className="register"
              >
                Login
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            loginRegister(isLogin ? "login" : "register");
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;
