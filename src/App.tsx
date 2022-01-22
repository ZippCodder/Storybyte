// homepage..

import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import Header from "./components/header.tsx";
// @ts-ignore
import Home from "./components/home.tsx";

import "../public/styles/styles.css";

function App(): JSX.Element {
return (<>
<Header />
<Home />
</>
);
}

ReactDOM.render(<App />, document.getElementById("root"));
