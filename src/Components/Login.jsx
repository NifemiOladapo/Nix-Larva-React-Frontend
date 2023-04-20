import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginButtonState, setLoginButtonState] = useState("Log In");

  const [inputFieldIsEditable, setInputFieldIsEditable] = useState(true);

  const loginFunc = async (e) => {
    e.preventDefault();
    setLoginButtonState("Processing ...");
    try {
      await fetch("http://localhost:3005/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoginButtonState("Sign In");

          if (data === "Could not find this account") {
            return toast({
              position: "top",
              status: "error",
              description: data,
              duration: 4000,
              isClosable: true,
            });
          }
          localStorage.setItem("userInformation", JSON.stringify(data));
          toast({
            position: "top",
            status: "success",
            description: "User Successfully Loged In",
            duration: 4000,
            isClosable: true,
          });
          navigate("/homepage");

          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          console.log(err);
          toast({
            description: err.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 4000,
          });
        });
    } catch (err) {
      console.log(err.message);
      toast({
        description: err.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={loginFunc}>
        <h1>Login</h1>
        <div className="google__signup__button">Login with Google</div>
        <div className="or">
          <div className="first__line"></div>
          <h2>OR</h2>
          <div className="second__line"></div>
        </div>
        {/* <legend>Email</legend> */}
        <input
          onChange={(e) => {
            if (inputFieldIsEditable) {
              setEmail(e.target.value);
            }
          }}
          value={email}
          type="email"
          className="email"
          required={true}
          placeholder="Email"
        />
        {/* <legend>Password</legend> */}
        <input
          onChange={(e) => {
            if (inputFieldIsEditable) {
              setPassword(e.target.value);
            }
          }}
          value={password}
          type="password"
          minLength={6}
          className="password"
          required={true}
          placeholder="Password"
        />
        <input className="submit" value={loginButtonState} type="submit" />
        <Link to="/register">
          Dont have an account ?{" "}
          <span style={{ color: "#2f4097", textDecoration: "underline" }}>
            Register
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
