import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import Header from "./components/header.tsx";
// @ts-ignore
import Footer from "./components/footer.tsx";
import "../public/styles/styles.css";
import "../public/styles/signup.css";
import Flag from "../public/images/flag_logo.png";

import "../public/styles/styles.css";
import "../public/styles/signup.css";

export default function Signup(): JSX.Element {

const form = useRef(null);

function submit(e) {
}

return (
<>
<Header />
<main>
<div className="form-container">
<form ref={form} className="form-container__form" method="POST" action="/users" onSubmit={submit}>
<img alt="logo" src={Flag} className="form-container__logo" />
<h1 className="form-container__heading">Sign up</h1>
<input placeholder="username..." className="form-container__usrnam" name="username" type="text" required />
<input placeholder="password..." className="form-container__passwrd" name="password" type="password" required />
<input placeholder="password..." className="form-container__passwrd-re" type="password" required />
<button className="form-container__btn" type="submit">Submit</button>
<a href="/signin">Already have an account?</a>
</form>
</div>
</main>
<Footer />
</>
);
}

if (!_SSR_) ReactDOM.hydrate(React.createElement(Signup,null), document.getElementById("root"));
