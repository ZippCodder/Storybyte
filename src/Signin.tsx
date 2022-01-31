import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import Header from "./components/header.tsx";
// @ts-ignore
import Footer from "./components/footer.tsx";
import "../public/styles/styles.css";
import "../public/styles/signup.css";
import Flag from "../public/images/flag_logo.png";

function Signin(): JSX.Element {
return (
<>
<Header />
<main>
<div className="form-container">
<form className="form-container__form" method="POST" action="">
<img alt="logo" src={Flag} className="form-container__logo" />
<h1 className="form-container__heading">Sign In</h1>
<input placeholder="username..." className="form-container__usrnam" name="username" type="text" required />
<input placeholder="password..." className="form-container__passwrd" name="password" type="password" required />
<button className="form-container__btn" type="submit">Submit</button>
<a href="">Dont have an account?</a>
</form>
</div>
</main>
<Footer />
</>
);
}

ReactDOM.render(<Signin />,document.getElementById("root"));
