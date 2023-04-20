import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Register.css";
import importedPic from "../logo192.png";
import { Camera, CameraFront } from "@material-ui/icons";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerButtonState, setRegisterButtonState] =
    useState("Create Account");

  const [inputFieldIsEditable, setInputFieldIsEditable] = useState(true);

  const handlePic = async (pic) => {
    if (pic === "") {
      toast({
        title: "Please input a valid image",
        status: "warning",
        isClosable: true,
        duration: 5000,
        position: "top",
      });

      return;
    }

    try {
      const data = new FormData();

      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "nifemioladapo");
      data.append("file", pic);
      await fetch(
        "https://api.cloudinary.com/v1_1/nifemioladapo/image/upload",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProfilePicture(data.url.toString());
        })
        .catch((err) => {
          toast({
            title: err.message,
            status: "error",
            isClosable: true,
            duration: 5000,
            position: "top",
          });
        });
    } catch (err) {
      console.log(err.message);
      toast({
        title: err.message,
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "top",
      });
    }
  };

  const registerFunction = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast({
        isClosable: true,
        duration: 4000,
        status: "warning",
        position: "top",
        description: "Ypur Password dont match",
      });
    }
    setRegisterButtonState("processing ...");
    try {
      await fetch("http://localhost:3005/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          profilePicture,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRegisterButtonState("Create Account");
          if (data === "This email is already in use") {
            return toast({
              description: data,
              status: "warning",
              duration: 4000,
              position: "top",
              isClosable: true,
            });
          }
          localStorage.setItem("userInformation", JSON.stringify(data));
          toast({
            description: "Account Successfully Created",
            status: "success",
            duration: 4000,
            position: "top",
            isClosable: true,
          });
          navigate("/homepage");
        })
        .catch((err) => {
          console.log(err.message);
          toast({
            isClosable: true,
            duration: 4000,
            status: "error",
            position: "top",
            description: err.message,
          });
        });
    } catch (err) {
      console.log(err.message);
      toast({
        isClosable: true,
        duration: 4000,
        status: "error",
        position: "top",
        description: err.message,
      });
    }
  };

  return (
    <div className="register">
      <form className="form" onSubmit={registerFunction}>
        <h1>Social Larva</h1>
        <h2>Sign Up to view videos, make friends and so much more.</h2>
        {/* <h1>Register</h1> */}
        {/* <legend>Username</legend> */}
        <div className="google__signup__button">SignUp with Google</div>
        <div className="or">
          <div className="first__line"></div>
          <h2>OR</h2>
          <div className="second__line"></div>
        </div>
        <img
          src={profilePicture}
          style={{
            width: "150px",
            height: "150px",
            marginBottom: "30px",
            borderRadius: "80px",
            border: "3px solid black",
          }}
        />
        <label
          style={{
            position: "absolute",
            left: " 63%",
            top: " 48% ",
          }}
          htmlFor="fileId"
        >
          <CameraFront style={{ fontSize: "40px" }} />
        </label>
        <input
          type={"file"}
          accept="image/*"
          style={{ display: "none" }}
          value={profilePicture}
          onChange={(e) => {
            if (inputFieldIsEditable) {
              handlePic(e.target.files[0]);
            }
          }}
          id="fileId"
        />
        <input
          type="text"
          className="username"
          required="true"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            if (inputFieldIsEditable) {
              setUsername(e.target.value);
            }
          }}
        />
        {/* <legend>Email</legend> */}

        <input
          type="email"
          className="email"
          required="true"
          value={email}
          onChange={(e) => {
            if (inputFieldIsEditable) {
              setEmail(e.target.value);
            }
          }}
          placeholder="Email"
        />
        {/* <legend>Password</legend> */}

        <input
          type="password"
          minLength={6}
          className="password"
          placeholder="Password"
          required="true"
          value={password}
          onChange={(e) => {
            if (inputFieldIsEditable) {
              setPassword(e.target.value);
            }
          }}
        />
        {/* <legend>Confirm Password</legend> */}

        <input
          type="password"
          minLength={6}
          className="confirm__password"
          required="true"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            if (inputFieldIsEditable) {
              setConfirmPassword(e.target.value);
            }
          }}
        />
        <input className="submit" value={registerButtonState} type="submit" />
        <Link to="/">
          Already have an account ?
          <span style={{ color: "#2f4097", textDecoration: "underline" }}>
            Sign In
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
