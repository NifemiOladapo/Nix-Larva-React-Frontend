import { Link } from "react-router-dom";
import "../Styles/Register.css";

const Login = () => {
  return (
    <div className="register">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
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
        <input
          type="text"
          className="username"
          required="true"
          placeholder="Username"
        />
        {/* <legend>Email</legend> */}

        <input
          type="email"
          className="email"
          required="true"
          placeholder="Email"
        />
        {/* <legend>Password</legend> */}

        <input
          type="password"
          minLength={6}
          className="password"
          placeholder="Password"
          required="true"
        />
        {/* <legend>Confirm Password</legend> */}

        <input
          type="password"
          minLength={6}
          className="confirm__password"
          required="true"
          placeholder="Confirm password"
        />
        <input className="submit" value={"Register"} type="submit" />
        <Link to="/">Already have an account ? Sign In</Link>
      </form>
    </div>
  );
};

export default Login;
