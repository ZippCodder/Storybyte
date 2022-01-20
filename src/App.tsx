// homepage..

import React from "react";
import ReactDOM from "react-dom";
import Header from "./header.tsx";
import "../public/styles/styles.css";

function App(): JSX.Element {
return <div><Header /></div>
}

ReactDOM.render(<App />, document.getElementById("root"));
